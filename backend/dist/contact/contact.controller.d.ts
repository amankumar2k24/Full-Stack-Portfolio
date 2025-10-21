import { ContactService } from './contact.service';
import { CreateMessageDto } from './dto/message.dto';
export declare class ContactController {
    private readonly contactService;
    constructor(contactService: ContactService);
    create(createMessageDto: CreateMessageDto): Promise<import("../schemas/message.schema").Message>;
    findAll(): Promise<import("../schemas/message.schema").Message[]>;
}
