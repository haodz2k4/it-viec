import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginReqDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}