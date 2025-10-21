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
exports.ExperienceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const experience_schema_1 = require("../schemas/experience.schema");
let ExperienceService = class ExperienceService {
    constructor(experienceModel) {
        this.experienceModel = experienceModel;
    }
    async findAll() {
        return this.experienceModel.find({ isActive: true }).sort({ order: 1 }).exec();
    }
    async create(createExperienceDto) {
        const createdExperience = new this.experienceModel(createExperienceDto);
        return createdExperience.save();
    }
    async update(id, updateExperienceDto) {
        return this.experienceModel.findByIdAndUpdate(id, updateExperienceDto, { new: true }).exec();
    }
    async remove(id) {
        return this.experienceModel.findByIdAndDelete(id).exec();
    }
};
exports.ExperienceService = ExperienceService;
exports.ExperienceService = ExperienceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(experience_schema_1.Experience.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ExperienceService);
//# sourceMappingURL=experience.service.js.map