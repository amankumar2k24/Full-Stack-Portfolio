import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Service extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [String], required: true })
    features: string[];

    @Prop({ required: true })
    icon: string;

    @Prop({ required: true })
    color: string;

    @Prop({ required: true })
    gradient: string;

    @Prop({ default: 0 })
    order: number;

    @Prop({ default: true })
    isActive: boolean;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);