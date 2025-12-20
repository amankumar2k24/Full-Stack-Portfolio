import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AboutSchema } from '../schemas/about.schema';
import { SkillSchema } from '../schemas/skill.schema';
import { ExperienceSchema } from '../schemas/experience.schema';
import { ProjectSchema } from '../schemas/project.schema';
import { ServiceSchema } from '../schemas/service.schema';
import { SettingsSchema } from '../schemas/settings.schema';
import { AiAssistantController } from './ai-assistant.controller';
import { AiAssistantService } from './ai-assistant.service';
import { AiConfigModule } from '../ai-config/ai-config.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'About', schema: AboutSchema },
            { name: 'Skill', schema: SkillSchema },
            { name: 'Experience', schema: ExperienceSchema },
            { name: 'Project', schema: ProjectSchema },
            { name: 'Service', schema: ServiceSchema },
            { name: 'Settings', schema: SettingsSchema },
        ]),
        AiConfigModule,
    ],
    controllers: [AiAssistantController],
    providers: [AiAssistantService],
})
export class AiAssistantModule { }