export declare class CreateProjectDto {
    title: string;
    description: string;
    techStack: string[];
    liveLinks?: string[];
    imageUrls?: string[];
}
export declare class UpdateProjectDto extends CreateProjectDto {
}
