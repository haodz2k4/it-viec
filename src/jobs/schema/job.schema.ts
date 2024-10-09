import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";


export type jobDocument = HydratedDocument<Job>

@Schema({timestamps: true})
export class Job {

    //employerId 
    //categoryId 
    @Prop({minlength: 3, maxlength: 200, required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Prop()
    requirements: string;

    @Prop()
    location: string;

    @Prop({enum: ['full-time', 'part-time', 'contract', 'internship'],required: true})
    jobType: string;

    @Prop()
    salaryRange: string;


    @Prop({enum: ['fresher', 'mid', 'senior','intern'], required: true})
    experienceLevel: string;
}

export const jobSchema = SchemaFactory.createForClass(Job);