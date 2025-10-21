import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Experience extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    company: string;

    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    duration: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [String], required: true })
    achievements: string[];

    @Prop({ type: [String], required: true })
    technologies: string[];

    @Prop({ required: true })
    icon: string;

    @Prop({ required: true })
    color: string;

    @Prop({ default: 0 })
    order: number;

    @Prop({ default: true })
    isActive: boolean;
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);