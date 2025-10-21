"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const project_schema_1 = require("../schemas/project.schema");
const skill_schema_1 = require("../schemas/skill.schema");
const message_schema_1 = require("../schemas/message.schema");
const experience_schema_1 = require("../schemas/experience.schema");
const service_schema_1 = require("../schemas/service.schema");
const settings_schema_1 = require("../schemas/settings.schema");
const dashboard_service_1 = require("./dashboard.service");
const dashboard_controller_1 = require("./dashboard.controller");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: project_schema_1.Project.name, schema: project_schema_1.ProjectSchema },
                { name: skill_schema_1.Skill.name, schema: skill_schema_1.SkillSchema },
                { name: message_schema_1.Message.name, schema: message_schema_1.MessageSchema },
                { name: experience_schema_1.Experience.name, schema: experience_schema_1.ExperienceSchema },
                { name: service_schema_1.Service.name, schema: service_schema_1.ServiceSchema },
                { name: settings_schema_1.Settings.name, schema: settings_schema_1.SettingsSchema },
            ]),
        ],
        providers: [dashboard_service_1.DashboardService],
        controllers: [dashboard_controller_1.DashboardController],
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map