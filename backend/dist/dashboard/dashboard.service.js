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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const project_schema_1 = require("../schemas/project.schema");
const skill_schema_1 = require("../schemas/skill.schema");
const message_schema_1 = require("../schemas/message.schema");
const experience_schema_1 = require("../schemas/experience.schema");
const service_schema_1 = require("../schemas/service.schema");
const settings_schema_1 = require("../schemas/settings.schema");
let DashboardService = class DashboardService {
    constructor(projectModel, skillModel, messageModel, experienceModel, serviceModel, settingsModel) {
        this.projectModel = projectModel;
        this.skillModel = skillModel;
        this.messageModel = messageModel;
        this.experienceModel = experienceModel;
        this.serviceModel = serviceModel;
        this.settingsModel = settingsModel;
    }
    async getSummary() {
        const [projectCount, skillCount, messageCount, experienceCount, serviceCount, settingsCount] = await Promise.all([
            this.projectModel.countDocuments(),
            this.skillModel.countDocuments(),
            this.messageModel.countDocuments(),
            this.experienceModel.countDocuments(),
            this.serviceModel.countDocuments(),
            this.settingsModel.countDocuments(),
        ]);
        return {
            totalProjects: projectCount,
            totalSkills: skillCount,
            totalMessages: messageCount,
            totalExperience: experienceCount,
            totalServices: serviceCount,
            totalSettings: settingsCount,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(project_schema_1.Project.name)),
    __param(1, (0, mongoose_1.InjectModel)(skill_schema_1.Skill.name)),
    __param(2, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __param(3, (0, mongoose_1.InjectModel)(experience_schema_1.Experience.name)),
    __param(4, (0, mongoose_1.InjectModel)(service_schema_1.Service.name)),
    __param(5, (0, mongoose_1.InjectModel)(settings_schema_1.Settings.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map