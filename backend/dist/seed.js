"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const auth_service_1 = require("./auth/auth.service");
const about_service_1 = require("./about/about.service");
const skills_service_1 = require("./skills/skills.service");
const projects_service_1 = require("./projects/projects.service");
const services_service_1 = require("./services/services.service");
async function seed() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const authService = app.get(auth_service_1.AuthService);
    const aboutService = app.get(about_service_1.AboutService);
    const skillsService = app.get(skills_service_1.SkillsService);
    const projectsService = app.get(projects_service_1.ProjectsService);
    const servicesService = app.get(services_service_1.ServicesService);
    try {
        console.log('Creating admin user...');
        try {
            await authService.createUser('aman.kumar2k15@gmail.com', 'Aman@123');
            console.log('Admin user created: aman.kumar2k15@gmail.com / Aman@123');
        }
        catch (error) {
            console.log('Admin user already exists, skipping...');
        }
        console.log('Checking about section...');
        try {
            const existingAbout = await aboutService.findOne();
            if (existingAbout) {
                console.log('About section already exists, skipping...');
            }
            else {
                await aboutService.create({
                    name: 'Aman Kumar',
                    title: 'Senior Full-Stack Developer',
                    bio: 'Passionate full-stack developer with expertise in modern web technologies. I love building scalable applications and solving complex problems.',
                    location: 'India',
                    socials: {
                        github: 'https://github.com/aman',
                        linkedin: 'https://linkedin.com/in/aman',
                        twitter: 'https://twitter.com/aman',
                        email: 'aman.kumar2k15@gmail.com',
                    },
                });
                console.log('About section created');
            }
        }
        catch (error) {
            console.log('Error checking about section, creating new one...');
            await aboutService.create({
                name: 'Aman Kumar',
                title: 'Senior Full-Stack Developer',
                bio: 'Passionate full-stack developer with expertise in modern web technologies. I love building scalable applications and solving complex problems.',
                location: 'India',
                socials: {
                    github: 'https://github.com/aman',
                    linkedin: 'https://linkedin.com/in/aman',
                    twitter: 'https://twitter.com/aman',
                    email: 'aman.kumar2k15@gmail.com',
                },
            });
            console.log('About section created');
        }
        console.log('Checking skills...');
        const existingSkills = await skillsService.findAll();
        if (existingSkills.length > 0) {
            console.log('Skills already exist, skipping...');
        }
        else {
            const skillCategories = [
                {
                    category: 'Frontend',
                    items: [
                        { name: 'React', level: 95 },
                        { name: 'Next.js', level: 90 },
                        { name: 'TypeScript', level: 88 },
                        { name: 'TailwindCSS', level: 92 },
                        { name: 'Framer Motion', level: 80 }
                    ],
                },
                {
                    category: 'Backend',
                    items: [
                        { name: 'Node.js', level: 85 },
                        { name: 'NestJS', level: 80 },
                        { name: 'Express', level: 88 },
                        { name: 'MongoDB', level: 85 },
                        { name: 'PostgreSQL', level: 82 }
                    ],
                },
                {
                    category: 'Tools & Others',
                    items: [
                        { name: 'Git', level: 90 },
                        { name: 'Docker', level: 75 },
                        { name: 'AWS', level: 70 },
                        { name: 'Vercel', level: 85 },
                        { name: 'Figma', level: 80 }
                    ],
                },
            ];
            for (const skill of skillCategories) {
                await skillsService.create(skill);
            }
            console.log('Skills created');
        }
        console.log('Checking services...');
        const existingServices = await servicesService.findAll();
        if (existingServices.length > 0) {
            console.log('Services already exist, skipping...');
        }
        else {
            const servicesData = [
                {
                    title: 'Full-Stack Web Development',
                    description: 'End-to-end web application development using modern technologies like React, Next.js, Node.js, and databases.',
                    features: ['Responsive Design', 'API Development', 'Database Integration', 'Authentication & Security'],
                    icon: 'Code',
                    color: '#3b82f6',
                    gradient: 'from-blue-500 to-cyan-500',
                    order: 1
                },
                {
                    title: 'Mobile App Development',
                    description: 'Cross-platform mobile applications using React Native and Flutter for iOS and Android platforms.',
                    features: ['Cross-Platform', 'Native Performance', 'App Store Deployment', 'Push Notifications'],
                    icon: 'Smartphone',
                    color: '#10b981',
                    gradient: 'from-green-500 to-emerald-500',
                    order: 2
                },
                {
                    title: 'Cloud Solutions & DevOps',
                    description: 'Scalable cloud infrastructure setup, deployment automation, and continuous integration/deployment.',
                    features: ['AWS/Azure Setup', 'Docker Containers', 'CI/CD Pipelines', 'Monitoring & Logging'],
                    icon: 'Cloud',
                    color: '#f59e0b',
                    gradient: 'from-yellow-500 to-orange-500',
                    order: 3
                },
                {
                    title: 'Database Design & Optimization',
                    description: 'Efficient database architecture, optimization, and management for both SQL and NoSQL databases.',
                    features: ['Schema Design', 'Query Optimization', 'Data Migration', 'Backup Strategies'],
                    icon: 'Database',
                    color: '#8b5cf6',
                    gradient: 'from-purple-500 to-pink-500',
                    order: 4
                },
                {
                    title: 'UI/UX Design & Prototyping',
                    description: 'User-centered design approach with wireframing, prototyping, and modern interface development.',
                    features: ['Wireframing', 'Interactive Prototypes', 'Design Systems', 'User Testing'],
                    icon: 'Palette',
                    color: '#ef4444',
                    gradient: 'from-red-500 to-rose-500',
                    order: 5
                },
                {
                    title: 'Performance Optimization',
                    description: 'Website and application performance tuning, SEO optimization, and speed enhancement.',
                    features: ['Speed Optimization', 'SEO Implementation', 'Code Splitting', 'Caching Strategies'],
                    icon: 'Zap',
                    color: '#06b6d4',
                    gradient: 'from-cyan-500 to-blue-500',
                    order: 6
                }
            ];
            for (const service of servicesData) {
                await servicesService.create(service);
            }
            console.log('Services created');
        }
        console.log('Checking projects...');
        const existingProjects = await projectsService.findAll();
        if (existingProjects.length > 0) {
            console.log('Projects already exist, skipping...');
        }
        else {
            const projects = [
                {
                    title: 'E-Commerce Platform',
                    description: 'A full-stack e-commerce platform with user authentication, product management, and payment integration.',
                    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
                    githubLink: 'https://github.com/amankumar/ecommerce',
                    liveLink: 'https://ecommerce-demo.vercel.app',
                    imageUrl: '/images/project-1.svg',
                },
                {
                    title: 'Task Management App',
                    description: 'A collaborative task management application with real-time updates and team collaboration features.',
                    techStack: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
                    githubLink: 'https://github.com/amankumar/taskmanager',
                    liveLink: 'https://taskmanager-demo.vercel.app',
                    imageUrl: '/images/project-2.svg',
                },
                {
                    title: 'Weather Dashboard',
                    description: 'A responsive weather dashboard with location-based forecasts and interactive charts.',
                    techStack: ['Vue.js', 'Chart.js', 'OpenWeather API'],
                    githubLink: 'https://github.com/amankumar/weather-dashboard',
                    liveLink: 'https://weather-dashboard-demo.vercel.app',
                    imageUrl: '/images/project-3.svg',
                },
            ];
            for (const project of projects) {
                await projectsService.create(project);
            }
            console.log('Projects created');
        }
        console.log('Seed completed successfully!');
    }
    catch (error) {
        console.error('Seed failed:', error);
    }
    finally {
        await app.close();
    }
}
seed();
//# sourceMappingURL=seed.js.map