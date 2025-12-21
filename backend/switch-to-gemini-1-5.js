const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// AI Config schema
const aiConfigSchema = new mongoose.Schema({
    provider: String,
    apiKey: String,
    modelName: String,
    temperature: Number,
    maxTokens: Number,
    isActive: Boolean,
    description: String,
    usageCount: { type: Number, default: 0 },
    lastUsed: { type: Number, default: 0 }
}, { timestamps: true });

const AiConfig = mongoose.model('AiConfig', aiConfigSchema);

async function switchToGemini15() {
    try {
        console.log('🔄 Switching from gemini-2.5-flash to gemini-1.5-flash...\n');

        // Find all configs using gemini-2.5-flash
        const configs = await AiConfig.find({ modelName: 'gemini-2.5-flash' });

        if (configs.length === 0) {
            console.log('ℹ️  No gemini-2.5-flash configurations found.');

            // Check what models are currently being used
            const allConfigs = await AiConfig.find({});
            console.log('\n📊 Current configurations:');
            allConfigs.forEach((config, index) => {
                console.log(`${index + 1}. ${config.provider} - ${config.modelName} (Active: ${config.isActive})`);
            });

            return;
        }

        console.log(`Found ${configs.length} configurations using gemini-2.5-flash:`);

        // Update each configuration
        for (let config of configs) {
            console.log(`\n🔧 Updating config ${config._id}:`);
            console.log(`   From: ${config.modelName}`);

            await AiConfig.updateOne(
                { _id: config._id },
                {
                    modelName: 'gemini-1.5-flash',
                    usageCount: 0, // Reset usage count
                    lastUsed: 0    // Reset last used
                }
            );

            console.log(`   To: gemini-1.5-flash ✅`);
        }

        console.log(`\n✅ Successfully updated ${configs.length} configurations!`);
        console.log('💡 gemini-1.5-flash has a separate quota, so you can use it immediately.');

        // Show updated configurations
        const updatedConfigs = await AiConfig.find({ isActive: true });
        console.log('\n📊 Active configurations after update:');
        updatedConfigs.forEach((config, index) => {
            console.log(`${index + 1}. ${config.provider} - ${config.modelName} (Usage: ${config.usageCount})`);
        });

    } catch (error) {
        console.error('❌ Error switching models:', error);
    } finally {
        mongoose.connection.close();
    }
}

switchToGemini15();