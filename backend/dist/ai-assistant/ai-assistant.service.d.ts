import { Model } from 'mongoose';
import { About } from '../schemas/about.schema';
import { Skill } from '../schemas/skill.schema';
import { Experience } from '../schemas/experience.schema';
import { Project } from '../schemas/project.schema';
import { Service } from '../schemas/service.schema';
import { Settings } from '../schemas/settings.schema';
import { AiConfigService } from '../ai-config/ai-config.service';
export declare class AiAssistantService {
    private aboutModel;
    private skillModel;
    private experienceModel;
    private projectModel;
    private serviceModel;
    private settingsModel;
    private aiConfigService;
    constructor(aboutModel: Model<About>, skillModel: Model<Skill>, experienceModel: Model<Experience>, projectModel: Model<Project>, serviceModel: Model<Service>, settingsModel: Model<Settings>, aiConfigService: AiConfigService);
    getWebsiteContext(): Promise<{
        personalInfo: {
            name: any;
            title: any;
            bio: string;
            location: any;
            email: any;
            phone: any;
            github: any;
            linkedin: any;
            twitter: any;
        };
        currentWork: {
            company: string;
            title: string;
            duration: string;
            description: string;
            location: string;
            isCurrentlyWorking: boolean;
        };
        skills: {
            category: string;
            items: {
                name: string;
                level: number;
            }[];
        }[];
        experience: {
            company: string;
            title: string;
            duration: string;
            location: string;
            description: string;
            achievements: string[];
            technologies: string[];
        }[];
        projects: {
            title: string;
            description: string;
            techStack: string[];
            liveLinks: string[];
        }[];
        services: {
            title: string;
            description: string;
            features: string[];
        }[];
    }>;
    processMessage(userMessage: string): Promise<{
        message: string;
        timestamp: string;
        usedApiKey: string;
        error?: undefined;
    } | {
        message: string;
        timestamp: string;
        error: boolean;
        usedApiKey?: undefined;
    }>;
    private buildSystemPrompt;
    private handleBasicQueries;
}
