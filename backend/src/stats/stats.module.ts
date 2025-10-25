import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { Stats, StatsSchema } from '../schemas/stats.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Stats.name, schema: StatsSchema }])
    ],
    controllers: [StatsController],
    providers: [StatsService],
    exports: [StatsService]
})
export class StatsModule { }