import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";
import {hash} from "bcrypt"
import { ConfigService } from "@nestjs/config";
export type userDocument = HydratedDocument<User>;
@Schema({timestamps: true})
export class User {

    @ApiProperty()
    @Prop({required: true, minlength: 2, maxlength: 150})
    fullName: string;

    @ApiProperty()
    @Prop({required: true, unique: true})
    email: string;

    @ApiProperty()
    @Prop({required: true, select: false})
    password: string;

    @ApiProperty()
    @Prop()
    birthDate: Date

    @ApiProperty()
    @Prop({default: "active", enum: ["active","inactive"]})
    status: string;

    @ApiProperty()
    @Prop({enum: ["user","admin"]})
    role: string;

    @ApiProperty()
    @Prop({default: false})
    deleted: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);

userSchema.pre('save', async function(next) {
    if(this.isModified('password')){
        const configService = new ConfigService()
        this.password = await hash(this.password,parseInt(configService.get<string>('BCRYPT_SALT_ROUNDS'))) 
    }
    next()
})
