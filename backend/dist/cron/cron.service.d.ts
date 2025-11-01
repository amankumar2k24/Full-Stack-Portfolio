import { ConfigService } from '@nestjs/config';
export declare class CronService {
    private configService;
    private readonly logger;
    private keepAliveJob;
    constructor(configService: ConfigService);
    private initializeKeepAliveJob;
    onModuleDestroy(): void;
    pingHealth(): Promise<any>;
    getJobStatus(): {
        isRunning: boolean;
        nextRun: Date | null;
    };
}
