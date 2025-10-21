import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findAll(): Promise<import("../schemas/settings.schema").Settings[]>;
    findByKey(key: string): Promise<import("../schemas/settings.schema").Settings>;
    updateByKey(key: string, body: {
        value: string;
    }): Promise<import("../schemas/settings.schema").Settings>;
    create(body: {
        key: string;
        value: string;
        description?: string;
        type?: string;
    }): Promise<import("../schemas/settings.schema").Settings>;
}
