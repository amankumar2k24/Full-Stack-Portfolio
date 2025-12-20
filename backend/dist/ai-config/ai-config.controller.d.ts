import { CreateAiConfigDto, UpdateAiConfigDto } from './dto/ai-config.dto';
import { AiConfigService } from './ai-config.service';
export declare class AiConfigController {
    private readonly aiConfigService;
    constructor(aiConfigService: AiConfigService);
    findAll(): Promise<import("../schemas/ai-config.schema").AiConfig[]>;
    findActive(): Promise<import("../schemas/ai-config.schema").AiConfig>;
    findAllActive(): Promise<import("../schemas/ai-config.schema").AiConfig[]>;
    getUsageStats(): Promise<{
        id: any;
        provider: string;
        modelName: string;
        usageCount: number;
        lastUsed: number;
        isActive: boolean;
    }[]>;
    findOne(id: string): Promise<import("../schemas/ai-config.schema").AiConfig>;
    create(createAiConfigDto: CreateAiConfigDto): Promise<import("../schemas/ai-config.schema").AiConfig>;
    update(id: string, updateAiConfigDto: UpdateAiConfigDto): Promise<import("../schemas/ai-config.schema").AiConfig>;
    remove(id: string): Promise<void>;
    activate(id: string): Promise<import("../schemas/ai-config.schema").AiConfig>;
}
