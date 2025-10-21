import { Model } from 'mongoose';
import { Skill, SkillDocument } from '../schemas/skill.schema';
import { CreateSkillDto, UpdateSkillDto } from './dto/skill.dto';
export declare class SkillsService {
    private skillModel;
    constructor(skillModel: Model<SkillDocument>);
    findAll(): Promise<Skill[]>;
    create(createSkillDto: CreateSkillDto): Promise<Skill>;
    update(id: string, updateSkillDto: UpdateSkillDto): Promise<Skill>;
    remove(id: string): Promise<void>;
}
