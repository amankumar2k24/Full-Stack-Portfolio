import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../schemas/project.schema';

async function fixPlaceholderImages() {
    const app = await NestFactory.createApplicationContext(AppModule);

    try {
        const projectModel = app.get<Model<ProjectDocument>>('ProjectModel');

        console.log('Checking for projects with via.placeholder.com images...');

        // Find all projects with via.placeholder.com URLs
        const projectsWithPlaceholders = await projectModel.find({
            imageUrl: { $regex: /via\.placeholder\.com/ }
        }).exec();

        console.log(`Found ${projectsWithPlaceholders.length} projects with placeholder images`);

        if (projectsWithPlaceholders.length > 0) {
            // Update all projects with placeholder images
            const result = await projectModel.updateMany(
                { imageUrl: { $regex: /via\.placeholder\.com/ } },
                { $set: { imageUrl: '/api/placeholder/400/300' } }
            );

            console.log(`✅ Updated ${result.modifiedCount} project images`);
        }

        // Also check if there are any services with placeholder images
        try {
            const serviceModel = app.get<Model<any>>('ServiceModel');
            const servicesWithPlaceholders = await serviceModel.find({
                imageUrl: { $regex: /via\.placeholder\.com/ }
            }).exec();

            console.log(`Found ${servicesWithPlaceholders.length} services with placeholder images`);

            if (servicesWithPlaceholders.length > 0) {
                const serviceResult = await serviceModel.updateMany(
                    { imageUrl: { $regex: /via\.placeholder\.com/ } },
                    { $set: { imageUrl: '/api/placeholder/400/300' } }
                );

                console.log(`✅ Updated ${serviceResult.modifiedCount} service images`);
            }
        } catch (error) {
            console.log('No services collection found or error accessing it:', error.message);
        }

        console.log('✅ Placeholder image fix completed!');

    } catch (error) {
        console.error('❌ Error fixing placeholder images:', error);
    } finally {
        await app.close();
    }
}

fixPlaceholderImages();