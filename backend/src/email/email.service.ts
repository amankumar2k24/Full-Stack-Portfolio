import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: this.configService.get<string>('EMAIL_USER'),
                pass: this.configService.get<string>('EMAIL_PASS'),
            },
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: 60000, // 60 seconds
            greetingTimeout: 30000, // 30 seconds
            socketTimeout: 60000, // 60 seconds
        });
    }

    async sendContactNotification(contactData: {
        name: string;
        email: string;
        message: string;
    }): Promise<void> {
        const mailOptions = {
            from: this.configService.get<string>('EMAIL_USER'),
            to: 'aman.kumar2k15@gmail.com',
            subject: `New Contact Form Submission from ${contactData.name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">New Contact Form Submission</h2>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #555; margin-bottom: 5px;">Contact Details:</h3>
                        <p style="margin: 5px 0;"><strong>Name:</strong> ${contactData.name}</p>
                        <p style="margin: 5px 0;"><strong>Email:</strong> ${contactData.email}</p>
                    </div>
                    
                    <div style="margin: 20px 0;">
                        <h3 style="color: #555; margin-bottom: 10px;">Message:</h3>
                        <div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid #007bff; border-radius: 5px;">
                            <p style="margin: 0; line-height: 1.6;">${contactData.message}</p>
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
                        <p>This email was sent from your portfolio contact form.</p>
                        <p>Received on: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
            `,
        };

        try {
            console.log('Attempting to send email notification...');
            console.log('Email config:', {
                from: this.configService.get<string>('EMAIL_USER'),
                to: 'aman.kumar2k15@gmail.com',
                subject: mailOptions.subject
            });

            const result = await this.transporter.sendMail(mailOptions);
            console.log('Contact notification email sent successfully:', result.messageId);
        } catch (error) {
            console.error('Error sending contact notification email:', error);
            console.error('Error details:', {
                code: error.code,
                command: error.command,
                response: error.response
            });
            // Don't throw error to prevent API failure
            // The contact form should still work even if email fails
        }
    }
}