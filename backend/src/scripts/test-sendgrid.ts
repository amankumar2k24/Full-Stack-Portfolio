import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { EmailService } from '../email/email.service';

async function testSendGrid() {
    console.log('🚀 Testing SendGrid integration...');

    try {
        // Create NestJS application context
        const app = await NestFactory.createApplicationContext(AppModule);
        const emailService = app.get(EmailService);

        // Test email data
        const testContactData = {
            name: 'Test User',
            email: 'test@example.com',
            message: 'This is a test message to verify SendGrid integration is working correctly.'
        };

        console.log('📧 Sending test email...');

        // Send test email
        await emailService.sendContactNotification(testContactData);

        console.log('✅ Test completed! Check your email and console logs.');

        // Close the application context
        await app.close();

    } catch (error) {
        console.error('❌ SendGrid test failed:', error);
        process.exit(1);
    }
}

// Run the test
testSendGrid();