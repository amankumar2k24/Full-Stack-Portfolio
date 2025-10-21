export declare class CreateServiceDto {
    title: string;
    description: string;
    features: string[];
    icon: string;
    color: string;
    gradient: string;
    order?: number;
    isActive?: boolean;
}
export declare class UpdateServiceDto {
    title?: string;
    description?: string;
    features?: string[];
    icon?: string;
    color?: string;
    gradient?: string;
    order?: number;
    isActive?: boolean;
}
