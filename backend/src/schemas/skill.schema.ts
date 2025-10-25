import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SkillDocument = Skill & Document;

// Individual skill item with level
@Schema()
export class SkillItem {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, min: 0, max: 100 })
    level: number;
}

@Schema({ timestamps: true })
export class Skill {
    @Prop({ required: true })
    category: string;

    @Prop({ type: [SkillItem], required: true })
    items: SkillItem[];
}

export const SkillSchema = SchemaFactory.createForClass(Skill);