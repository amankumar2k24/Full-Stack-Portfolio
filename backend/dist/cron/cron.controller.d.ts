import { CronService } from './cron.service';
export declare class CronController {
    private readonly cronService;
    constructor(cronService: CronService);
    getCronStatus(): {
        keepAlive: {
            isRunning: boolean;
            nextRun: Date | null;
        };
        message: string;
    };
    manualPing(): Promise<{
        success: boolean;
        result: any;
        message: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message: string;
        result?: undefined;
    }>;
}
