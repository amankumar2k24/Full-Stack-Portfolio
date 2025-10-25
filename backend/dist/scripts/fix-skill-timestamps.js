"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const skills_service_1 = require("../skills/skills.service");
async function fixSkillTimestamps() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const skillsService = app.get(skills_service_1.SkillsService);
    try {
        const skills = await skillsService.findAll();
        console.log('Current skills and their timestamps:');
        skills.forEach((skill, index) => {
            console.log(`${index + 1}. ${skill.category}:`);
            console.log(`   createdAt: ${skill.createdAt}`);
            console.log(`   updatedAt: ${skill.updatedAt}`);
            console.log('');
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await app.close();
    }
}
fixSkillTimestamps();
//# sourceMappingURL=fix-skill-timestamps.js.map