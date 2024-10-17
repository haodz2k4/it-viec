import { Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { SortOrder } from "src/utils/types/sort.type";

export class FilterCompanyDto {
    @IsString()
    @IsOptional()
    keyword?: string;


}
export class QueryCompanyDto extends FilterCompanyDto {

    @IsString()
    @IsOptional()
    keyword?: string;

    @IsString()
    @IsOptional()
    searchBy?: string;

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