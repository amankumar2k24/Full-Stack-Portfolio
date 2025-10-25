#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const skills_service_1 = require("../skills/skills.service");
async function seedDefaultSkills() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const skillsService = app.get(skills_service_1.SkillsService);
    const defaultSkills = [
        {
            category: 'Frontend',
            items: [
                { name: 'React', level: 95 },
                { name: 'Next.js', level: 90 },
                { name: 'TypeScript', level: 88 },
                { name: 'JavaScript', level: 92 },
                { name: 'Tailwind CSS', level: 92 },
                { name: 'HTML5', level: 98 },
                { name: 'CSS3', level: 95 }
            ]
        },
        {
            category: 'Backend',
            items: [
                { name: 'Node.js', level: 85 },
                { name: 'Express.js', level: 88 },
                { name: 'NestJS', level: 80 },
                { name: 'Python', level: 82 },
                { name: 'MongoDB', level: 85 },
                { name: 'PostgreSQL', level: 82 }
            ]
        },
        {
            category: 'Tools & Others',
            items: [
                { name: 'Git', level: 90 },
                { name: 'Docker', level: 75 },
                { name: 'AWS', level: 70 },
                { name: 'Vercel', level: 85 },
                { name: 'Figma', level: 80 },
                { name: 'Webpack', level: 75 }
            ]
        }
    ];
    console.log('🌱 Seeding default skills...\n');
    for (const skill of defaultSkills) {
        try {
            await skillsService.create(skill);
            console.log(`✅ Created category: ${skill.category} (${skill.items.length} skills)`);
        }
        catch (error) {
            console.log(`⚠️  Skipped: ${skill.category} (already exists)`);
        }
    }
    console.log('\n🎉 Default skills seeding completed!');
    console.log('\nYou can now:');
    console.log('1. Visit /admin/skills to manage your skills');
    console.log('2. View them live on your Skills section');
    console.log('3. Add more categories and skills as needed');
    await app.close();
}
if (require.main === module) {
    seedDefaultSkills().catch(console.error);
}
//# sourceMappingURL=seed-default-skills.js.map