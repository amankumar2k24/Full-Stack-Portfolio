const { MongoClient } = require('mongodb');
require('dotenv').config();

async function updatePlaceholderImages() {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();

        // Update projects collection
        const projectsCollection = db.collection('projects');
        const projectsResult = await projectsCollection.updateMany(
            { imageUrl: { $regex: /via\.placeholder\.com/ } },
            { $set: { imageUrl: '/api/placeholder/400/300' } }
        );

        console.log(`Updated ${projectsResult.modifiedCount} project images`);

        // Update any other collections that might have placeholder images
        const servicesCollection = db.collection('services');
        const servicesResult = await servicesCollection.updateMany(
            { imageUrl: { $regex: /via\.placeholder\.com/ } },
            { $set: { imageUrl: '/api/placeholder/400/300' } }
        );

        console.log(`Updated ${servicesResult.modifiedCount} service images`);

        console.log('✅ Placeholder images updated successfully!');

    } catch (error) {
        console.error('❌ Error updating placeholder images:', error);
    } finally {
        await client.close();
        console.log('Database connection closed');
    }
}

updatePlaceholderImages();