"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const email_service_1 = require("../email/email.service");
async function testSendGrid() {
    console.log('🚀 Testing SendGrid integration...');
    try {
        const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
        const emailService = app.get(email_service_1.EmailService);
        const testContactData = {
            name: 'Test User',
            email: 'test@example.com',
            message: 'This is a test message to verify SendGrid integration is working correctly.'
        };
        console.log('📧 Sending test email...');
        await emailService.sendContactNotification(testContactData);
        console.log('✅ Test completed! Check your email and console logs.');
        await app.close();
    }
    catch (error) {
        console.error('❌ SendGrid test failed:', error);
        process.exit(1);
    }
}
testSendGrid();
//# sourceMappingURL=test-sendgrid.js.map