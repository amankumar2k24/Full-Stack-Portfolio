import { Document } from 'mongoose';
export type AboutDocument = About & Document;
export declare class About {
    name: string;
    title: string;
    bio: string;
    location: string;
    resumeLink: string;
    socials: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
}
export declare const AboutSchema: import("mongoose").Schema<About, import("mongoose").Model<About, any, any, any, Document<unknown, any, About> & About & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, About, Document<unknown, {}, import("mongoose").FlatRecord<About>> & import("mongoose").FlatRecord<About> & {
    _id: import("mongoose").Types.ObjectId;
}>;
