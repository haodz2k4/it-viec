import { Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateNested } from "class-validator";

class AddressCompanyDto {

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    country: string;
}
export class CreateCompanyDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsUrl()
    @IsOptional()
    logo: string;

    @IsDefined()
    @ValidateNested()
    @Type(() => AddressCompanyDto)
    address: AddressCompanyDto
}
