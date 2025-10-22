import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';

async function updateAdmin() {
    const app = await NestFactory.createApplicationContext(AppModule);

    try {
        // Get the user model
        const userModel = app.get<Model<UserDocument>>('UserModel');

        // Hash the new password
        const hashedPassword = await bcrypt.hash('Aman@123', 10);

        // Update the existing admin user
        const result = await userModel.updateOne(
            { email: 'admin@example.com' },
            {
                $set: {
                    email: 'aman.kumar2k15@gmail.com',
                    password: hashedPassword,
                    updatedAt: new Date()
                }
            }
        );

        if (result.matchedCount > 0) {
            console.log('✅ Admin user updated successfully!');
            console.log('New credentials:');
            console.log('Email: aman.kumar2k15@gmail.com');
            console.log('Password: Aman@123');
        } else {
            console.log('❌ No user found with email: admin@example.com');

            // Create new user if old one doesn't exist
            console.log('Creating new admin user...');
            const newUser = new userModel({
                email: 'aman.kumar2k15@gmail.com',
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            await newUser.save();
            console.log('✅ New admin user created successfully!');
        }

        // Verify the user exists
        const user = await userModel.findOne({ email: 'aman.kumar2k15@gmail.com' });
        if (user) {
            console.log('✅ Verification: User exists in database');
            console.log('User ID:', user._id);
            console.log('Email:', user.email);
        }

    } catch (error) {
        console.error('❌ Error updating admin user:', error);
    } finally {
        await app.close();
    }
}

updateAdmin();