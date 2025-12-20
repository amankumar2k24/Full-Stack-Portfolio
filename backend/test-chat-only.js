const axios = require('axios');

const API_BASE = 'http://localhost:5001';

async function testChatOnly() {
    try {
        console.log('Testing AI Assistant Chat (Round-Robin)...');

        const questions = [
            'What are Aman\'s main technical skills?',
            'Where does Aman currently work?',
            'What projects has Aman worked on?',
            'What services does Aman offer?',
            'Tell me about Aman\'s experience'
        ];

        console.log('\nTesting multiple questions to see round-robin in action...');

        for (let i = 0; i < questions.length; i++) {
            console.log(`\n${i + 1}. Question: ${questions[i]}`);

            try {
                const chatResponse = await axios.post(`${API_BASE}/ai-assistant/chat`, {
                    message: questions[i]
                });

                console.log(`   ✅ Response (API Key: ${chatResponse.data.usedApiKey || 'unknown'}):`);
                console.log(`   ${chatResponse.data.message.substring(0, 100)}...`);

            } catch (error) {
                console.log(`   ❌ Error: ${error.response?.data?.message || error.message}`);
            }

            // Small delay between requests
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        console.log('\n🎉 Chat test completed!');
        console.log('\nNote: To see round-robin in action, you need to:');
        console.log('1. Go to http://localhost:3000/admin/ai-config');
        console.log('2. Add multiple AI configurations with different API keys');
        console.log('3. Make sure they are all set as "Active"');
        console.log('4. Run this test again to see different API keys being used');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

testChatOnly();