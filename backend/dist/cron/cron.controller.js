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
exports.CronController = void 0;
const common_1 = require("@nestjs/common");
const cron_service_1 = require("./cron.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let CronController = class CronController {
    constructor(cronService) {
        this.cronService = cronService;
    }
    getCronStatus() {
        return {
            keepAlive: this.cronService.getJobStatus(),
            message: 'Cron job status retrieved successfully'
        };
    }
    async manualPing() {
        try {
            const result = await this.cronService.pingHealth();
            return {
                success: true,
                result,
                message: 'Manual ping executed successfully'
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Manual ping failed'
            };
        }
    }
};
exports.CronController = CronController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CronController.prototype, "getCronStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronController.prototype, "manualPing", null);
exports.CronController = CronController = __decorate([
    (0, common_1.Controller)('cron'),
    __metadata("design:paramtypes", [cron_service_1.CronService])
], CronController);
//# sourceMappingURL=cron.controller.js.map