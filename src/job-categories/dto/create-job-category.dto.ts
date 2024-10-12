import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsObjectId } from "src/common/validator/IsObjectId.validator";

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
    @IsObjectId()
    parentCategory: string;
}
