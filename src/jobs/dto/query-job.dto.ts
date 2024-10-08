import { PartialType, PickType } from "@nestjs/mapped-types";
import { CreateJobDto } from "./create-job.dto";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { SortOrder } from "src/utils/types/sort.type";

export class FilterJobDto extends PickType(PartialType(CreateJobDto),["jobType","experienceLevel"] as const){
    @IsString()
    @IsOptional()
    keyword?: string;

    @IsString()
    @IsOptional()
    searchBy?: string;
}

export class QueryJobDto extends FilterJobDto {

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

    @IsString()
    @IsOptional()
    selectFields: string;
}