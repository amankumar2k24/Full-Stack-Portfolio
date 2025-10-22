"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const bcrypt = require("bcrypt");
async function updateAdmin() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        const userModel = app.get('UserModel');
        const hashedPassword = await bcrypt.hash('Aman@123', 10);
        const result = await userModel.updateOne({ email: 'admin@example.com' }, {
            $set: {
                email: 'aman.kumar2k15@gmail.com',
                password: hashedPassword,
                updatedAt: new Date()
            }
        });
        if (result.matchedCount > 0) {
            console.log('✅ Admin user updated successfully!');
            console.log('New credentials:');
            console.log('Email: aman.kumar2k15@gmail.com');
            console.log('Password: Aman@123');
        }
        else {
            console.log('❌ No user found with email: admin@example.com');
            console.log('Creating new admin user...');
            const newUser = new userModel({
                email: 'aman.kumar2k15@gmail.com',
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            await newUser.save();
            console.log('✅ New admin user created successfully!');
        }
        const user = await userModel.findOne({ email: 'aman.kumar2k15@gmail.com' });
        if (user) {
            console.log('✅ Verification: User exists in database');
            console.log('User ID:', user._id);
            console.log('Email:', user.email);
        }
    }
    catch (error) {
        console.error('❌ Error updating admin user:', error);
    }
    finally {
        await app.close();
    }
}
updateAdmin();
//# sourceMappingURL=update-admin.js.map