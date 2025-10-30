export declare class CreateProjectDto {
    title: string;
    description: string;
    techStack: string[];
    liveLinks?: string[];
    imageUrls?: string[];
    order?: number;
}
export declare class UpdateProjectDto extends CreateProjectDto {
}
export declare class ReorderProjectsDto {
    projectIds: string[];
}
