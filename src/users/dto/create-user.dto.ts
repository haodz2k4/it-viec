import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string;

    @IsDate()
    @IsOptional()
    @Transform(({value}) => new Date(value))
    birthDate: Date;


    @IsString()
    @IsNotEmpty()
    @IsIn(["user","admin"])
    role: string;
    
    @IsString()
    @IsOptional()
    @IsIn(["active","inactive"])
    status: string;
}
