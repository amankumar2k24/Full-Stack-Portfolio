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
var CronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cron_1 = require("cron");
let CronService = CronService_1 = class CronService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(CronService_1.name);
        this.initializeKeepAliveJob();
    }
    initializeKeepAliveJob() {
        const appUrl = this.configService.get('APP_URL') || 'http://localhost:5001';
        this.keepAliveJob = new cron_1.CronJob('*/5 * * * *', async () => {
            try {
                const response = await fetch(`${appUrl}/health`);
                if (response.ok) {
                    const data = await response.json();
                    this.logger.log(`Keep-alive ping successful: ${data.status} at ${data.timestamp}`);
                }
                else {
                    this.logger.warn(`Keep-alive ping failed with status: ${response.status}`);
                }
            }
            catch (error) {
                this.logger.error(`Keep-alive ping error: ${error.message}`);
            }
        }, null, false, 'UTC');
        this.keepAliveJob.start();
        this.logger.log(`Keep-alive cron job started - pinging ${appUrl}/health every 5 minutes`);
    }
    onModuleDestroy() {
        if (this.keepAliveJob) {
            this.keepAliveJob.stop();
            this.logger.log('Keep-alive cron job stopped');
        }
    }
    async pingHealth() {
        const appUrl = this.configService.get('APP_URL') || 'http://localhost:5001';
        try {
            const response = await fetch(`${appUrl}/health`);
            const data = await response.json();
            this.logger.log(`Manual ping successful: ${JSON.stringify(data)}`);
            return data;
        }
        catch (error) {
            this.logger.error(`Manual ping error: ${error.message}`);
            throw error;
        }
    }
    getJobStatus() {
        return {
            isRunning: this.keepAliveJob ? true : false,
            nextRun: this.keepAliveJob?.nextDate()?.toJSDate() || null
        };
    }
};
exports.CronService = CronService;
exports.CronService = CronService = CronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CronService);
//# sourceMappingURL=cron.service.js.map