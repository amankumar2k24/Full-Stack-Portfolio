"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
async function fixPlaceholderImages() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        const projectModel = app.get('ProjectModel');
        console.log('Checking for projects with via.placeholder.com images...');
        const projectsWithPlaceholders = await projectModel.find({
            imageUrl: { $regex: /via\.placeholder\.com/ }
        }).exec();
        console.log(`Found ${projectsWithPlaceholders.length} projects with placeholder images`);
        if (projectsWithPlaceholders.length > 0) {
            const result = await projectModel.updateMany({ imageUrl: { $regex: /via\.placeholder\.com/ } }, { $set: { imageUrl: '/api/placeholder/400/300' } });
            console.log(`✅ Updated ${result.modifiedCount} project images`);
        }
        try {
            const serviceModel = app.get('ServiceModel');
            const servicesWithPlaceholders = await serviceModel.find({
                imageUrl: { $regex: /via\.placeholder\.com/ }
            }).exec();
            console.log(`Found ${servicesWithPlaceholders.length} services with placeholder images`);
            if (servicesWithPlaceholders.length > 0) {
                const serviceResult = await serviceModel.updateMany({ imageUrl: { $regex: /via\.placeholder\.com/ } }, { $set: { imageUrl: '/api/placeholder/400/300' } });
                console.log(`✅ Updated ${serviceResult.modifiedCount} service images`);
            }
        }
        catch (error) {
            console.log('No services collection found or error accessing it:', error.message);
        }
        console.log('✅ Placeholder image fix completed!');
    }
    catch (error) {
        console.error('❌ Error fixing placeholder images:', error);
    }
    finally {
        await app.close();
    }
}
fixPlaceholderImages();
//# sourceMappingURL=fix-placeholder-images.js.map