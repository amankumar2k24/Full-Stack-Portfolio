import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CronService } from './cron.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cron')
export class CronController {
    constructor(private readonly cronService: CronService) { }

    @UseGuards(JwtAuthGuard)
    @Get('status')
    getCronStatus() {
        return {
            keepAlive: this.cronService.getJobStatus(),
            message: 'Cron job status retrieved successfully'
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post('ping')
    async manualPing() {
        try {
            const result = await this.cronService.pingHealth();
            return {
                success: true,
                result,
                message: 'Manual ping executed successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Manual ping failed'
            };
        }
    }
}