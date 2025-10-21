import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AboutDocument = About & Document;

@Schema({ timestamps: true })
export class About {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    bio: string;

    @Prop({ required: true })
    location: string;

    @Prop()
    resumeLink: string;

    @Prop({ type: Object })
    socials: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
}

export const AboutSchema = SchemaFactory.createForClass(About);