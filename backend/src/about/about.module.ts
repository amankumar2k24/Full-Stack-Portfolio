import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { About, AboutSchema } from '../schemas/about.schema';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: About.name, schema: AboutSchema }]),
    ],
    providers: [AboutService],
    controllers: [AboutController],
})
export class AboutModule { }