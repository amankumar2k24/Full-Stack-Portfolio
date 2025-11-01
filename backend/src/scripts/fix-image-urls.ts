import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Project } from '../schemas/project.schema';

async function fixImageUrls() {
    console.log('🔍 Checking for invalid image URLs in projects...\n');

    const app = await NestFactory.createApplicationContext(AppModule);
    const projectModel = app.get<Model<Project>>(getModelToken(Project.name));

    try {
        const projects = await projectModel.find({});
        let fixedCount = 0;

        for (const project of projects) {
            let needsUpdate = false;
            const originalImageUrls = [...project.imageUrls];
            const originalLiveLinks = [...project.liveLinks];

            // Check for website URLs in imageUrls that should be in liveLinks
            const validImageUrls = [];
            const newLiveLinks = [...project.liveLinks];

            for (const imageUrl of project.imageUrls) {
                // Check if this looks like a website URL rather than an image URL
                if (imageUrl.match(/^https?:\/\/[^\/]+\/?$/) && !imageUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
                    console.log(`⚠️  Found website URL in imageUrls: ${imageUrl}`);
                    console.log(`   Project: ${project.title}`);

                    // Move to liveLinks if not already there
                    if (!newLiveLinks.includes(imageUrl)) {
                        newLiveLinks.push(imageUrl);
                        console.log(`   ✅ Moved to liveLinks`);
                    } else {
                        console.log(`   ℹ️  Already in liveLinks`);
                    }
                    needsUpdate = true;
                } else {
                    validImageUrls.push(imageUrl);
                }
            }

            if (needsUpdate) {
                await projectModel.updateOne(
                    { _id: project._id },
                    {
                        imageUrls: validImageUrls,
                        liveLinks: newLiveLinks
                    }
                );
                fixedCount++;
                console.log(`   🔧 Updated project: ${project.title}\n`);
            }
        }

        if (fixedCount === 0) {
            console.log('✅ No issues found! All image URLs are valid.');
        } else {
            console.log(`🎉 Fixed ${fixedCount} project(s) with invalid image URLs.`);
        }

    } catch (error) {
        console.error('❌ Error fixing image URLs:', error);
    } finally {
        await app.close();
    }
}

fixImageUrls();