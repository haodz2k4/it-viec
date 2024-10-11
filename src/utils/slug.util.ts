import { Model } from "mongoose";
import slugify from "slugify"

export class Slug<T> {
    private data: string;
    constructor(data: string) {
        this.data = slugify(data,{lower: true, strict: true})
    }
    getSlug(): string{
        return this.data;
    }
    
    async generateUniqueSlug(model: Model<T>) {
        let count = 1;
        while(await model.findOne({slug: this.data})){
            this.data = `${this.data}-${count}`
            count++;
        }
        return this 
    }
}