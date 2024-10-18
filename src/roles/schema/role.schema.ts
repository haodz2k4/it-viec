import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type roleDocument = HydratedDocument<Role>;
@Schema({
    timestamps: true
})
export class Role {
    
    @Prop({required: true})
    title: string;

    @Prop()
    description: string;

    @Prop({type: [String], default: []})
    permissions: string[]

    @Prop({default: "active"})
    status: string;
    
    @Prop({
        default: false
    })
    deleted: boolean;
}

export const roleSchema = SchemaFactory.createForClass(Role);