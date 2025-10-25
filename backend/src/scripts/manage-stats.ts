#!/usr/bin/env ts-node

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { StatsService } from '../stats/stats.service';
import * as readline from 'readline';

interface StatsData {
    key: string;
    label: string;
    value: string;
    icon: string;
    color?: string;
    order?: number;
    isActive?: boolean;
    description?: string;
}

class StatsManager {
    private statsService: StatsService;
    private rl: readline.Interface;

    constructor(statsService: StatsService) {
        this.statsService = statsService;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    async start() {
        console.log('\n📊 Statistics Manager - Backend CLI Tool\n');

        while (true) {
            console.log('Available commands:');
            console.log('1. List all statistics');
            console.log('2. Add new statistic');
            console.log('3. Update statistic');
            console.log('4. Delete statistic');
            console.log('5. Toggle active status');
            console.log('6. Update stat value by key');
            console.log('7. Exit');

            const choice = await this.question('\nEnter your choice (1-7): ');

            try {
                switch (choice) {
                    case '1':
                        await this.listStats();
                        break;
                    case '2':
                        await this.addStat();
                        break;
                    case '3':
                        await this.updateStat();
                        break;
                    case '4':
                        await this.deleteStat();
                        break;
                    case '5':
                        await this.toggleActive();
                        break;
                    case '6':
                        await this.updateStatValue();
                        break;
                    case '7':
                        console.log('Goodbye! 👋');
                        process.exit(0);
                    default:
                        console.log('Invalid choice. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error.message);
            }

            console.log('\n' + '='.repeat(50) + '\n');
        }
    }

    async listStats() {
        const stats = await this.statsService.findAllAdmin();

        if (stats.length === 0) {
            console.log('No statistics found.');
            return;
        }

        console.log('\n📊 All Statistics:\n');
        stats.forEach((stat, index) => {
            console.log(`${index + 1}. ${stat.label}: ${stat.value}`);
            console.log(`   Key: ${stat.key}`);
            console.log(`   Icon: ${stat.icon}`);
            console.log(`   Color: ${stat.color}`);
            console.log(`   Status: ${stat.isActive ? '✅ Active' : '❌ Inactive'}`);
            console.log(`   Order: ${stat.order}`);
            if (stat.description) {
                console.log(`   Description: ${stat.description}`);
            }
            console.log(`   ID: ${stat._id}`);
            console.log('');
        });
    }

    async addStat() {
        console.log('\n➕ Add New Statistic\n');

        const key = await this.question('Key (unique identifier, e.g., years_experience): ');
        const label = await this.question('Label (display name): ');
        const value = await this.question('Value (e.g., 3+, 50+): ');
        const icon = await this.question('Icon (Calendar, Award, Users, Code2, etc.): ') || 'Award';
        const color = await this.question('Color (hex code, optional): ') || '#3B82F6';
        const description = await this.question('Description (optional): ') || '';

        const statsData: StatsData = {
            key,
            label,
            value,
            icon,
            color,
            isActive: true,
            description
        };

        const created = await this.statsService.create(statsData);
        console.log(`✅ Statistic created successfully! ID: ${created._id}`);
    }

    async updateStat() {
        await this.listStats();
        const id = await this.question('Enter statistic ID to update: ');

        try {
            const stat = await this.statsService.findOne(id);
            console.log(`\n📝 Updating: ${stat.label}\n`);

            const label = await this.question(`Label (${stat.label}): `) || stat.label;
            const value = await this.question(`Value (${stat.value}): `) || stat.value;
            const icon = await this.question(`Icon (${stat.icon}): `) || stat.icon;
            const color = await this.question(`Color (${stat.color}): `) || stat.color;
            const description = await this.question(`Description (${stat.description || 'none'}): `) || stat.description;

            const updated = await this.statsService.update(id, {
                label,
                value,
                icon,
                color,
                description
            });

            console.log('✅ Statistic updated successfully!');
        } catch (error) {
            console.log('❌ Statistic not found.');
        }
    }

    async deleteStat() {
        await this.listStats();
        const id = await this.question('Enter statistic ID to delete: ');
        const confirm = await this.question('Are you sure? (y/N): ');

        if (confirm.toLowerCase() === 'y') {
            try {
                await this.statsService.remove(id);
                console.log('✅ Statistic deleted successfully!');
            } catch (error) {
                console.log('❌ Statistic not found.');
            }
        } else {
            console.log('Deletion cancelled.');
        }
    }

    async toggleActive() {
        await this.listStats();
        const id = await this.question('Enter statistic ID to toggle active status: ');

        try {
            const updated = await this.statsService.toggleActive(id);
            console.log(`✅ Statistic is now ${updated.isActive ? 'Active' : 'Inactive'}`);
        } catch (error) {
            console.log('❌ Statistic not found.');
        }
    }

    async updateStatValue() {
        await this.listStats();
        const key = await this.question('Enter statistic key to update value: ');
        const value = await this.question('Enter new value: ');

        try {
            const updated = await this.statsService.updateValueByKey(key, value);
            console.log(`✅ Updated ${updated.label} to ${updated.value}`);
        } catch (error) {
            console.log('❌ Statistic not found.');
        }
    }

    private question(prompt: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(prompt, resolve);
        });
    }

    close() {
        this.rl.close();
    }
}

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const statsService = app.get(StatsService);

    const manager = new StatsManager(statsService);

    process.on('SIGINT', () => {
        manager.close();
        process.exit(0);
    });

    await manager.start();
}

if (require.main === module) {
    bootstrap().catch(console.error);
}