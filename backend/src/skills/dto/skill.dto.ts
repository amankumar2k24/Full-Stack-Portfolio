import { IsString, IsArray } from 'class-validator';

export class CreateSkillDto {
    @IsString()
    category: string;

    @IsArray()
    @IsString({ each: true })
    items: string[];
}

export class UpdateSkillDto extends CreateSkillDto { }