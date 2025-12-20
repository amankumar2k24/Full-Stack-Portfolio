const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listGeminiModels() {
    // Test with one of the API keys
    const testApiKey = 'AIzaSyBH3gLWneM8vUPC0HkYkuVrxRpvVetHGEEi';

    try {
        console.log('📋 Listing available Gemini models...');

        const genAI = new GoogleGenerativeAI(testApiKey);

        // List all available models
        const models = await genAI.listModels();

        console.log('\n✅ Available models:');
        models.forEach((model, index) => {
            console.log(`${index + 1}. ${model.name}`);
            console.log(`   Display Name: ${model.displayName}`);
            console.log(`   Description: ${model.description}`);
            console.log(`   Supported Methods: ${model.supportedGenerationMethods?.join(', ') || 'N/A'}`);
            console.log('');
        });

        // Test with the correct model name
        console.log('🧪 Testing with correct model name...');
        const correctModel = models.find(m => m.name.includes('flash') || m.name.includes('gemini'));

        if (correctModel) {
            console.log(`Testing with: ${correctModel.name}`);
            const model = genAI.getGenerativeModel({ model: correctModel.name });

            const result = await model.generateContent('Hello! Please respond with a simple greeting.');
            const response = await result.response;
            const text = response.text();

            console.log('✅ Test successful!');
            console.log(`Response: "${text}"`);
            console.log(`\n💡 Use this model name: ${correctModel.name}`);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

listGeminiModels();