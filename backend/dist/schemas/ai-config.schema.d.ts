import { Document } from 'mongoose';
export declare class AiConfig extends Document {
    provider: string;
    apiKey: string;
    modelName: string;
    temperature: number;
    maxTokens: number;
    isActive: boolean;
    lastUsed: number;
    usageCount: number;
    description: string;
}
export declare const AiConfigSchema: import("mongoose").Schema<AiConfig, import("mongoose").Model<AiConfig, any, any, any, Document<unknown, any, AiConfig> & AiConfig & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AiConfig, Document<unknown, {}, import("mongoose").FlatRecord<AiConfig>> & import("mongoose").FlatRecord<AiConfig> & {
    _id: import("mongoose").Types.ObjectId;
}>;
