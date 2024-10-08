import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";
import { TokenResDto } from "./token-res.dto";
@Exclude()
export class LoginResDto extends TokenResDto{

    @Expose()
    @IsString()
    _id: string;

}