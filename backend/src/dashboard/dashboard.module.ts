import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Project, ProjectSchema } from '../schemas/project.schema';
import { Skill, SkillSchema } from '../schemas/skill.schema';
import { Message, MessageSchema } from '../schemas/message.schema';
import { Experience, ExperienceSchema } from '../schemas/experience.schema';
import { Service, ServiceSchema } from '../schemas/service.schema';
import { Settings, SettingsSchema } from '../schemas/settings.schema';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Project.name, schema: ProjectSchema },
            { name: Skill.name, schema: SkillSchema },
            { name: Message.name, schema: MessageSchema },
            { name: Experience.name, schema: ExperienceSchema },
            { name: Service.name, schema: ServiceSchema },
            { name: Settings.name, schema: SettingsSchema },
        ]),
    ],
    providers: [DashboardService],
    controllers: [DashboardController],
})
export class DashboardModule { }