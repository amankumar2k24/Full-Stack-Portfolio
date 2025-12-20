export declare class CreateAiConfigDto {
    provider: string;
    apiKey: string;
    modelName?: string;
    temperature?: number;
    maxTokens?: number;
    isActive?: boolean;
    description?: string;
}
export declare class UpdateAiConfigDto {
    provider?: string;
    apiKey?: string;
    modelName?: string;
    temperature?: number;
    maxTokens?: number;
    isActive?: boolean;
    description?: string;
}
