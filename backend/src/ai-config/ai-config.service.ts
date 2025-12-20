import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AiConfig } from '../schemas/ai-config.schema';
import { CreateAiConfigDto, UpdateAiConfigDto } from './dto/ai-config.dto';

@Injectable()
export class AiConfigService {
    constructor(
        @InjectModel('AiConfig') private aiConfigModel: Model<AiConfig>,
    ) { }

    async findAll(): Promise<AiConfig[]> {
        return this.aiConfigModel.find().select('-apiKey').exec();
    }

    async findActive(): Promise<AiConfig> {
        const config = await this.aiConfigModel.findOne({ isActive: true }).exec();
        if (!config) {
            throw new NotFoundException('No active AI configuration found');
        }
        return config;
    }

    async findAllActive(): Promise<AiConfig[]> {
        return this.aiConfigModel.find({ isActive: true }).exec();
    }

    async getNextRoundRobinConfig(): Promise<AiConfig> {
        const activeConfigs = await this.findAllActive();

        if (activeConfigs.length === 0) {
            throw new NotFoundException('No active AI configurations found');
        }

        if (activeConfigs.length === 1) {
            // Update usage stats
            await this.updateUsageStats(activeConfigs[0]._id);
            return activeConfigs[0];
        }

        // Round-robin: find the config with the oldest lastUsed timestamp
        const nextConfig = activeConfigs.reduce((oldest, current) => {
            return current.lastUsed < oldest.lastUsed ? current : oldest;
        });

        // Update usage stats
        await this.updateUsageStats(nextConfig._id);

        return nextConfig;
    }

    private async updateUsageStats(configId: string): Promise<void> {
        await this.aiConfigModel.findByIdAndUpdate(
            configId,
            {
                lastUsed: Date.now(),
                $inc: { usageCount: 1 }
            }
        ).exec();
    }

    async findOne(id: string): Promise<AiConfig> {
        const config = await this.aiConfigModel.findById(id).exec();
        if (!config) {
            throw new NotFoundException('AI configuration not found');
        }
        return config;
    }

    async create(createAiConfigDto: CreateAiConfigDto): Promise<AiConfig> {
        // Don't automatically deactivate others - allow multiple active configs for round-robin
        const createdConfig = new this.aiConfigModel(createAiConfigDto);
        return createdConfig.save();
    }

    async update(id: string, updateAiConfigDto: UpdateAiConfigDto): Promise<AiConfig> {
        // Don't automatically deactivate others - allow multiple active configs for round-robin
        const updatedConfig = await this.aiConfigModel
            .findByIdAndUpdate(id, updateAiConfigDto, { new: true })
            .exec();

        if (!updatedConfig) {
            throw new NotFoundException('AI configuration not found');
        }

        return updatedConfig;
    }

    async remove(id: string): Promise<void> {
        const config = await this.aiConfigModel.findById(id).exec();
        if (!config) {
            throw new NotFoundException('AI configuration not found');
        }

        if (config.isActive) {
            throw new BadRequestException('Cannot delete active AI configuration');
        }

        await this.aiConfigModel.findByIdAndDelete(id).exec();
    }

    async activate(id: string): Promise<AiConfig> {
        // Deactivate all configs
        await this.aiConfigModel.updateMany({}, { isActive: false });

        // Activate the specified config
        const activatedConfig = await this.aiConfigModel
            .findByIdAndUpdate(id, { isActive: true }, { new: true })
            .exec();

        if (!activatedConfig) {
            throw new NotFoundException('AI configuration not found');
        }

        return activatedConfig;
    }
}