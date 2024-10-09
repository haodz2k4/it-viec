import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    fullName: string;


    @ApiProperty({required: false})
    @IsString()
    @IsUrl()
    @IsOptional()
    avatar: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    @ApiProperty()
    password: string;

    @IsDate()
    @IsOptional()
    @Transform(({value}) => new Date(value))
    @ApiProperty({required: false})
    birthDate: Date;


    @IsString()
    @IsNotEmpty()
    @IsIn(["user","admin"])
    @ApiProperty({ enum: ['admin', 'user'], example: 'user' })
    @ApiProperty()
    role: string;
    
    @IsString()
    @IsOptional()
    @IsIn(["active","inactive"])
    @ApiProperty({ enum: ['active', 'inactive'], example: 'active' })
    status: string;
}
