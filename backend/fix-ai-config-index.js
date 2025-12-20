const { MongoClient } = require('mongodb');
require('dotenv').config();

async function fixAiConfigIndex() {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/aman-portfolio';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('aiconfigs');

        // Check existing indexes
        console.log('\nExisting indexes:');
        const indexes = await collection.indexes();
        indexes.forEach(index => {
            console.log('- ', JSON.stringify(index.key), index.unique ? '(unique)' : '');
        });

        // Drop the unique index on provider if it exists
        try {
            await collection.dropIndex('provider_1');
            console.log('\n✅ Successfully dropped unique index on provider field');
        } catch (error) {
            if (error.message.includes('index not found')) {
                console.log('\n⚠️  Index provider_1 not found (already dropped or doesn\'t exist)');
            } else {
                console.error('\n❌ Error dropping index:', error.message);
            }
        }

        // Clear existing data to avoid conflicts
        const deleteResult = await collection.deleteMany({});
        console.log(`\n🗑️  Cleared ${deleteResult.deletedCount} existing AI config documents`);

        console.log('\n🎉 AI Config collection is now ready for multiple providers!');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await client.close();
    }
}

fixAiConfigIndex();