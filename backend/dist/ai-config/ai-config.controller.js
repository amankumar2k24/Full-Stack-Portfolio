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
exports.AiConfigController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const ai_config_dto_1 = require("./dto/ai-config.dto");
const ai_config_service_1 = require("./ai-config.service");
let AiConfigController = class AiConfigController {
    constructor(aiConfigService) {
        this.aiConfigService = aiConfigService;
    }
    async findAll() {
        return this.aiConfigService.findAll();
    }
    async findActive() {
        return this.aiConfigService.findActive();
    }
    async findAllActive() {
        return this.aiConfigService.findAllActive();
    }
    async getUsageStats() {
        const configs = await this.aiConfigService.findAllActive();
        return configs.map(config => ({
            id: config._id,
            provider: config.provider,
            modelName: config.modelName,
            usageCount: config.usageCount || 0,
            lastUsed: config.lastUsed || 0,
            isActive: config.isActive
        }));
    }
    async findOne(id) {
        return this.aiConfigService.findOne(id);
    }
    async create(createAiConfigDto) {
        return this.aiConfigService.create(createAiConfigDto);
    }
    async update(id, updateAiConfigDto) {
        return this.aiConfigService.update(id, updateAiConfigDto);
    }
    async remove(id) {
        return this.aiConfigService.remove(id);
    }
    async activate(id) {
        return this.aiConfigService.activate(id);
    }
};
exports.AiConfigController = AiConfigController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AiConfigController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('active'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AiConfigController.prototype, "findActive", null);
__decorate([
    (0, common_1.Get)('active/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AiConfigController.prototype, "findAllActive", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AiConfigController.prototype, "getUsageStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiConfigController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ai_config_dto_1.CreateAiConfigDto]),
    __metadata("design:returntype", Promise)
], AiConfigController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ai_config_dto_1.UpdateAiConfigDto]),
    __metadata("design:returntype", Promise)
], AiConfigController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiConfigController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id/activate'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiConfigController.prototype, "activate", null);
exports.AiConfigController = AiConfigController = __decorate([
    (0, common_1.Controller)('ai-config'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ai_config_service_1.AiConfigService])
], AiConfigController);
//# sourceMappingURL=ai-config.controller.js.map