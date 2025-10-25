export declare class SkillItemDto {
    name: string;
    level: number;
}
export declare class CreateSkillDto {
    category: string;
    items: SkillItemDto[];
}
export declare class UpdateSkillDto extends CreateSkillDto {
}
