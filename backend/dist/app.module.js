"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const about_module_1 = require("./about/about.module");
const skills_module_1 = require("./skills/skills.module");
const projects_module_1 = require("./projects/projects.module");
const contact_module_1 = require("./contact/contact.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const services_module_1 = require("./services/services.module");
const experience_module_1 = require("./experience/experience.module");
const settings_module_1 = require("./settings/settings.module");
const stats_module_1 = require("./stats/stats.module");
const health_module_1 = require("./health/health.module");
const cron_module_1 = require("./cron/cron.module");
const ai_assistant_module_1 = require("./ai-assistant/ai-assistant.module");
const ai_config_module_1 = require("./ai-config/ai-config.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/aman-portfolio'),
            auth_module_1.AuthModule,
            about_module_1.AboutModule,
            skills_module_1.SkillsModule,
            projects_module_1.ProjectsModule,
            contact_module_1.ContactModule,
            dashboard_module_1.DashboardModule,
            services_module_1.ServicesModule,
            experience_module_1.ExperienceModule,
            settings_module_1.SettingsModule,
            stats_module_1.StatsModule,
            health_module_1.HealthModule,
            cron_module_1.CronModule,
            ai_assistant_module_1.AiAssistantModule,
            ai_config_module_1.AiConfigModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map