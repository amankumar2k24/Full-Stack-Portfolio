import { Document } from 'mongoose';
export declare class Service extends Document {
    title: string;
    description: string;
    features: string[];
    icon: string;
    color: string;
    gradient: string;
    order: number;
    isActive: boolean;
}
export declare const ServiceSchema: import("mongoose").Schema<Service, import("mongoose").Model<Service, any, any, any, Document<unknown, any, Service> & Service & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Service, Document<unknown, {}, import("mongoose").FlatRecord<Service>> & import("mongoose").FlatRecord<Service> & {
    _id: import("mongoose").Types.ObjectId;
}>;
