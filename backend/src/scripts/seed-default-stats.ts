#!/usr/bin/env ts-node

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { StatsService } from '../stats/stats.service';

async function seedDefaultStats() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const statsService = app.get(StatsService);

    const defaultStats = [
        {
            key: 'years_experience',
            label: 'Years Experience',
            value: '2.8+',
            icon: 'Calendar',
            color: '#3b82f6',
            order: 0,
            isActive: true,
            description: 'Total years of professional development experience'
        },
        {
            key: 'projects_completed',
            label: 'Projects Completed',
            value: '50+',
            icon: 'Award',
            color: '#10b981',
            order: 1,
            isActive: true,
            description: 'Successfully delivered projects across various technologies'
        },
        {
            key: 'technologies',
            label: 'Technologies',
            value: '20+',
            icon: 'Code2',
            color: '#f59e0b',
            order: 2,
            isActive: true,
            description: 'Programming languages and frameworks mastered'
        },
        {
            key: 'client_satisfaction',
            label: 'Client Satisfaction',
            value: '100%',
            icon: 'Users',
            color: '#8b5cf6',
            order: 3,
            isActive: true,
            description: 'Happy clients and successful project deliveries'
        }
    ];

    console.log('🌱 Seeding default statistics...\n');

    for (const stat of defaultStats) {
        try {
            await statsService.create(stat);
            console.log(`✅ Created: ${stat.label} (${stat.value})`);
        } catch (error) {
            console.log(`⚠️  Skipped: ${stat.label} (already exists)`);
        }
    }

    console.log('\n🎉 Default statistics seeding completed!');
    console.log('\nYou can now:');
    console.log('1. Visit /admin/stats to manage your statistics');
    console.log('2. View them live on your About section');
    console.log('3. Customize values, colors, and descriptions');

    await app.close();
}

if (require.main === module) {
    seedDefaultStats().catch(console.error);
}