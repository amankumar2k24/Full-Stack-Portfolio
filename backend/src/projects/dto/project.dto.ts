import { IsString, IsArray, IsOptional, IsNumber } from 'class-validator';

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
}

export class UpdateProjectDto extends CreateProjectDto { }

export class ReorderProjectsDto {
    @IsArray()
    @IsString({ each: true })
    projectIds: string[];
}