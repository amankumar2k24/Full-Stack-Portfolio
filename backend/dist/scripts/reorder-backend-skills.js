"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const skills_service_1 = require("../skills/skills.service");
async function reorderBackendSkills() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const skillsService = app.get(skills_service_1.SkillsService);
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
        const reorderedItems = [];
        desiredOrder.forEach(skillName => {
            const item = backendSkill.items.find(item => item.name === skillName);
            if (item) {
                reorderedItems.push(item);
            }
        });
        backendSkill.items.forEach(item => {
            if (!desiredOrder.includes(item.name)) {
                reorderedItems.push(item);
            }
        });
        await skillsService.update(backendSkill._id.toString(), {
            category: backendSkill.category,
            items: reorderedItems
        });
        console.log('\nNew Backend skills order:');
        reorderedItems.forEach((item, index) => {
            console.log(`${index + 1}. ${item.name}: ${item.level}%`);
        });
        console.log('\nBackend skills reordered successfully!');
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await app.close();
    }
}
reorderBackendSkills();
//# sourceMappingURL=reorder-backend-skills.js.map