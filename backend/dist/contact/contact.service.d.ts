import { Model } from 'mongoose';
import { Message, MessageDocument } from '../schemas/message.schema';
import { CreateMessageDto } from './dto/message.dto';
export declare class ContactService {
    private messageModel;
    constructor(messageModel: Model<MessageDocument>);
    create(createMessageDto: CreateMessageDto): Promise<Message>;
    findAll(): Promise<Message[]>;
}
