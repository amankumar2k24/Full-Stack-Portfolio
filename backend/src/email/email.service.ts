import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as sgMail from '@sendgrid/mail';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        // Initialize SendGrid
        const sendGridApiKey = this.configService.get<string>('SENDGRID_API_KEY');
        if (sendGridApiKey) {
            sgMail.setApiKey(sendGridApiKey);
        }

        // Keep Gmail as fallback (though it won't work on Render)
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
            connectionTimeout: 60000,
            greetingTimeout: 30000,
            socketTimeout: 60000,
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
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Contact Form Submission</title>
                </head>
                <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
                    <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        
                        <!-- Header -->
                        <div style="background: linear-gradient(135deg, #007bff, #0056b3); color: white; padding: 30px 20px; text-align: center;">
                            <h1 style="margin: 0; font-size: 24px; font-weight: 600;">New Contact Form Submission</h1>
                            <p style="margin: 10px 0 0 0; opacity: 0.9;">From your portfolio website</p>
                        </div>
                        
                        <!-- Content -->
                        <div style="padding: 30px 20px;">
                            
                            <!-- Contact Details -->
                            <div style="margin-bottom: 30px;">
                                <h2 style="color: #333; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">Contact Information</h2>
                                
                                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #007bff;">
                                    <p style="margin: 0 0 10px 0; font-size: 16px;"><strong style="color: #555;">Name:</strong> <span style="color: #333;">${contactData.name}</span></p>
                                    <p style="margin: 0; font-size: 16px;"><strong style="color: #555;">Email:</strong> <a href="mailto:${contactData.email}" style="color: #007bff; text-decoration: none;">${contactData.email}</a></p>
                                </div>
                            </div>
                            
                            <!-- Message -->
                            <div style="margin-bottom: 30px;">
                                <h2 style="color: #333; margin: 0 0 20px 0; font-size: 18px; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">Message</h2>
                                
                                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
                                    <p style="margin: 0; line-height: 1.6; color: #333; font-size: 15px; white-space: pre-wrap;">${contactData.message}</p>
                                </div>
                            </div>
                            
                            <!-- Action Button -->
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="mailto:${contactData.email}?subject=Re: Your message from portfolio" 
                                   style="display: inline-block; background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: 600; font-size: 16px;">
                                    Reply to ${contactData.name}
                                </a>
                            </div>
                        </div>
                        
                        <!-- Footer -->
                        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e9ecef;">
                            <p style="margin: 0; color: #666; font-size: 14px;">
                                📧 Sent from your portfolio contact form<br>
                                🕒 Received on ${new Date().toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}
                            </p>
                        </div>
                    </div>
                </body>
                </html>
            `,
        };

        const sendGridApiKey = this.configService.get<string>('SENDGRID_API_KEY');

        try {
            // Try SendGrid first (if API key is available)
            if (sendGridApiKey) {
                console.log('Attempting to send email via SendGrid...');

                const msg = {
                    to: 'aman.kumar2k15@gmail.com',
                    from: {
                        email: 'aman.kumar2k15@gmail.com',
                        name: 'Portfolio Contact Form'
                    },
                    replyTo: contactData.email, // This allows you to reply directly to the form submitter
                    subject: `New Contact Form Submission from ${contactData.name}`,
                    html: mailOptions.html,
                    mailSettings: {
                        sandboxMode: {
                            enable: false
                        }
                    },
                    trackingSettings: {
                        clickTracking: {
                            enable: false
                        },
                        openTracking: {
                            enable: false
                        }
                    }
                };

                const result = await sgMail.send(msg);
                console.log('Contact notification email sent successfully via SendGrid:', result[0].statusCode);
                console.log('SendGrid Message ID:', result[0].headers['x-message-id']);
                console.log('Email sent to:', msg.to);
                console.log('Email sent from:', msg.from);
                return;
            }

            // Fallback to Gmail (will likely fail on Render)
            console.log('Attempting to send email via Gmail SMTP...');
            console.log('Email config:', {
                from: this.configService.get<string>('EMAIL_USER'),
                to: 'aman.kumar2k15@gmail.com',
                subject: mailOptions.subject
            });

            const result = await this.transporter.sendMail(mailOptions);
            console.log('Contact notification email sent successfully via Gmail:', result.messageId);

        } catch (error) {
            console.error('Error sending contact notification email:', error);
            console.error('Error details:', {
                code: error.code,
                command: error.command,
                response: error.response
            });

            // Log SendGrid specific error details
            if (error.response && error.response.body && error.response.body.errors) {
                console.error('SendGrid error details:', error.response.body.errors);
            }

            // Don't throw error to prevent API failure
            // The contact form should still work even if email fails
        }
    }
}