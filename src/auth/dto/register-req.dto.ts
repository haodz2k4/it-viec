import { OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from "src/users/dto/create-user.dto";


export class RegisterReqDto extends OmitType(CreateUserDto,['role'] as const) {}

