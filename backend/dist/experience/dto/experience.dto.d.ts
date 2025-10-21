export declare class CreateExperienceDto {
    title: string;
    company: string;
    location: string;
    duration: string;
    description: string;
    achievements: string[];
    technologies: string[];
    icon: string;
    color: string;
    order?: number;
    isActive?: boolean;
}
export declare class UpdateExperienceDto {
    title?: string;
    company?: string;
    location?: string;
    duration?: string;
    description?: string;
    achievements?: string[];
    technologies?: string[];
    icon?: string;
    color?: string;
    order?: number;
    isActive?: boolean;
}
