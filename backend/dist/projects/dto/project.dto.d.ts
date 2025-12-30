export declare class CreateProjectDto {
    title: string;
    description: string;
    techStack: string[];
    liveLinks?: string[];
    imageUrls?: string[];
    order?: number;
    isActive?: boolean;
}
export declare class UpdateProjectDto {
    title?: string;
    description?: string;
    techStack?: string[];
    liveLinks?: string[];
    imageUrls?: string[];
    order?: number;
    isActive?: boolean;
}
export declare class ReorderProjectsDto {
    projectIds: string[];
}
