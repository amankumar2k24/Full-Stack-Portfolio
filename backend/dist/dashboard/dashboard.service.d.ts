import { Model } from 'mongoose';
import { ProjectDocument } from '../schemas/project.schema';
import { SkillDocument } from '../schemas/skill.schema';
import { MessageDocument } from '../schemas/message.schema';
import { Experience } from '../schemas/experience.schema';
import { Service } from '../schemas/service.schema';
import { Settings } from '../schemas/settings.schema';
export declare class DashboardService {
    private projectModel;
    private skillModel;
    private messageModel;
    private experienceModel;
    private serviceModel;
    private settingsModel;
    constructor(projectModel: Model<ProjectDocument>, skillModel: Model<SkillDocument>, messageModel: Model<MessageDocument>, experienceModel: Model<Experience>, serviceModel: Model<Service>, settingsModel: Model<Settings>);
    getSummary(): Promise<{
        totalProjects: number;
        totalSkills: number;
        totalMessages: number;
        totalExperience: number;
        totalServices: number;
        totalSettings: number;
    }>;
}
