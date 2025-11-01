import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { CreateMessageDto } from './dto/message.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class ContactService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
        private emailService: EmailService,
    ) { }

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
        const createdMessage = new this.messageModel(createMessageDto);
        const savedMessage = await createdMessage.save();

        // Send email notification (don't await to avoid blocking the response)
        this.emailService.sendContactNotification({
            name: createMessageDto.name,
            email: createMessageDto.email,
            message: createMessageDto.message,
        }).catch(error => {
            console.error('Failed to send email notification:', error);
        });

        return savedMessage;
    }

    async findAll(): Promise<Message[]> {
        return this.messageModel.find().sort({ createdAt: -1 }).exec();
    }

    async delete(id: string): Promise<void> {
        await this.messageModel.findByIdAndDelete(id).exec();
    }
}