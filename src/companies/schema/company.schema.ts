import { Schema, Prop, SchemaFactory, raw } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type companyDocument = HydratedDocument<Company>;
@Schema({timestamps: true})
export class Company {

    @Prop({required: true})
    name: string;

    @Prop()
    description: string;

    @Prop()
    logo: string;

    @Prop(raw({
        street: String,
        city: String,
        country: String
    }))
    address: Record<string, any>;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

