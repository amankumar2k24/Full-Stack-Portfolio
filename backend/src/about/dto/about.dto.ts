import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateAboutDto {
    @IsString()
    name: string;

    @IsString()
    title: string;

    @IsString()
    bio: string;

    @IsString()
    location: string;

    @IsOptional()
    @IsString()
    resumeLink?: string;

    @IsOptional()
    @IsObject()
    socials?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
}

export class UpdateAboutDto extends CreateAboutDto { }