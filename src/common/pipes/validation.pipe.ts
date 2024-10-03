import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { isValidObjectId } from "mongoose";

export class IsValidateObjectId implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if(!isValidObjectId(value)){
            throw new BadRequestException("Invalid ObjectId");
        }
        return value
    }
    
}