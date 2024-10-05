import { Transform, Type } from "class-transformer";
import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
import { SortOrder } from "src/utils/types/sort.type";
export class FilterUserDto {
     //Filter 
     @IsString()
     @IsOptional()
     @IsIn(["active","inactive"])
     status?: string;
 
     @IsString()
     @IsOptional()
     @IsIn(["user","role"])
     role?: string;
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