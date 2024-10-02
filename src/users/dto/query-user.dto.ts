import { Transform, Type } from "class-transformer";
import { IsIn, IsInt, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import { User } from "../schema/user.schema";


export class FilterUserDto {
    @IsString()
    @IsIn(["inactive","inactive"])
    status: string;

    @IsString()
    @IsIn(["user","role"])
    role: string;

    @Transform(({value}) => parseInt(value))
    @IsInt()
    @IsNumber()
    @Min(0)
    minAge: number;
    
    @Transform(({value}) => parseInt(value))
    @IsInt()
    @IsNumber()
    @Max(100)
    maxAge: number;
}

export class SortUserDto {
    @IsString()
    orderBy: keyof User;

    @IsString()
    @IsIn(["asc","desc"])
    order: string;
}
export class QueryUserDto {
    
    @IsNumber()
    @IsOptional()
    @IsInt()
    @Min(1)
    page: number;

    @IsNumber()
    @IsOptional()
    @IsInt()
    @Max(100)
    limit: number;
    
    @ValidateNested()
    @IsOptional()
    @Type(() => FilterUserDto)
    filter: FilterUserDto

    @ValidateNested()
    @IsOptional()
    @Type(() => SortUserDto)
    sort: SortUserDto
}