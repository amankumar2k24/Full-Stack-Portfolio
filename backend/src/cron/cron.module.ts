import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';

@Module({
    imports: [ConfigModule],
    controllers: [CronController],
    providers: [CronService],
    exports: [CronService],
})
export class CronModule { }