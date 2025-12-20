const { MongoClient } = require('mongodb');
require('dotenv').config();

async function checkDbConfigs() {
    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/aman-portfolio';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('✅ Connected to MongoDB');

        const db = client.db();
        const collection = db.collection('aiconfigs');

        // Check all AI configurations
        console.log('\n📊 AI Configurations in Database:');
        const configs = await collection.find({}).toArray();

        if (configs.length === 0) {
            console.log('❌ No AI configurations found in database!');
            console.log('   Make sure you added them through the admin panel.');
            return;
        }

        console.log(`Found ${configs.length} configurations:`);

        configs.forEach((config, index) => {
            console.log(`\n${index + 1}. Configuration ID: ${config._id}`);
            console.log(`   Provider: ${config.provider}`);
            console.log(`   Model: ${config.modelName || config.model || 'Not set'}`);
            console.log(`   Active: ${config.isActive ? '✅ YES' : '❌ NO'}`);
            console.log(`   API Key: ${config.apiKey ? config.apiKey.substring(0, 10) + '...' : 'Not set'}`);
            console.log(`   Usage Count: ${config.usageCount || 0}`);
            console.log(`   Last Used: ${config.lastUsed ? new Date(config.lastUsed).toLocaleString() : 'Never'}`);
        });

        // Check active configurations
        const activeConfigs = await collection.find({ isActive: true }).toArray();
        console.log(`\n🎯 Active Configurations: ${activeConfigs.length}`);

        if (activeConfigs.length === 0) {
            console.log('❌ No active configurations found!');
            console.log('   Go to admin panel and make sure configurations are marked as "Active"');
        } else {
            console.log('✅ Active configurations ready for round-robin');
        }

        // Test round-robin logic
        if (activeConfigs.length > 1) {
            console.log('\n🔄 Round-Robin Test:');
            const sortedByLastUsed = activeConfigs.sort((a, b) => (a.lastUsed || 0) - (b.lastUsed || 0));
            console.log(`   Next config to use: ${sortedByLastUsed[0]._id} (Last used: ${sortedByLastUsed[0].lastUsed ? new Date(sortedByLastUsed[0].lastUsed).toLocaleString() : 'Never'})`);
        }

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await client.close();
    }
}

checkDbConfigs();