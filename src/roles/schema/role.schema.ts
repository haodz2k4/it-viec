import { Schema, Prop } from "@nestjs/mongoose";

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

    @Prop({
        default: false
    })
    deleted: boolean;
}
