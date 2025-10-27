"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const projects_service_1 = require("../projects/projects.service");
async function migrateProjects() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const projectsService = app.get(projects_service_1.ProjectsService);
    try {
        console.log('Starting projects migration...');
        const projects = await projectsService.findAll();
        for (const project of projects) {
            const updateData = {};
            let needsUpdate = false;
            if (project.imageUrl && !project.imageUrls) {
                updateData.imageUrls = [project.imageUrl];
                needsUpdate = true;
                console.log(`Migrating imageUrl for project: ${project.title}`);
            }
            if (project.liveLink && !project.liveLinks) {
                updateData.liveLinks = [project.liveLink];
                needsUpdate = true;
                console.log(`Migrating liveLink for project: ${project.title}`);
            }
            if (!project.imageUrls) {
                updateData.imageUrls = [];
                needsUpdate = true;
            }
            if (!project.liveLinks) {
                updateData.liveLinks = [];
                needsUpdate = true;
            }
            if (needsUpdate) {
                await projectsService.update(project._id.toString(), updateData);
                console.log(`Updated project: ${project.title}`);
            }
        }
        console.log('Projects migration completed successfully!');
    }
    catch (error) {
        console.error('Migration failed:', error);
    }
    finally {
        await app.close();
    }
}
migrateProjects();
//# sourceMappingURL=migrate-projects.js.map