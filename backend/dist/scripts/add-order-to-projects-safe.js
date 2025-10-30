"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
async function addOrderToProjectsSafe() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        const projectModel = app.get('ProjectModel');
        console.log('Safely adding order field to existing projects...');
        const projects = await projectModel.find().exec();
        if (projects.length === 0) {
            console.log('No projects found.');
            return;
        }
        console.log(`Found ${projects.length} projects:`);
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            await projectModel.findByIdAndUpdate(project._id, { $set: { order: i } }, { new: true });
            console.log(`✅ Added order ${i} to project "${project.title}"`);
        }
        console.log(`✅ Successfully added order field to ${projects.length} projects.`);
    }
    catch (error) {
        console.error('Error adding order to projects:', error);
    }
    finally {
        await app.close();
    }
}
addOrderToProjectsSafe();
//# sourceMappingURL=add-order-to-projects-safe.js.map