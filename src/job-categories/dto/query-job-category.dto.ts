import { Type } from "class-transformer";
import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { SortOrder } from "../../utils/types/sort.type";
import { IsObjectId } from "src/common/validator/IsObjectId.validator";


export class FilterJobCategory {

    @IsString()
    @IsOptional()
    @IsObjectId()
    parentCategory?: string;

    @IsString()
    @IsIn(["active","inactive"])
    @IsOptional()
    status?: string;
}

export class QueryJobCategory extends FilterJobCategory {

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    page?: number;

    @Type(() => Number)
    @IsNumber()
    @IsOptional()
    limit?: number;

    @IsString()
    @IsOptional()
    sortBy: string;

    @IsOptional()
    @IsEnum(SortOrder)
    order: string;

    @IsOptional()
    @IsString()
    selectFields: string;
}