import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CronJob } from 'cron';

@Injectable()
export class CronService {
    private readonly logger = new Logger(CronService.name);
    private keepAliveJob: CronJob;

    constructor(private configService: ConfigService) {
        this.initializeKeepAliveJob();
    }

    private initializeKeepAliveJob() {
        // Get the app URL from environment variables
        const appUrl = this.configService.get<string>('APP_URL') || 'http://localhost:5001';

        // Create cron job that runs every 5 minutes
        this.keepAliveJob = new CronJob(
            '*/5 * * * *', // Every 5 minutes
            async () => {
                try {
                    const response = await fetch(`${appUrl}/health`);

                    if (response.ok) {
                        const data = await response.json();
                        this.logger.log(`Keep-alive ping successful: ${data.status} at ${data.timestamp}`);
                    } else {
                        this.logger.warn(`Keep-alive ping failed with status: ${response.status}`);
                    }
                } catch (error) {
                    this.logger.error(`Keep-alive ping error: ${error.message}`);
                }
            },
            null, // onComplete callback
            false, // start immediately
            'UTC' // timezone
        );

        // Start the cron job
        this.keepAliveJob.start();
        this.logger.log(`Keep-alive cron job started - pinging ${appUrl}/health every 5 minutes`);
    }

    onModuleDestroy() {
        if (this.keepAliveJob) {
            this.keepAliveJob.stop();
            this.logger.log('Keep-alive cron job stopped');
        }
    }

    // Method to manually trigger a ping (useful for testing)
    async pingHealth(): Promise<any> {
        const appUrl = this.configService.get<string>('APP_URL') || 'http://localhost:5001';

        try {
            const response = await fetch(`${appUrl}/health`);
            const data = await response.json();
            this.logger.log(`Manual ping successful: ${JSON.stringify(data)}`);
            return data;
        } catch (error) {
            this.logger.error(`Manual ping error: ${error.message}`);
            throw error;
        }
    }

    // Get cron job status
    getJobStatus(): { isRunning: boolean; nextRun: Date | null } {
        return {
            isRunning: this.keepAliveJob ? true : false,
            nextRun: this.keepAliveJob?.nextDate()?.toJSDate() || null
        };
    }
}