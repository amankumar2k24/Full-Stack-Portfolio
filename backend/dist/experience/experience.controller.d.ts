import { CreateExperienceDto, UpdateExperienceDto } from './dto/experience.dto';
import { ExperienceService } from './experience.service';
export declare class ExperienceController {
    private readonly experienceService;
    constructor(experienceService: ExperienceService);
    findAll(): Promise<import("../schemas/experience.schema").Experience[]>;
    create(createExperienceDto: CreateExperienceDto): Promise<import("../schemas/experience.schema").Experience>;
    update(id: string, updateExperienceDto: UpdateExperienceDto): Promise<import("../schemas/experience.schema").Experience>;
    remove(id: string): Promise<import("../schemas/experience.schema").Experience>;
}
