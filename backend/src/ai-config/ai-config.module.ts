import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AiConfigController } from './ai-config.controller';
import { AiConfigService } from './ai-config.service';
import { AiConfigSchema } from '../schemas/ai-config.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'AiConfig', schema: AiConfigSchema },
        ]),
    ],
    controllers: [AiConfigController],
    providers: [AiConfigService],
    exports: [AiConfigService],
})
export class AiConfigModule { }