import { IsString, IsArray, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsArray()
    @IsString({ each: true })
    techStack: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    liveLinks?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    imageUrls?: string[];

    @IsOptional()
    @IsNumber()
    order?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    techStack?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    liveLinks?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    imageUrls?: string[];

    @IsOptional()
    @IsNumber()
    order?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}

export class ReorderProjectsDto {
    @IsArray()
    @IsString({ each: true })
    projectIds: string[];
}