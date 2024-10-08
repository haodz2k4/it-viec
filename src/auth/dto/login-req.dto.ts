import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginReqDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({example: "982A32@gmail.com", description: "Email user"})
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: "abc@1CC2@12", description: "Password "})
    password: string;
}