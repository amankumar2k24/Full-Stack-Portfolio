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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiConfigSchema = exports.AiConfig = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AiConfig = class AiConfig extends mongoose_2.Document {
};
exports.AiConfig = AiConfig;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AiConfig.prototype, "provider", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], AiConfig.prototype, "apiKey", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'gemini-2.5-flash' }),
    __metadata("design:type", String)
], AiConfig.prototype, "modelName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0.7 }),
    __metadata("design:type", Number)
], AiConfig.prototype, "temperature", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1000 }),
    __metadata("design:type", Number)
], AiConfig.prototype, "maxTokens", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], AiConfig.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], AiConfig.prototype, "lastUsed", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], AiConfig.prototype, "usageCount", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], AiConfig.prototype, "description", void 0);
exports.AiConfig = AiConfig = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], AiConfig);
exports.AiConfigSchema = mongoose_1.SchemaFactory.createForClass(AiConfig);
//# sourceMappingURL=ai-config.schema.js.map