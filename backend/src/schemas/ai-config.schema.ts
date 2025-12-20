import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AiConfig extends Document {
    @Prop({ required: true })
    provider: string; // 'gemini', 'openai', etc.

    @Prop({ required: true })
    apiKey: string;

    @Prop({ default: 'gemini-2.5-flash' })
    modelName: string;

    @Prop({ default: 0.7 })
    temperature: number;

    @Prop({ default: 1000 })
    maxTokens: number;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: 0 })
    lastUsed: number; // Timestamp for round-robin tracking

    @Prop({ default: 0 })
    usageCount: number; // Track usage for analytics

    @Prop()
    description: string;
}

export const AiConfigSchema = SchemaFactory.createForClass(AiConfig);