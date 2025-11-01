import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { CreateMessageDto } from './dto/message.dto';
import { EmailService } from '../email/email.service';
export declare class ContactService {
    private messageModel;
    private emailService;
    constructor(messageModel: Model<MessageDocument>, emailService: EmailService);
    create(createMessageDto: CreateMessageDto): Promise<Message>;
    findAll(): Promise<Message[]>;
    delete(id: string): Promise<void>;
}
