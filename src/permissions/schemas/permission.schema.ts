import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type permissionDocument = HydratedDocument<Permission>;
@Schema({timestamps: true}) 
export class Permission {

    @Prop({required: true})
    name: string;

    @Prop({required: true})
    apiPath: string;

    @Prop({required: true})
    method: string;

    @Prop({required: true})
    module: string;
    
}

export const PermissionSchema = SchemaFactory.createForClass(Permission)