const { MongoClient } = require('mongodb');
require('dotenv').config();

async function clearOldConfigs() {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/aman-portfolio';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('aiconfigs');

        // Clear all existing AI configurations
        const deleteResult = await collection.deleteMany({});
        console.log(`🗑️  Cleared ${deleteResult.deletedCount} old AI configurations`);

        console.log('\n🎉 Database is ready for new configurations!');
        console.log('\nNext steps:');
        console.log('1. Go to http://localhost:3000/admin/ai-config');
        console.log('2. Add new AI configuration with:');
        console.log('   - Provider: Google Gemini');
        console.log('   - Model: gemini-2.5-flash');
        console.log('   - API Key: AIzaSyCz5Rr_ynHfNARjY5M5Qqz2UQfAx_N8PZc');
        console.log('   - Make sure "Set as active configuration" is checked');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await client.close();
    }
}

clearOldConfigs();