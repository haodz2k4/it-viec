import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { SortOrder } from "src/utils/types/sort.type";

export class QueryCompanyDto {

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    page: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    limit: number;

    @IsOptional()
    @IsString()
    sortBy: string;

    @IsOptional()
    @IsEnum(SortOrder)
    order: SortOrder;

    @IsString()
    @IsOptional()
    selectField: string;

}