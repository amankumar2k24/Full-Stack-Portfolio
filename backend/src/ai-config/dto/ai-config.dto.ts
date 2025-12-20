import { IsString, IsNumber, IsBoolean, IsOptional, Min, Max } from 'class-validator';

export class CreateAiConfigDto {
    @IsString()
    provider: string;

    @IsString()
    apiKey: string;

    @IsOptional()
    @IsString()
    modelName?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(2)
    temperature?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(4000)
    maxTokens?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsString()
    description?: string;
}

export class UpdateAiConfigDto {
    @IsOptional()
    @IsString()
    provider?: string;

    @IsOptional()
    @IsString()
    apiKey?: string;

    @IsOptional()
    @IsString()
    modelName?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(2)
    temperature?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(4000)
    maxTokens?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsString()
    description?: string;
}