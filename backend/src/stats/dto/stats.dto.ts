import { IsString, IsOptional, IsNumber, IsBoolean, IsNotEmpty, MinLength, MaxLength, IsHexColor, Min } from 'class-validator';

export class CreateStatsDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    key: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(100)
    label: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    value: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    icon: string;

    @IsOptional()
    @IsString()
    @IsHexColor()
    color?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    order?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;
}

export class UpdateStatsDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    key?: string;

    @IsOptional()
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    label?: string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    @MaxLength(20)
    value?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    icon?: string;

    @IsOptional()
    @IsString()
    @IsHexColor()
    color?: string;

    @IsOptional()
    @IsNumber()
    @Min(0)
    order?: number;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;
}