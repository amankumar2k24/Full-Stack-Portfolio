const axios = require('axios');
require('dotenv').config();

const API_BASE = 'http://localhost:5001';

async function debugAiConfig() {
    try {
        console.log('🔍 Debugging AI Configuration...');

        // Test 1: Check if we can get website context
        console.log('\n1. Testing website context...');
        try {
            const contextResponse = await axios.get(`${API_BASE}/ai-assistant/context`);
            console.log('✅ Website context loaded successfully');
            console.log('   - About info:', contextResponse.data.personalInfo?.name || 'Not found');
            console.log('   - Skills count:', contextResponse.data.skills?.length || 0);
            console.log('   - Projects count:', contextResponse.data.projects?.length || 0);
        } catch (error) {
            console.log('❌ Website context failed:', error.response?.data || error.message);
        }

        // Test 2: Try a simple chat without authentication
        console.log('\n2. Testing simple chat...');
        try {
            const chatResponse = await axios.post(`${API_BASE}/ai-assistant/chat`, {
                message: 'Hello, can you tell me about Aman?'
            });

            console.log('✅ Chat response received');
            console.log('   - Message length:', chatResponse.data.message?.length || 0);
            console.log('   - Used API Key:', chatResponse.data.usedApiKey || 'Not provided');
            console.log('   - Error flag:', chatResponse.data.error || false);
            console.log('   - Response preview:', chatResponse.data.message?.substring(0, 150) + '...');

        } catch (error) {
            console.log('❌ Chat failed:', error.response?.data || error.message);
        }

        // Test 3: Check backend logs for more details
        console.log('\n3. Check your backend console for detailed error logs');
        console.log('   The backend should show specific errors about:');
        console.log('   - Database connections');
        console.log('   - API key validation');
        console.log('   - Google Gemini API calls');

        console.log('\n💡 Troubleshooting steps:');
        console.log('1. Make sure all 12 API keys are marked as "Active" in admin panel');
        console.log('2. Verify the API keys are valid Google Gemini keys');
        console.log('3. Check if there are any rate limits or quota issues');
        console.log('4. Ensure the backend can connect to Google Gemini API');

    } catch (error) {
        console.error('❌ Debug failed:', error.message);
    }
}

debugAiConfig();