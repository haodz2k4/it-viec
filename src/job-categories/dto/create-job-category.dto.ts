import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateJobCategoryDto {
    @IsString()
    @IsNotEmpty()
    categoryName: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    thumbnail: string;

    @IsString()
    @IsOptional()
    parentCaegory: string;
}
