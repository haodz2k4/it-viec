import { PickType } from "@nestjs/mapped-types";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { SortOrder } from "src/utils/types/sort.type";
import { CreateUserDto } from "./create-user.dto";
export class FilterUserDto extends PickType(CreateUserDto,["role","status"] as const) {
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
}