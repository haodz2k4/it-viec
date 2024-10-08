import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";
import { TokenResDto } from "./token-res.dto";
import { ApiProperty } from "@nestjs/swagger";
@Exclude()
export class LoginResDto extends TokenResDto{

    @Expose()
    @IsString()
    @ApiProperty()
    _id: string;

}