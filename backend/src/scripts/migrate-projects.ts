import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ProjectsService } from '../projects/projects.service';

async function migrateProjects() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const projectsService = app.get(ProjectsService);

    try {
        console.log('Starting projects migration...');

        // Get all existing projects
        const projects: any = await projectsService.findAll();

        for (const project of projects) {
            const updateData: any = {};
            let needsUpdate = false;

            // Migrate single imageUrl to imageUrls array
            if ((project as any).imageUrl && !(project as any).imageUrls) {
                updateData.imageUrls = [(project as any).imageUrl];
                needsUpdate = true;
                console.log(`Migrating imageUrl for project: ${project.title}`);
            }

            // Migrate single liveLink to liveLinks array
            if ((project as any).liveLink && !(project as any).liveLinks) {
                updateData.liveLinks = [(project as any).liveLink];
                needsUpdate = true;
                console.log(`Migrating liveLink for project: ${project.title}`);
            }

            // Ensure arrays exist even if empty
            if (!(project as any).imageUrls) {
                updateData.imageUrls = [];
                needsUpdate = true;
            }

            if (!(project as any).liveLinks) {
                updateData.liveLinks = [];
                needsUpdate = true;
            }

            if (needsUpdate) {
                await projectsService.update(project._id.toString(), updateData);
                console.log(`Updated project: ${project.title}`);
            }
        }

        console.log('Projects migration completed successfully!');
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await app.close();
    }
}

migrateProjects();