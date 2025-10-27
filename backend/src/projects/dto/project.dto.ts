import { IsString, IsArray, IsOptional } from 'class-validator';

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
}

export class UpdateProjectDto extends CreateProjectDto { }