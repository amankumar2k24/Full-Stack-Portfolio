export declare class CreateAboutDto {
    name: string;
    title: string;
    bio: string;
    location: string;
    resumeLink?: string;
    socials?: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        email?: string;
    };
}
export declare class UpdateAboutDto extends CreateAboutDto {
}
