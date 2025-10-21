import { Document } from 'mongoose';
export declare class Settings extends Document {
    key: string;
    value: string;
    description?: string;
    type: string;
}
export declare const SettingsSchema: import("mongoose").Schema<Settings, import("mongoose").Model<Settings, any, any, any, Document<unknown, any, Settings> & Settings & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Settings, Document<unknown, {}, import("mongoose").FlatRecord<Settings>> & import("mongoose").FlatRecord<Settings> & {
    _id: import("mongoose").Types.ObjectId;
}>;
