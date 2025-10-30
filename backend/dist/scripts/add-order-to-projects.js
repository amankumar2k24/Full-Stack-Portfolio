"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const projects_service_1 = require("../projects/projects.service");
async function addOrderToProjects(dryRun = true) {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const projectsService = app.get(projects_service_1.ProjectsService);
    try {
        console.log(dryRun ? 'DRY RUN: Checking existing projects...' : 'Adding order field to existing projects...');
        const projects = await projectsService.findAll();
        if (projects.length === 0) {
            console.log('No projects found.');
            return;
        }
        console.log(`Found ${projects.length} projects:`);
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            if (dryRun) {
                console.log(`Would update project "${project.title}" with order ${i}`);
                console.log(`  - Current data preserved: title, description, ${project.techStack.length} tech items, ${project.liveLinks.length} links, ${project.imageUrls.length} images`);
            }
            else {
                await projectsService.update(project._id.toString(), {
                    title: project.title,
                    description: project.description,
                    techStack: project.techStack,
                    liveLinks: project.liveLinks,
                    imageUrls: project.imageUrls,
                    order: i
                });
                console.log(`✅ Updated project "${project.title}" with order ${i}`);
            }
        }
        console.log(dryRun ?
            `DRY RUN COMPLETE: ${projects.length} projects would be updated safely.` :
            `✅ Successfully updated ${projects.length} projects with order field.`);
    }
    catch (error) {
        console.error('Error adding order to projects:', error);
    }
    finally {
        await app.close();
    }
}
addOrderToProjects(false);
//# sourceMappingURL=add-order-to-projects.js.map