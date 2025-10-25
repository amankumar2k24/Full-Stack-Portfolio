import { IsString, IsArray, IsNumber, Min, Max, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class SkillItemDto {
    @IsString()
    name: string;

    @IsNumber()
    @Min(0)
    @Max(100)
    level: number;
}

export class CreateSkillDto {
    @IsString()
    category: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SkillItemDto)
    items: SkillItemDto[];
}

export class UpdateSkillDto extends CreateSkillDto { }