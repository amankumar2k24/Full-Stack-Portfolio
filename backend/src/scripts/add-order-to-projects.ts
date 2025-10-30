import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProjectsService } from '../projects/projects.service';
import { ProjectDocument } from '../schemas/project.schema';

async function addOrderToProjects(dryRun = true) {
    const app = await NestFactory.createApplicationContext(AppModule);
    const projectsService = app.get(ProjectsService);

    try {
        console.log(dryRun ? 'DRY RUN: Checking existing projects...' : 'Adding order field to existing projects...');

        // Get all projects
        const projects = await projectsService.findAll() as ProjectDocument[];

        if (projects.length === 0) {
            console.log('No projects found.');
            return;
        }

        console.log(`Found ${projects.length} projects:`);

        // Update each project with an order field based on creation date
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
 
            if (dryRun) {
                console.log(`Would update project "${project.title}" with order ${i}`);
                console.log(`  - Current data preserved: title, description, ${project.techStack.length} tech items, ${project.liveLinks.length} links, ${project.imageUrls.length} images`);
            } else {
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
            `✅ Successfully updated ${projects.length} projects with order field.`
        );
    } catch (error) {
        console.error('Error adding order to projects:', error);
    } finally {
        await app.close();
    }
}

// Run dry run first, then uncomment the second line to actually update
// addOrderToProjects(true);  // DRY RUN - safe to test
addOrderToProjects(false); // ACTUAL UPDATE - uncomment after dry run looks good