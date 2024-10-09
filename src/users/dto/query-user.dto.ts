import { PickType } from "@nestjs/mapped-types";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { SortOrder } from "src/utils/types/sort.type";
import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/swagger";
export class FilterUserDto extends PickType(PartialType(CreateUserDto),["role","status"] as const) {
    @IsString()
    @IsOptional()
    keyword?: string;

    @IsString()
    @IsOptional()
    searchBy?: string;
}
export class QueryUserDto extends FilterUserDto {

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    page?: number;
    
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit?: number
    //sort 
    @IsOptional()
    @IsString()
    sortBy?: string;

    @IsOptional()
    @IsEnum(SortOrder)
    @Transform(({ value }) => value.toLowerCase())
    order?: SortOrder;

    //select fields 
    @IsOptional()
    selectFields: string;
}