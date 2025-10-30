import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from '../schemas/project.schema';

async function addOrderToProjectsSafe() {
    const app = await NestFactory.createApplicationContext(AppModule);

    try {
        // Get the model directly to use MongoDB operations
        const projectModel = app.get<Model<ProjectDocument>>('ProjectModel');

        console.log('Safely adding order field to existing projects...');

        // Get all projects
        const projects = await projectModel.find().exec();

        if (projects.length === 0) {
            console.log('No projects found.');
            return;
        }

        console.log(`Found ${projects.length} projects:`);

        // Update each project with ONLY the order field
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];

            // Only add the order field, don't touch anything else
            await projectModel.findByIdAndUpdate(
                project._id,
                { $set: { order: i } },  // Only set the order field
                { new: true }
            );

            console.log(`✅ Added order ${i} to project "${project.title}"`);
        }

        console.log(`✅ Successfully added order field to ${projects.length} projects.`);
    } catch (error) {
        console.error('Error adding order to projects:', error);
    } finally {
        await app.close();
    }
}

addOrderToProjectsSafe();