import { Document } from 'mongoose';
export type SkillDocument = Skill & Document;
export declare class SkillItem {
    name: string;
    level: number;
}
export declare class Skill {
    category: string;
    items: SkillItem[];
}
export declare const SkillSchema: import("mongoose").Schema<Skill, import("mongoose").Model<Skill, any, any, any, Document<unknown, any, Skill> & Skill & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Skill, Document<unknown, {}, import("mongoose").FlatRecord<Skill>> & import("mongoose").FlatRecord<Skill> & {
    _id: import("mongoose").Types.ObjectId;
}>;
