import { Model } from 'mongoose';
import { AiConfig } from '../schemas/ai-config.schema';
import { CreateAiConfigDto, UpdateAiConfigDto } from './dto/ai-config.dto';
export declare class AiConfigService {
    private aiConfigModel;
    constructor(aiConfigModel: Model<AiConfig>);
    findAll(): Promise<AiConfig[]>;
    findActive(): Promise<AiConfig>;
    findAllActive(): Promise<AiConfig[]>;
    getNextRoundRobinConfig(): Promise<AiConfig>;
    private updateUsageStats;
    findOne(id: string): Promise<AiConfig>;
    create(createAiConfigDto: CreateAiConfigDto): Promise<AiConfig>;
    update(id: string, updateAiConfigDto: UpdateAiConfigDto): Promise<AiConfig>;
    remove(id: string): Promise<void>;
    activate(id: string): Promise<AiConfig>;
}
