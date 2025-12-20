const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGeminiDirect() {
    // Test with one of the API keys from the database
    const testApiKey = 'AIzaSyBH3gLWneM8vUPC0HkYkuVrxRpvVetHGEEi'; // First one from the list

    try {
        console.log('🧪 Testing Google Gemini API directly...');
        console.log(`Using API Key: ${testApiKey.substring(0, 10)}...`);

        const genAI = new GoogleGenerativeAI(testApiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        console.log('\n📤 Sending test prompt...');
        const result = await model.generateContent({
            contents: [
                {
                    role: 'user',
                    parts: [
                        {
                            text: 'Hello! Can you respond with a simple greeting?'
                        }
                    ]
                }
            ],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 100,
                topP: 0.8,
                topK: 10
            }
        });

        const response = await result.response;
        const text = response.text();

        console.log('✅ Gemini API Response:');
        console.log(`"${text}"`);
        console.log('\n🎉 API key is working correctly!');

    } catch (error) {
        console.error('❌ Gemini API Error:');
        console.error('Error message:', error.message);
        console.error('Error code:', error.code);
        console.error('Error details:', error.details);

        if (error.message.includes('API_KEY_INVALID')) {
            console.log('\n💡 The API key appears to be invalid or expired');
        } else if (error.message.includes('QUOTA_EXCEEDED')) {
            console.log('\n💡 The API key has exceeded its quota');
        } else if (error.message.includes('PERMISSION_DENIED')) {
            console.log('\n💡 The API key doesn\'t have permission for this operation');
        }
    }
}

testGeminiDirect();