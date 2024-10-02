import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type userDocument = HydratedDocument<User>;
@Schema({timestamps: true})
export class User {

    @Prop({required: true, minlength: 2, maxlength: 150})
    fullName: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop()
    birthDate: Date

    @Prop({default: "active"})
    status: string;

    @Prop({default: false})
    deleted: boolean;
}

export const userSchema = SchemaFactory.createForClass(User);
