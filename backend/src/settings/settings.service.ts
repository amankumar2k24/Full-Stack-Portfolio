import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings } from '../schemas/settings.schema';

@Injectable()
export class SettingsService {
    constructor(
        @InjectModel(Settings.name) private settingsModel: Model<Settings>
    ) { }

    async findAll(): Promise<Settings[]> {
        return this.settingsModel.find().exec();
    }

    async findByKey(key: string): Promise<Settings> {
        return this.settingsModel.findOne({ key }).exec();
    }

    async updateByKey(key: string, value: string): Promise<Settings> {
        return this.settingsModel.findOneAndUpdate(
            { key },
            { value },
            { new: true, upsert: true }
        ).exec();
    }

    async create(key: string, value: string, description?: string, type?: string): Promise<Settings> {
        const setting = new this.settingsModel({ key, value, description, type });
        return setting.save();
    }

    async getSettings(): Promise<Record<string, string>> {
        const settings = await this.findAll();
        return settings.reduce((acc, setting) => {
            acc[setting.key] = setting.value;
            return acc;
        }, {});
    }
}