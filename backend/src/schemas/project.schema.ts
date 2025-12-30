import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema({ timestamps: true })
export class Project {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [String], required: true })
    techStack: string[];

    @Prop({ type: [String], default: [] })
    liveLinks: string[];

    @Prop({ type: [String], default: [] })
    imageUrls: string[];

    @Prop({ type: Number, default: 0 })
    order: number;

    @Prop({ type: Boolean, default: true })
    isActive: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);