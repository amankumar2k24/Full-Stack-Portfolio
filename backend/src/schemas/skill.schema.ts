import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SkillDocument = Skill & Document;

@Schema({ timestamps: true })
export class Skill {
    @Prop({ required: true })
    category: string;

    @Prop({ type: [String], required: true })
    items: string[];
}

export const SkillSchema = SchemaFactory.createForClass(Skill);