import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Permission } from "src/permissions/schemas/permission.schema";

export type roleDocument = HydratedDocument<Role>;
@Schema({
    timestamps: true
})
export class Role {
    
    @Prop({required: true})
    title: string;

    @Prop()
    description: string;

    @Prop({type: [mongoose.Schema.Types.ObjectId], default: [], ref: Permission.name})
    permissions: mongoose.Schema.Types.ObjectId[]

    @Prop({default: "active"})
    status: string;
    
    @Prop({
        default: false
    })
    deleted: boolean;
}

export const roleSchema = SchemaFactory.createForClass(Role);