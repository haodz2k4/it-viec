import { OmitType } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/dto/create-user.dto";


export class RegisterReqDto extends OmitType(CreateUserDto,['role'] as const) {}

