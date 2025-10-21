import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from '../schemas/message.schema';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    ],
    providers: [ContactService],
    controllers: [ContactController],
})
export class ContactModule { }