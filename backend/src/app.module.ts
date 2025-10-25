import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AboutModule } from './about/about.module';
import { SkillsModule } from './skills/skills.module';
import { ProjectsModule } from './projects/projects.module';
import { ContactModule } from './contact/contact.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ServicesModule } from './services/services.module';
import { ExperienceModule } from './experience/experience.module';
import { SettingsModule } from './settings/settings.module';
import { StatsModule } from './stats/stats.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/aman-portfolio'),
        AuthModule,
        AboutModule,
        SkillsModule,
        ProjectsModule,
        ContactModule,
        DashboardModule,
        ServicesModule,
        ExperienceModule,
        SettingsModule,
        StatsModule,
    ],
})
export class AppModule { }