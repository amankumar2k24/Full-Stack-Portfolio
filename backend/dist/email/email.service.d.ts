import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    private transporter;
    constructor(configService: ConfigService);
    sendContactNotification(contactData: {
        name: string;
        email: string;
        message: string;
    }): Promise<void>;
}
