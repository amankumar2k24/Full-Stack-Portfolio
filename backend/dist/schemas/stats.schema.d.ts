import { Document } from 'mongoose';
export declare class Stats extends Document {
    key: string;
    label: string;
    value: string;
    icon: string;
    color: string;
    order: number;
    isActive: boolean;
    description?: string;
}
export declare const StatsSchema: import("mongoose").Schema<Stats, import("mongoose").Model<Stats, any, any, any, Document<unknown, any, Stats> & Stats & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Stats, Document<unknown, {}, import("mongoose").FlatRecord<Stats>> & import("mongoose").FlatRecord<Stats> & {
    _id: import("mongoose").Types.ObjectId;
}>;
