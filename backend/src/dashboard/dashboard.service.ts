import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../schemas/project.schema';
import { Skill, SkillDocument } from '../schemas/skill.schema';
import { Message, MessageDocument } from '../schemas/message.schema';
import { Experience } from '../schemas/experience.schema';
import { Service } from '../schemas/service.schema';
import { Settings } from '../schemas/settings.schema';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
        @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
        @InjectModel(Experience.name) private experienceModel: Model<Experience>,
        @InjectModel(Service.name) private serviceModel: Model<Service>,
        @InjectModel(Settings.name) private settingsModel: Model<Settings>,
    ) { }

    async getSummary() {
        const [
            projectCount,
            skillCount,
            messageCount,
            experienceCount,
            serviceCount,
            settingsCount
        ] = await Promise.all([
            this.projectModel.countDocuments(),
            this.skillModel.countDocuments(),
            this.messageModel.countDocuments(),
            this.experienceModel.countDocuments(),
            this.serviceModel.countDocuments(),
            this.settingsModel.countDocuments(),
        ]);

        return {
            totalProjects: projectCount,
            totalSkills: skillCount,
            totalMessages: messageCount,
            totalExperience: experienceCount,
            totalServices: serviceCount,
            totalSettings: settingsCount,
        };
    }
}