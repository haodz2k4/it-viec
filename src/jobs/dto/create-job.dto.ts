import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateJobDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    requirements: string;

    @IsString()
    @IsOptional()
    location: string

    @IsString()
    @IsOptional()
    @IsIn(['full-time', 'part-time', 'contract', 'internship'])
    jobType: string;

    @IsString()
    @IsOptional()
    salaryRange: string;

    @IsString()
    @IsIn(['fresher', 'mid', 'senior','intern'])
    experienceLevel: string;
}
