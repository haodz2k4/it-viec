import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class TokenResDto {
    @Expose()
    @ApiProperty()
    access_token: string;

    @Expose()
    @ApiProperty()
    refresh_token: string;

    @Expose()
    @ApiProperty()
    tokenExpires: string | number;
}