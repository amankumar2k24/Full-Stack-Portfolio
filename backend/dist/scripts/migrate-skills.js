"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const skillDefaults = {
    'React.js': 95,
    'React': 95,
    'Next.js': 90,
    'Vue.js': 85,
    'Angular': 80,
    'Svelte': 75,
    'TypeScript': 88,
    'JavaScript': 92,
    'Tailwind CSS': 92,
    'Bootstrap': 88,
    'Bootstrap 5': 88,
    'Material-UI': 85,
    'MUI': 85,
    'Chakra UI': 80,
    'Styled Components': 85,
    'Emotion': 80,
    'Sass': 85,
    'SCSS': 85,
    'Less': 75,
    'CSS3': 95,
    'HTML5': 98,
    'Framer Motion': 80,
    'GSAP': 75,
    'Lottie': 70,
    'Redux': 85,
    'Redux Toolkit': 88,
    'Zustand': 80,
    'MobX': 75,
    'Recoil': 70,
    'React Query': 85,
    'SWR': 80,
    'Apollo Client': 75,
    'RTK Query': 80,
    'Node.js': 85,
    'Express.js': 88,
    'NestJS': 80,
    'Fastify': 75,
    'Koa.js': 70,
    'Python': 82,
    'Django': 75,
    'FastAPI': 78,
    'Flask': 80,
    'PHP': 75,
    'Laravel': 70,
    'Java': 70,
    'Spring Boot': 68,
    'C#': 75,
    '.NET': 75,
    'Go': 70,
    'Rust': 65,
    'MongoDB': 85,
    'PostgreSQL': 82,
    'MySQL': 88,
    'SQLite': 80,
    'Redis': 75,
    'Firebase': 78,
    'Supabase': 75,
    'PlanetScale': 70,
    'Prisma': 80,
    'Mongoose': 85,
    'Sequelize': 75,
    'AWS': 70,
    'Google Cloud': 65,
    'Azure': 60,
    'Vercel': 85,
    'Netlify': 80,
    'Heroku': 75,
    'Docker': 75,
    'Kubernetes': 65,
    'Jenkins': 60,
    'GitHub Actions': 80,
    'GitLab CI': 70,
    'Git': 90,
    'GitHub': 90,
    'GitLab': 80,
    'Figma': 80,
    'Adobe XD': 70,
    'Sketch': 65,
    'Webpack': 75,
    'Vite': 80,
    'Rollup': 70,
    'Parcel': 75,
    'ESLint': 85,
    'Prettier': 90,
    'Jest': 80,
    'Cypress': 75,
    'Playwright': 70,
    'Storybook': 75,
    'React Native': 80,
    'Flutter': 70,
    'Expo': 75,
    'Ionic': 65,
    'GraphQL': 72,
    'REST API': 90,
    'WebSocket': 75,
    'gRPC': 65,
    'Socket.io': 80,
    'Postman': 85,
    'Insomnia': 80,
    'Strapi': 70,
    'Contentful': 65,
    'Sanity': 70,
    'Ghost': 60,
    'Stripe': 75,
    'PayPal': 70,
    'Razorpay': 75,
    'Google Analytics': 80,
    'Mixpanel': 70,
    'Sentry': 75,
    'LogRocket': 70,
    'Auth0': 75,
    'Firebase Auth': 80,
    'NextAuth.js': 85,
    'Passport.js': 75,
    'Ethereum': 60,
    'Solidity': 55,
    'Web3.js': 60,
    'MetaMask': 65,
    'Microservices Architecture': 75,
    'Elastic Search': 75,
    'OpenAI API': 75,
    'Gemini API': 75,
    'Elasticsearch': 75,
    'OpenAI': 75,
    'Gemini': 75,
    'BullMQ': 75,
    'Bull MQ': 75,
    'Performance Tuning': 75,
    'Real-time Notifications': 75,
    'WordPress': 75,
    'SEO Optimization': 75,
    'Email APIs': 75,
    'SMS APIs': 75,
    'ICICI Payment Gateway': 75,
    'Webhooks': 75,
    'OTP': 75,
};
async function migrateSkills() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const skillModel = app.get('SkillModel');
    try {
        console.log('Starting skills migration...');
        const existingSkills = await skillModel.find().exec();
        console.log(`Found ${existingSkills.length} skill categories to migrate`);
        for (const skillCategory of existingSkills) {
            const updatedItems = skillCategory.items.map((item) => {
                if (typeof item === 'string') {
                    return {
                        name: item,
                        level: skillDefaults[item] || 75
                    };
                }
                else {
                    return item;
                }
            });
            await skillModel.findByIdAndUpdate(skillCategory._id, { items: updatedItems }, { new: true });
            console.log(`Migrated category: ${skillCategory.category} with ${updatedItems.length} skills`);
        }
        console.log('Skills migration completed successfully!');
    }
    catch (error) {
        console.error('Migration failed:', error);
    }
    finally {
        await app.close();
    }
}
migrateSkills();
//# sourceMappingURL=migrate-skills.js.map