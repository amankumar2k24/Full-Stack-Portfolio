export declare class CreateProjectDto {
    title: string;
    description: string;
    techStack: string[];
    githubLink?: string;
    liveLink?: string;
    imageUrl?: string;
}
export declare class UpdateProjectDto extends CreateProjectDto {
}
