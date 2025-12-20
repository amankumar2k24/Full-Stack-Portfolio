import { AiAssistantService } from './ai-assistant.service';
export declare class AiAssistantController {
    private readonly aiAssistantService;
    constructor(aiAssistantService: AiAssistantService);
    chat(body: {
        message: string;
    }): Promise<{
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
    getContext(): Promise<{
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
}
