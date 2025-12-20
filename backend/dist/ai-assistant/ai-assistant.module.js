"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiAssistantModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const about_schema_1 = require("../schemas/about.schema");
const skill_schema_1 = require("../schemas/skill.schema");
const experience_schema_1 = require("../schemas/experience.schema");
const project_schema_1 = require("../schemas/project.schema");
const service_schema_1 = require("../schemas/service.schema");
const settings_schema_1 = require("../schemas/settings.schema");
const ai_assistant_controller_1 = require("./ai-assistant.controller");
const ai_assistant_service_1 = require("./ai-assistant.service");
const ai_config_module_1 = require("../ai-config/ai-config.module");
let AiAssistantModule = class AiAssistantModule {
};
exports.AiAssistantModule = AiAssistantModule;
exports.AiAssistantModule = AiAssistantModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'About', schema: about_schema_1.AboutSchema },
                { name: 'Skill', schema: skill_schema_1.SkillSchema },
                { name: 'Experience', schema: experience_schema_1.ExperienceSchema },
                { name: 'Project', schema: project_schema_1.ProjectSchema },
                { name: 'Service', schema: service_schema_1.ServiceSchema },
                { name: 'Settings', schema: settings_schema_1.SettingsSchema },
            ]),
            ai_config_module_1.AiConfigModule,
        ],
        controllers: [ai_assistant_controller_1.AiAssistantController],
        providers: [ai_assistant_service_1.AiAssistantService],
    })
], AiAssistantModule);
//# sourceMappingURL=ai-assistant.module.js.map