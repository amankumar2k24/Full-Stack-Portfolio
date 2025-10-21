import { Model } from 'mongoose';
import { Settings } from '../schemas/settings.schema';
export declare class SettingsService {
    private settingsModel;
    constructor(settingsModel: Model<Settings>);
    findAll(): Promise<Settings[]>;
    findByKey(key: string): Promise<Settings>;
    updateByKey(key: string, value: string): Promise<Settings>;
    create(key: string, value: string, description?: string, type?: string): Promise<Settings>;
    getSettings(): Promise<Record<string, string>>;
}
