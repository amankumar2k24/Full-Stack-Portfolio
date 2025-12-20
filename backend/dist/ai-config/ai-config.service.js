"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiConfigService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AiConfigService = class AiConfigService {
    constructor(aiConfigModel) {
        this.aiConfigModel = aiConfigModel;
    }
    async findAll() {
        return this.aiConfigModel.find().select('-apiKey').exec();
    }
    async findActive() {
        const config = await this.aiConfigModel.findOne({ isActive: true }).exec();
        if (!config) {
            throw new common_1.NotFoundException('No active AI configuration found');
        }
        return config;
    }
    async findAllActive() {
        return this.aiConfigModel.find({ isActive: true }).exec();
    }
    async getNextRoundRobinConfig() {
        const activeConfigs = await this.findAllActive();
        if (activeConfigs.length === 0) {
            throw new common_1.NotFoundException('No active AI configurations found');
        }
        if (activeConfigs.length === 1) {
            await this.updateUsageStats(activeConfigs[0]._id);
            return activeConfigs[0];
        }
        const nextConfig = activeConfigs.reduce((oldest, current) => {
            return current.lastUsed < oldest.lastUsed ? current : oldest;
        });
        await this.updateUsageStats(nextConfig._id);
        return nextConfig;
    }
    async updateUsageStats(configId) {
        await this.aiConfigModel.findByIdAndUpdate(configId, {
            lastUsed: Date.now(),
            $inc: { usageCount: 1 }
        }).exec();
    }
    async findOne(id) {
        const config = await this.aiConfigModel.findById(id).exec();
        if (!config) {
            throw new common_1.NotFoundException('AI configuration not found');
        }
        return config;
    }
    async create(createAiConfigDto) {
        const createdConfig = new this.aiConfigModel(createAiConfigDto);
        return createdConfig.save();
    }
    async update(id, updateAiConfigDto) {
        const updatedConfig = await this.aiConfigModel
            .findByIdAndUpdate(id, updateAiConfigDto, { new: true })
            .exec();
        if (!updatedConfig) {
            throw new common_1.NotFoundException('AI configuration not found');
        }
        return updatedConfig;
    }
    async remove(id) {
        const config = await this.aiConfigModel.findById(id).exec();
        if (!config) {
            throw new common_1.NotFoundException('AI configuration not found');
        }
        if (config.isActive) {
            throw new common_1.BadRequestException('Cannot delete active AI configuration');
        }
        await this.aiConfigModel.findByIdAndDelete(id).exec();
    }
    async activate(id) {
        await this.aiConfigModel.updateMany({}, { isActive: false });
        const activatedConfig = await this.aiConfigModel
            .findByIdAndUpdate(id, { isActive: true }, { new: true })
            .exec();
        if (!activatedConfig) {
            throw new common_1.NotFoundException('AI configuration not found');
        }
        return activatedConfig;
    }
};
exports.AiConfigService = AiConfigService;
exports.AiConfigService = AiConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('AiConfig')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AiConfigService);
//# sourceMappingURL=ai-config.service.js.map