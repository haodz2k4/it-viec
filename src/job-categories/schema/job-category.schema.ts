import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Model } from "mongoose";
import { Slug } from "src/utils/slug.util";

export type JobCategoryDocument = HydratedDocument<JobCategory>;

@Schema({timestamps: true})
export class JobCategory {

    @Prop({required: true})
    categoryName: string;

    @Prop()
    description: string;

    @Prop()
    thumbnail: string;
    
    @Prop({default: false})
    deleted: boolean

    @Prop({unique: true})
    slug: string;

    @Prop({default: "active", enum: ["active","inactive"]})
    status: string;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "JobCategory"})
    parentCaegory: mongoose.Schema.Types.ObjectId
}

export const JobCategorySchema = SchemaFactory.createForClass(JobCategory); 

JobCategorySchema.pre('save',async function(next) {

    if(this.isModified('categoryName')){
        const slug = new Slug<JobCategoryDocument>(this.categoryName);
        const JobCategoryDocument = this.constructor as Model<JobCategoryDocument>;
        this.slug = (await slug.generateUniqueSlug(JobCategoryDocument)).getSlug();
    }
    next()
})


