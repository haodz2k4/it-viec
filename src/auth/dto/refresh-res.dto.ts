import { Expose } from "class-transformer";
import { TokenResDto } from "./token-res.dto";

@Expose()
export class RefreshResDto extends TokenResDto {

}