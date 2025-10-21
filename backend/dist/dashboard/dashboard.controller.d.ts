import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getPublicSummary(): Promise<{
        totalProjects: number;
        totalSkills: number;
        totalMessages: number;
        totalExperience: number;
        totalServices: number;
        totalSettings: number;
    }>;
    getAdminSummary(): Promise<{
        totalProjects: number;
        totalSkills: number;
        totalMessages: number;
        totalExperience: number;
        totalServices: number;
        totalSettings: number;
    }>;
}
