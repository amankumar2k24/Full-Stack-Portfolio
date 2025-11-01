"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const mongoose_1 = require("@nestjs/mongoose");
const project_schema_1 = require("../schemas/project.schema");
async function fixImageUrls() {
    console.log('🔍 Checking for invalid image URLs in projects...\n');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const projectModel = app.get((0, mongoose_1.getModelToken)(project_schema_1.Project.name));
    try {
        const projects = await projectModel.find({});
        let fixedCount = 0;
        for (const project of projects) {
            let needsUpdate = false;
            const originalImageUrls = [...project.imageUrls];
            const originalLiveLinks = [...project.liveLinks];
            const validImageUrls = [];
            const newLiveLinks = [...project.liveLinks];
            for (const imageUrl of project.imageUrls) {
                if (imageUrl.match(/^https?:\/\/[^\/]+\/?$/) && !imageUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
                    console.log(`⚠️  Found website URL in imageUrls: ${imageUrl}`);
                    console.log(`   Project: ${project.title}`);
                    if (!newLiveLinks.includes(imageUrl)) {
                        newLiveLinks.push(imageUrl);
                        console.log(`   ✅ Moved to liveLinks`);
                    }
                    else {
                        console.log(`   ℹ️  Already in liveLinks`);
                    }
                    needsUpdate = true;
                }
                else {
                    validImageUrls.push(imageUrl);
                }
            }
            if (needsUpdate) {
                await projectModel.updateOne({ _id: project._id }, {
                    imageUrls: validImageUrls,
                    liveLinks: newLiveLinks
                });
                fixedCount++;
                console.log(`   🔧 Updated project: ${project.title}\n`);
            }
        }
        if (fixedCount === 0) {
            console.log('✅ No issues found! All image URLs are valid.');
        }
        else {
            console.log(`🎉 Fixed ${fixedCount} project(s) with invalid image URLs.`);
        }
    }
    catch (error) {
        console.error('❌ Error fixing image URLs:', error);
    }
    finally {
        await app.close();
    }
}
fixImageUrls();
//# sourceMappingURL=fix-image-urls.js.map