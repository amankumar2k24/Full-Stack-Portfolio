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
    @IsString()
    githubLink?: string;

    @IsOptional()
    @IsString()
    liveLink?: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;
}

export class UpdateProjectDto extends CreateProjectDto { }