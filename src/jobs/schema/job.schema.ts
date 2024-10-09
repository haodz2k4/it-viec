import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Model } from "mongoose";
import { Slug } from "src/utils/slug.util";


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

    @Prop({unique: true, index: true})
    slug: string

    @Prop({default: false})
    deleted: boolean
}

export const jobSchema = SchemaFactory.createForClass(Job);

jobSchema.pre<jobDocument>('save',async function(next) {

    if(this.isModified('title')){
        const slug = new Slug<jobDocument>(this.title)
        const JobModel = this.constructor as Model<jobDocument>;
        await slug.generateUniqueSlug(JobModel)
        this.slug = slug.getSlug()
    }
    next()
})