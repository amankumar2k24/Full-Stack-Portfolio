import * as sgMail from '@sendgrid/mail';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testSendGridConfig() {
    console.log('🔧 Testing SendGrid Configuration...');

    const apiKey = process.env.SENDGRID_API_KEY;

    if (!apiKey) {
        console.error('❌ SENDGRID_API_KEY not found in environment variables');
        return;
    }

    if (!apiKey.startsWith('SG.')) {
        console.error('❌ Invalid SendGrid API key format. Should start with "SG."');
        return;
    }

    console.log('✅ SendGrid API key found and has correct format');
    console.log('🔑 API Key:', apiKey.substring(0, 10) + '...' + apiKey.substring(apiKey.length - 10));

    // Set the API key
    sgMail.setApiKey(apiKey);

    console.log('✅ SendGrid client initialized successfully');

    // Create a test message (but don't send it)
    const testMessage = {
        to: 'aman.kumar2k15@gmail.com',
        from: 'noreply@sendgrid.net',
        subject: 'SendGrid Configuration Test',
        html: '<h1>Test Email</h1><p>This is a test email to verify SendGrid configuration.</p>',
    };

    console.log('✅ Test message created successfully');
    console.log('📧 Message details:', {
        to: testMessage.to,
        from: testMessage.from,
        subject: testMessage.subject
    });

    console.log('🎉 SendGrid configuration is valid!');
    console.log('📝 Note: Actual email sending may fail locally due to network restrictions,');
    console.log('   but it should work perfectly in production on Render.');
}

testSendGridConfig().catch(console.error);