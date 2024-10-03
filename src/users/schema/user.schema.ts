import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { HydratedDocument } from "mongoose";

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
    @Prop({required: true})
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
