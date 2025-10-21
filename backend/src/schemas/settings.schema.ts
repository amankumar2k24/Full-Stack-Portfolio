import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Settings extends Document {
    @Prop({ required: true, unique: true })
    key: string;

    @Prop({ required: true })
    value: string;

    @Prop()
    description?: string;

    @Prop({ default: 'text' })
    type: string; // text, textarea, json, boolean, number
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);