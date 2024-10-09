import { PickType } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { SortOrder } from "src/utils/types/sort.type";
import { CreateUserDto } from "./create-user.dto";
import { ApiProperty, PartialType } from "@nestjs/swagger";
export class FilterUserDto extends PickType(PartialType(CreateUserDto),["role","status"] as const) {
    @IsString()
    @ApiProperty({required: false})
    @IsOptional()
    keyword?: string;

    @IsString()
    @ApiProperty({required: false})
    @IsOptional()
    searchBy?: string;
}
export class QueryUserDto extends FilterUserDto {
    @ApiProperty({required: false})
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    page?: number;
    
    @ApiProperty({required: false})
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit?: number
    //sort 
    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    sortBy?: string;

    @IsOptional()
    @ApiProperty({required: false})
    @IsEnum(SortOrder)
    @Transform(({ value }) => value.toLowerCase())
    order?: SortOrder;

    //select fields 
    @IsOptional()
    @IsString()
    @ApiProperty({required: false})
    selectFields: string;
}