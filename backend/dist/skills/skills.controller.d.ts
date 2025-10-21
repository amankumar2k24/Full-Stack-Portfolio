import { SkillsService } from './skills.service';
import { CreateSkillDto, UpdateSkillDto } from './dto/skill.dto';
export declare class SkillsController {
    private readonly skillsService;
    constructor(skillsService: SkillsService);
    findAll(): Promise<import("../schemas/skill.schema").Skill[]>;
    create(createSkillDto: CreateSkillDto): Promise<import("../schemas/skill.schema").Skill>;
    update(id: string, updateSkillDto: UpdateSkillDto): Promise<import("../schemas/skill.schema").Skill>;
    remove(id: string): Promise<void>;
}
