"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
async function fixTimestampsDirect() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const skillModel = app.get('SkillModel');
    try {
        const desiredOrder = [
            'Frontend',
            'Backend',
            'Databases & ORM',
            'DevOps & Cloud',
            'Payments & Integrations',
            'Tools & Others'
        ];
        console.log('Updating timestamps directly...');
        for (let i = 0; i < desiredOrder.length; i++) {
            const categoryName = desiredOrder[i];
            const baseTime = new Date('2025-10-25T10:00:00.000Z');
            const newTimestamp = new Date(baseTime.getTime() + (i * 60 * 60 * 1000));
            const result = await skillModel.updateOne({ category: categoryName }, {
                $set: {
                    createdAt: newTimestamp,
                    updatedAt: new Date()
                }
            });
            if (result.modifiedCount > 0) {
                console.log(`${i + 1}. Updated ${categoryName} - createdAt: ${newTimestamp.toISOString()}`);
            }
            else {
                console.log(`${i + 1}. Category "${categoryName}" not found`);
            }
        }
        console.log('\nVerifying new order...');
        const skills = await skillModel.find().sort({ createdAt: 1 }).exec();
        skills.forEach((skill, index) => {
            console.log(`${index + 1}. ${skill.category} - ${skill.createdAt}`);
        });
        console.log('\nTimestamp fix complete!');
    }
    catch (error) {
        console.error('Error:', error);
    }
    finally {
        await app.close();
    }
}
fixTimestampsDirect();
//# sourceMappingURL=fix-timestamps-direct.js.map