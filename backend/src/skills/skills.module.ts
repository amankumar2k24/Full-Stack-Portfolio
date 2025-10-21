import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Skill, SkillSchema } from '../schemas/skill.schema';
import { SkillsService } from './skills.service';
import { SkillsController } from './skills.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Skill.name, schema: SkillSchema }]),
    ],
    providers: [SkillsService],
    controllers: [SkillsController],
})
export class SkillsModule { }