import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { SortOrder } from "src/utils/types/sort.type";

export class QueryCompanyDto {

    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    page?: number;

    @Type(() => Number)
    @IsOptional()
    @IsNumber()
    limit?: number;

    @IsOptional()
    @IsString()
    sortBy?: string;

    @IsOptional()
    @IsEnum(SortOrder)
    order?: SortOrder;

    @IsString()
    @IsOptional()
    selectField?: string;

}