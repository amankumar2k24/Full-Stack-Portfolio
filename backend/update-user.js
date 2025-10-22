const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function updateUser() {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db();
        const usersCollection = db.collection('users');

        // Hash the new password
        const hashedPassword = await bcrypt.hash('Aman@123', 10);

        // Update the existing admin user
        const result = await usersCollection.updateOne(
            { email: 'admin@example.com' },
            {
                $set: {
                    email: 'aman.kumar2k15@gmail.com',
                    password: hashedPassword
                }
            }
        );

        if (result.matchedCount > 0) {
            console.log('✅ User updated successfully!');
            console.log('New credentials:');
            console.log('Email: aman.kumar2k15@gmail.com');
            console.log('Password: Aman@123');
        } else {
            console.log('❌ No user found with email: admin@example.com');

            // Create new user if old one doesn't exist
            console.log('Creating new user...');
            await usersCollection.insertOne({
                email: 'aman.kumar2k15@gmail.com',
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            console.log('✅ New user created successfully!');
        }

    } catch (error) {
        console.error('❌ Error updating user:', error);
    } finally {
        await client.close();
        console.log('Database connection closed');
    }
}

updateUser();