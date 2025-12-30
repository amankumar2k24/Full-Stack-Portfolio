import { Document } from 'mongoose';
export type ProjectDocument = Project & Document;
export declare class Project {
    title: string;
    description: string;
    techStack: string[];
    liveLinks: string[];
    imageUrls: string[];
    order: number;
    isActive: boolean;
}
export declare const ProjectSchema: import("mongoose").Schema<Project, import("mongoose").Model<Project, any, any, any, Document<unknown, any, Project> & Project & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Project, Document<unknown, {}, import("mongoose").FlatRecord<Project>> & import("mongoose").FlatRecord<Project> & {
    _id: import("mongoose").Types.ObjectId;
}>;
