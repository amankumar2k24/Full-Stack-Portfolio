import { Document } from 'mongoose';
export declare class Experience extends Document {
    title: string;
    company: string;
    location: string;
    duration: string;
    description: string;
    achievements: string[];
    technologies: string[];
    icon: string;
    color: string;
    order: number;
    isActive: boolean;
}
export declare const ExperienceSchema: import("mongoose").Schema<Experience, import("mongoose").Model<Experience, any, any, any, Document<unknown, any, Experience> & Experience & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Experience, Document<unknown, {}, import("mongoose").FlatRecord<Experience>> & import("mongoose").FlatRecord<Experience> & {
    _id: import("mongoose").Types.ObjectId;
}>;
