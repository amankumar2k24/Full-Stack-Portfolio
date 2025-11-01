"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const config_1 = require("@nestjs/config");
let EmailService = class EmailService {
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASS'),
            },
            tls: {
                rejectUnauthorized: false
            },
            connectionTimeout: 60000,
            greetingTimeout: 30000,
            socketTimeout: 60000,
        });
    }
    async sendContactNotification(contactData) {
        const mailOptions = {
            from: this.configService.get('EMAIL_USER'),
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
                from: this.configService.get('EMAIL_USER'),
                to: 'aman.kumar2k15@gmail.com',
                subject: mailOptions.subject
            });
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Contact notification email sent successfully:', result.messageId);
        }
        catch (error) {
            console.error('Error sending contact notification email:', error);
            console.error('Error details:', {
                code: error.code,
                command: error.command,
                response: error.response
            });
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map