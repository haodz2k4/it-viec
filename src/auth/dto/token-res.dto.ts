import { Exclude, Expose } from "class-transformer";

@Exclude()
export class TokenResDto {
    @Expose()
    access_token: string;

    @Expose()
    refresh_token: string;

    @Expose()
    tokenExpires: string | number;
}