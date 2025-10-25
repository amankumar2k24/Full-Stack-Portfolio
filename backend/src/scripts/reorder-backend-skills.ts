import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SkillsService } from '../skills/skills.service';

async function reorderBackendSkills() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const skillsService = app.get(SkillsService);

    try {
        const skills = await skillsService.findAll();
        const backendSkill = skills.find(skill => skill.category === 'Backend');

        if (!backendSkill) {
            console.log('Backend category not found');
            return;
        }

        console.log('Current Backend skills order:');
        backendSkill.items.forEach((item, index) => {
            console.log(`${index + 1}. ${item.name}: ${item.level}%`);
        });

        // Define the desired order for Backend skills
        const desiredOrder = [
            'Node.js',
            'Nest.js',
            'Express.js',
            'RESTful APIs',
            'Microservices Architecture',
            'ElasticSearch',
            'BullMQ',
            'Cloudinary',
            'OpenAI API',
            'Gemini API',
            'Websocket  (Socket.io)'
        ];

        // Reorder the items array
        const reorderedItems = [];

        // First, add items in the desired order
        desiredOrder.forEach(skillName => {
            const item = backendSkill.items.find(item => item.name === skillName);
            if (item) {
                reorderedItems.push(item);
            }
        });

        // Then add any remaining items that weren't in the desired order
        backendSkill.items.forEach(item => {
            if (!desiredOrder.includes(item.name)) {
                reorderedItems.push(item);
            }
        });

        // Update the backend skill with reordered items
        await skillsService.update((backendSkill as any)._id.toString(), {
            category: backendSkill.category,
            items: reorderedItems
        });

        console.log('\nNew Backend skills order:');
        reorderedItems.forEach((item, index) => {
            console.log(`${index + 1}. ${item.name}: ${item.level}%`);
        });

        console.log('\nBackend skills reordered successfully!');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await app.close();
    }
}

reorderBackendSkills();