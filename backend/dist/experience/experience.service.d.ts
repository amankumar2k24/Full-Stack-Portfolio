import { Model } from 'mongoose';
import { Experience } from '../schemas/experience.schema';
import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';
export declare class ExperienceService {
    private experienceModel;
    constructor(experienceModel: Model<Experience>);
    findAll(): Promise<Experience[]>;
    create(createExperienceDto: CreateExperienceDto): Promise<Experience>;
    update(id: string, updateExperienceDto: UpdateExperienceDto): Promise<Experience>;
    remove(id: string): Promise<Experience>;
}
