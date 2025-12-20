const axios = require('axios');

const API_BASE = 'http://localhost:5001';

async function testRoundRobinAiConfig() {
    try {
        console.log('Testing Round-Robin AI Configuration...');

        // Test 1: Create multiple AI Configurations
        console.log('\n1. Creating multiple AI Configurations...');

        const apiKeys = [
            'AIzaSyDVbkO1OSmM4jMOgNqJl56sKse9o0SI55UA',
            'AIzaSyBH3gLWneM8vUPC0HkYkuVrxRpvVetHGEEi'
        ];

        const configs = [];
        for (let i = 0; i < apiKeys.length; i++) {
            const createResponse = await axios.post(`${API_BASE}/ai-config`, {
                provider: 'gemini',
                apiKey: apiKeys[i],
                modelName: 'gemini-1.5-flash',
                temperature: 0.7,
                maxTokens: 1000,
                isActive: true,
                description: `Gemini AI configuration ${i + 1} for round-robin`
            });
            configs.push(createResponse.data);
            console.log(`✅ AI Configuration ${i + 1} created:`, createResponse.data._id);
        }

        // Test 2: Get all active configurations
        console.log('\n2. Fetching all active AI configurations...');
        const getAllActiveResponse = await axios.get(`${API_BASE}/ai-config/active/all`);
        console.log('✅ Found active configurations:', getAllActiveResponse.data.length);

        // Test 3: Test multiple AI Assistant chats to see round-robin in action
        console.log('\n3. Testing AI Assistant chat with round-robin...');
        const questions = [
            'What are Aman\'s main technical skills?',
            'Where does Aman currently work?',
            'What projects has Aman worked on?',
            'What services does Aman offer?',
            'Tell me about Aman\'s experience'
        ];

        for (let i = 0; i < questions.length; i++) {
            console.log(`\n   Question ${i + 1}: ${questions[i]}`);
            const chatResponse = await axios.post(`${API_BASE}/ai-assistant/chat`, {
                message: questions[i]
            });
            console.log(`   ✅ Response (${chatResponse.data.usedApiKey}):`,
                chatResponse.data.message.substring(0, 80) + '...');
        }

        // Test 4: Check usage statistics
        console.log('\n4. Checking usage statistics...');
        const statsResponse = await axios.get(`${API_BASE}/ai-config/stats`);
        console.log('✅ Usage Statistics:');
        statsResponse.data.forEach(stat => {
            console.log(`   - ${stat.provider} (${stat.modelName}): ${stat.usageCount} uses, Last: ${new Date(stat.lastUsed).toLocaleTimeString()}`);
        });

        console.log('\n🎉 Round-robin AI configuration test completed successfully!');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

testRoundRobinAiConfig();