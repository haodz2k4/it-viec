import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
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

    @Prop()
    address: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);

