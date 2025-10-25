"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const skills_service_1 = require("../skills/skills.service");
async function reorderSkills() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const skillsService = app.get(skills_service_1.SkillsService);
    try {
        const skills = await skillsService.findAll();
        console.log('Current skills:');
        skills.forEach((skill, index) => {
            console.log(`${index + 1}. ${skill.category}:`);
            skill.items.forEach(item => {
                console.log(`   - ${item.name}: ${item.level}%`);
            });
            console.log('');
        });
        const desiredOrder = [
            'Frontend',
            'Backend',
            'Databases & ORM',
            'DevOps & Cloud',
            'Payments & Integrations',
            'Tools & Others'
        ];
        console.log('Reordering skills...');
        for (let i = 0; i < desiredOrder.length; i++) {
            const categoryName = desiredOrder[i];
            const skill = skills.find(s => s.category === categoryName);
            if (skill) {
                const newTimestamp = new Date(Date.now() - (desiredOrder.length - i) * 10000);
                await skillsService.update(skill._id.toString(), {
                    category: skill.category,
                    items: skill.items
                });
                console.log(`${i + 1}. Updated ${skill.category} - new order position: ${i + 1}`);
            }
        }
        console.log('\nReordering complete! The skills should now appear in the correct order.');
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await app.close();
    }
}
reorderSkills();
//# sourceMappingURL=reorder-skills.js.map