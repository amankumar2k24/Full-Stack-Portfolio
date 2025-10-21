import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Experience } from '../schemas/experience.schema';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';

@Injectable()
export class ExperienceService {
    constructor(
        @InjectModel(Experience.name) private experienceModel: Model<Experience>
    ) { }

    async findAll(): Promise<Experience[]> {
        return this.experienceModel.find({ isActive: true }).sort({ order: 1 }).exec();
    }

    async create(createExperienceDto: CreateExperienceDto): Promise<Experience> {
        const createdExperience = new this.experienceModel(createExperienceDto);
        return createdExperience.save();
    }

    async update(id: string, updateExperienceDto: UpdateExperienceDto): Promise<Experience> {
        return this.experienceModel.findByIdAndUpdate(id, updateExperienceDto, { new: true }).exec();
    }

    async remove(id: string): Promise<Experience> {
        return this.experienceModel.findByIdAndDelete(id).exec();
    }
}