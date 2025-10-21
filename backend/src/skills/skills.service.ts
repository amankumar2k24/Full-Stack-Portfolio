import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from '../schemas/skill.schema';
import { CreateSkillDto, UpdateSkillDto } from './dto/skill.dto';

@Injectable()
export class SkillsService {
    constructor(
        @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
    ) { }

    async findAll(): Promise<Skill[]> {
        return this.skillModel.find().exec();
    }

    async create(createSkillDto: CreateSkillDto): Promise<Skill> {
        const createdSkill = new this.skillModel(createSkillDto);
        return createdSkill.save();
    }

    async update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill> {
        return this.skillModel.findByIdAndUpdate(id, updateSkillDto, { new: true });
    }

    async remove(id: string): Promise<void> {
        await this.skillModel.findByIdAndDelete(id);
    }
}