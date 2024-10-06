import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class TokenResDto {
    @Expose()
    @IsString()
    access_token: string;

    @Expose()
    @IsString()
    refresh_token: string;
}
export class LoginResDto extends TokenResDto{

    @Expose()
    @IsString()
    _id: string;

    @Expose()
    @IsNumber()
    tokenExpires: string | number;

}