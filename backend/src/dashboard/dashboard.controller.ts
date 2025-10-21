import { Controller, Get, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) { }

    // Public endpoint for dashboard summary (no auth required)
    @Get('summary')
    async getPublicSummary() {
        return this.dashboardService.getSummary();
    }

    // Admin endpoint for dashboard summary (auth required)
    @UseGuards(JwtAuthGuard)
    @Get('admin/summary')
    async getAdminSummary() {
        return this.dashboardService.getSummary();
    }
}