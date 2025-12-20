"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAssistantService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const generative_ai_1 = require("@google/generative-ai");
const ai_config_service_1 = require("../ai-config/ai-config.service");
let AiAssistantService = class AiAssistantService {
    constructor(aboutModel, skillModel, experienceModel, projectModel, serviceModel, settingsModel, aiConfigService) {
        this.aboutModel = aboutModel;
        this.skillModel = skillModel;
        this.experienceModel = experienceModel;
        this.projectModel = projectModel;
        this.serviceModel = serviceModel;
        this.settingsModel = settingsModel;
        this.aiConfigService = aiConfigService;
    }
    async getWebsiteContext() {
        try {
            const [about, skills, experiences, projects, services, settings] = await Promise.all([
                this.aboutModel.findOne().exec(),
                this.skillModel.find().exec(),
                this.experienceModel.find().sort({ order: 1 }).exec(),
                this.projectModel.find().exec(),
                this.serviceModel.find().sort({ order: 1 }).exec(),
                this.settingsModel.find().exec(),
            ]);
            const settingsObj = settings.reduce((acc, setting) => {
                acc[setting.key] = setting.value;
                return acc;
            }, {});
            const context = {
                personalInfo: {
                    name: settingsObj['name'] || 'Aman Kumar',
                    title: settingsObj['title'] || about?.title || '',
                    bio: about?.bio || '',
                    location: settingsObj['location'] || '',
                    email: settingsObj['email'] || '',
                    phone: settingsObj['phone'] || '',
                    github: settingsObj['github'] || '',
                    linkedin: settingsObj['linkedin'] || '',
                    twitter: settingsObj['twitter'] || '',
                },
                currentWork: {
                    company: experiences?.[0]?.company || '',
                    title: experiences?.[0]?.title || '',
                    duration: experiences?.[0]?.duration || '',
                    description: experiences?.[0]?.description || '',
                    location: experiences?.[0]?.location || '',
                    isCurrentlyWorking: experiences?.[0]?.isActive || false,
                },
                skills: skills.map(skillCategory => ({
                    category: skillCategory.category,
                    items: skillCategory.items.map(item => ({
                        name: item.name,
                        level: item.level,
                    })),
                })),
                experience: experiences.map(exp => ({
                    company: exp.company,
                    title: exp.title,
                    duration: exp.duration,
                    location: exp.location,
                    description: exp.description,
                    achievements: exp.achievements,
                    technologies: exp.technologies,
                })),
                projects: projects.map(project => ({
                    title: project.title,
                    description: project.description,
                    techStack: project.techStack,
                    liveLinks: project.liveLinks,
                })),
                services: services.map(service => ({
                    title: service.title,
                    description: service.description,
                    features: service.features,
                })),
            };
            return context;
        }
        catch (error) {
            console.error('Error fetching website context:', error);
            throw error;
        }
    }
    async processMessage(userMessage) {
        try {
            const aiConfig = await this.aiConfigService.getNextRoundRobinConfig();
            const context = await this.getWebsiteContext();
            const systemPrompt = this.buildSystemPrompt(context);
            const genAI = new generative_ai_1.GoogleGenerativeAI(aiConfig.apiKey);
            const model = genAI.getGenerativeModel({ model: aiConfig.modelName });
            const result = await model.generateContent({
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                text: `${systemPrompt}\n\nUser: ${userMessage}`
                            }
                        ]
                    }
                ],
                generationConfig: {
                    temperature: aiConfig.temperature,
                    maxOutputTokens: aiConfig.maxTokens,
                    topP: 0.8,
                    topK: 10
                }
            });
            const response = await result.response;
            const aiResponse = response.text() || "I'm sorry, I couldn't generate a response.";
            return {
                message: aiResponse,
                timestamp: new Date().toISOString(),
                usedApiKey: `${aiConfig.provider}-${aiConfig._id.toString().slice(-4)}`,
            };
        }
        catch (error) {
            console.error('Error processing message:', error);
            try {
                const fallbackConfig = await this.aiConfigService.findActive();
                console.log('Using fallback configuration');
                const context = await this.getWebsiteContext();
                const systemPrompt = this.buildSystemPrompt(context);
                const genAI = new generative_ai_1.GoogleGenerativeAI(fallbackConfig.apiKey);
                const model = genAI.getGenerativeModel({ model: fallbackConfig.modelName });
                const result = await model.generateContent({
                    contents: [
                        {
                            role: 'user',
                            parts: [
                                {
                                    text: `${systemPrompt}\n\nUser: ${userMessage}`
                                }
                            ]
                        }
                    ],
                    generationConfig: {
                        temperature: fallbackConfig.temperature,
                        maxOutputTokens: fallbackConfig.maxTokens,
                        topP: 0.8,
                        topK: 10
                    }
                });
                const response = await result.response;
                const aiResponse = response.text() || "I'm sorry, I couldn't generate a response.";
                return {
                    message: aiResponse,
                    timestamp: new Date().toISOString(),
                    usedApiKey: `fallback-${fallbackConfig._id.toString().slice(-4)}`,
                };
            }
            catch (fallbackError) {
                console.error('Fallback also failed:', fallbackError);
                return {
                    message: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
                    timestamp: new Date().toISOString(),
                    error: true,
                };
            }
        }
    }
    buildSystemPrompt(context) {
        const { personalInfo, currentWork, skills, experience, projects, services } = context;
        const allSkills = skills
            .map(cat => cat.items.map(item => `${item.name} (${item.level}%)`).join(', '))
            .join(', ');
        return `You are an AI assistant for ${personalInfo.name}'s portfolio website. Your role is to provide helpful, accurate information about ${personalInfo.name}'s professional background, skills, projects, and services.

PERSONAL INFORMATION:
- Name: ${personalInfo.name}
- Title: ${personalInfo.title}
- Bio: ${personalInfo.bio}
- Location: Haryana, Sonipat, India
- Phone: +91 7357432123
- Email: ${personalInfo.email}
- GitHub: ${personalInfo.github}
- LinkedIn: ${personalInfo.linkedin}

CURRENT WORK:
${currentWork.isCurrentlyWorking ? `Currently working at ${currentWork.company} as ${currentWork.title} (${currentWork.duration}) in ${currentWork.location}.` : `Previously worked at ${currentWork.company} as ${currentWork.title}.`}
${currentWork.description}

TECHNICAL SKILLS:
${allSkills}

WORK EXPERIENCE:
${experience.map((exp, i) => `
${i + 1}. ${exp.title} at ${exp.company} (${exp.duration}) - ${exp.location}
   ${exp.description}
   Key Achievements: ${exp.achievements?.join(', ') || 'N/A'}
   Technologies: ${exp.technologies?.join(', ') || 'N/A'}
`).join('\n')}

PROJECTS:
${projects.map((proj, i) => `
${i + 1}. ${proj.title}
   Description: ${proj.description}
   Tech Stack: ${proj.techStack.join(', ')}
`).join('\n')}

SERVICES OFFERED:
${services.map((svc, i) => `
${i + 1}. ${svc.title}
   ${svc.description}
   Features: ${svc.features.join(', ')}
`).join('\n')}

INSTRUCTIONS:
- Answer questions about ${personalInfo.name}'s background, skills, experience, projects, and services
- For location questions: ${personalInfo.name} is currently located in Haryana, Sonipat, India
- For time/date questions: Use the current context information provided above
- For general questions about current time, date, month, or year: Provide the information from the current context
- Be professional, friendly, and concise
- If asked about availability or hiring, mention that visitors can use the contact form on the website
- If you don't have specific information, politely say so and suggest contacting ${personalInfo.name} directly
- Use natural, conversational language
- Keep responses focused and relevant to the question asked
- When asked about basic information like "what time is it", "what's the date", "what month is it", etc., provide the current information
- Always be helpful with both professional and general queries`;
    }
    async handleBasicQueries(message) {
        const lowerMessage = message.toLowerCase().trim();
        const now = new Date();
        const context = await this.getWebsiteContext();
        const { personalInfo } = context;
        if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('get in touch') ||
            lowerMessage.includes('how can i contact') || lowerMessage.includes('how to contact') ||
            lowerMessage.includes('contact aman') || lowerMessage.includes('reach aman') ||
            lowerMessage.includes('contact information') || lowerMessage.includes('contact details')) {
            const contactMethods = [];
            if (personalInfo.email) {
                contactMethods.push(`📧 Email: ${personalInfo.email}`);
            }
            contactMethods.push(`📱 Phone: +91 7357432123`);
            if (personalInfo.linkedin) {
                contactMethods.push(`💼 LinkedIn: ${personalInfo.linkedin}`);
            }
            if (personalInfo.github) {
                contactMethods.push(`💻 GitHub: ${personalInfo.github}`);
            }
            if (personalInfo.twitter) {
                contactMethods.push(`🐦 Twitter: ${personalInfo.twitter}`);
            }
            if (contactMethods.length > 0) {
                return `You can contact Aman Kumar through:\n\n${contactMethods.join('\n')}\n\nYou can also use the contact form on this website for direct messages.`;
            }
            else {
                return "You can contact Aman Kumar using the contact form on this website.";
            }
        }
        if (lowerMessage.includes('phone') || lowerMessage.includes('number') || lowerMessage.includes('contact number')) {
            return `You can reach Aman at: +91 7357432123`;
        }
        if (lowerMessage.includes('email') || lowerMessage.includes('mail')) {
            return personalInfo.email ? `You can email Aman at: ${personalInfo.email}` : "Email is not publicly available. Please use the contact form on the website.";
        }
        if (lowerMessage.includes('linkedin')) {
            return personalInfo.linkedin ? `You can connect with Aman on LinkedIn: ${personalInfo.linkedin}` : "LinkedIn profile is not available.";
        }
        if (lowerMessage.includes('github')) {
            return personalInfo.github ? `Check out Aman's GitHub profile: ${personalInfo.github}` : "GitHub profile is not available.";
        }
        if (lowerMessage.includes('twitter')) {
            return personalInfo.twitter ? `Follow Aman on Twitter: ${personalInfo.twitter}` : "Twitter profile is not available.";
        }
        if (lowerMessage.includes('location') || lowerMessage.includes('where') && (lowerMessage.includes('live') || lowerMessage.includes('located') || lowerMessage.includes('from'))) {
            return "Aman is currently located in Haryana, Sonipat, India.";
        }
        if (lowerMessage.includes('time') || lowerMessage.includes('what time')) {
            const currentTime = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
            });
            return `The current time is ${currentTime}.`;
        }
        if (lowerMessage.includes('date') || lowerMessage.includes('what date') || lowerMessage.includes('today')) {
            const currentDate = now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            return `Today is ${currentDate}.`;
        }
        if (lowerMessage.includes('month') || lowerMessage.includes('what month')) {
            const currentMonth = now.toLocaleDateString('en-US', { month: 'long' });
            return `The current month is ${currentMonth}.`;
        }
        if (lowerMessage.includes('year') || lowerMessage.includes('what year')) {
            const currentYear = now.getFullYear();
            return `The current year is ${currentYear}.`;
        }
        if (lowerMessage.includes('day') && (lowerMessage.includes('what day') || lowerMessage.includes('which day'))) {
            const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
            return `Today is ${currentDay}.`;
        }
        return null;
    }
};
exports.AiAssistantService = AiAssistantService;
exports.AiAssistantService = AiAssistantService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('About')),
    __param(1, (0, mongoose_1.InjectModel)('Skill')),
    __param(2, (0, mongoose_1.InjectModel)('Experience')),
    __param(3, (0, mongoose_1.InjectModel)('Project')),
    __param(4, (0, mongoose_1.InjectModel)('Service')),
    __param(5, (0, mongoose_1.InjectModel)('Settings')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        ai_config_service_1.AiConfigService])
], AiAssistantService);
//# sourceMappingURL=ai-assistant.service.js.map