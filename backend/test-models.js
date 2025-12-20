const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testModels() {
    // Test with one of the API keys from the database
    const testApiKey = 'AIzaSyCz5Rr_ynHfNARjY5M5Qqz2UQfAx_N8PZc';

    const modelsToTest = [
        'gemini-2.5-flash',
        'gemini-1.5-flash-latest',
        'gemini-1.5-flash',
        'gemini-1.5-pro-latest',
        'gemini-1.5-pro',
        'gemini-pro'
    ];

    try {
        console.log('🧪 Testing Google Gemini API with different model names...');
        console.log(`Using API Key: ${testApiKey.substring(0, 10)}...`);

        const genAI = new GoogleGenerativeAI(testApiKey);

        for (const modelName of modelsToTest) {
            console.log(`\n📤 Testing model: ${modelName}`);

            try {
                const model = genAI.getGenerativeModel({ model: modelName });

                const result = await model.generateContent('Hello! Can you respond with a simple greeting?');
                const response = await result.response;
                const text = response.text();

                console.log(`✅ SUCCESS with ${modelName}:`);
                console.log(`"${text}"`);
                console.log(`\n🎯 WORKING MODEL: ${modelName}`);
                return modelName; // Return the working model name

            } catch (error) {
                console.log(`❌ FAILED with ${modelName}: ${error.message}`);
            }
        }

        console.log('\n❌ No working models found!');

    } catch (error) {
        console.error('❌ General Error:', error.message);
    }
}

testModels();