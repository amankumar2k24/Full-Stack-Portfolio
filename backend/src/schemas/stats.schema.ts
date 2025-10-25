import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Stats extends Document {
    @Prop({ required: true, unique: true })
    key: string;

    @Prop({ required: true })
    label: string;

    @Prop({ required: true })
    value: string;

    @Prop({ required: true })
    icon: string;

    @Prop({ default: '#3b82f6' })
    color: string;

    @Prop({ default: 0 })
    order: number;

    @Prop({ default: true })
    isActive: boolean;

    @Prop()
    description?: string;
}

export const StatsSchema = SchemaFactory.createForClass(Stats);