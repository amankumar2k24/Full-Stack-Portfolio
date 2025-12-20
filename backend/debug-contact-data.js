const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define schemas
const aboutSchema = new mongoose.Schema({
    title: String,
    bio: String,
    profileImage: String,
    resumeLink: String,
    location: String
}, { timestamps: true });

const settingsSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: String, required: true },
    description: String,
    type: { type: String, default: 'text' }
}, { timestamps: true });

const About = mongoose.model('About', aboutSchema);
const Settings = mongoose.model('Settings', settingsSchema);

async function debugContactData() {
    try {
        console.log('=== DEBUGGING CONTACT DATA ===\n');

        // Fetch About data
        console.log('1. About Collection:');
        const about = await About.findOne().exec();
        console.log('About data:', JSON.stringify(about, null, 2));

        console.log('\n2. Settings Collection:');
        const settings = await Settings.find().exec();
        console.log('All settings:');
        settings.forEach(setting => {
            console.log(`  ${setting.key}: ${setting.value}`);
        });

        // Convert settings to object like in the service
        console.log('\n3. Settings as Object:');
        const settingsObj = settings.reduce((acc, setting) => {
            acc[setting.key] = setting.value;
            return acc;
        }, {});
        console.log('Settings object:', JSON.stringify(settingsObj, null, 2));

        // Simulate the personalInfo object creation
        console.log('\n4. Personal Info Object (as created in service):');
        const personalInfo = {
            name: settingsObj['name'] || 'Aman Kumar',
            title: settingsObj['title'] || about?.title || '',
            bio: about?.bio || '',
            location: settingsObj['location'] || '',
            email: settingsObj['email'] || '',
            phone: settingsObj['phone'] || '',
            github: settingsObj['github'] || '',
            linkedin: settingsObj['linkedin'] || '',
            twitter: settingsObj['twitter'] || '',
        };
        console.log('Personal Info:', JSON.stringify(personalInfo, null, 2));

        // Check specific contact fields
        console.log('\n5. Contact Fields Check:');
        console.log(`Email: ${personalInfo.email ? '✓ Available' : '✗ Missing'} - "${personalInfo.email}"`);
        console.log(`Phone: ${personalInfo.phone ? '✓ Available' : '✗ Missing'} - "${personalInfo.phone}"`);
        console.log(`LinkedIn: ${personalInfo.linkedin ? '✓ Available' : '✗ Missing'} - "${personalInfo.linkedin}"`);
        console.log(`GitHub: ${personalInfo.github ? '✓ Available' : '✗ Missing'} - "${personalInfo.github}"`);
        console.log(`Twitter: ${personalInfo.twitter ? '✓ Available' : '✗ Missing'} - "${personalInfo.twitter}"`);

    } catch (error) {
        console.error('Error debugging contact data:', error);
    } finally {
        mongoose.connection.close();
    }
}

debugContactData();