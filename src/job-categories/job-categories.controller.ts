import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { JobCategoriesService } from './job-categories.service';
import { CreateJobCategoryDto } from './dto/create-job-category.dto';
import { UpdateJobCategoryDto } from './dto/update-job-category.dto';
import { IsValidateObjectId } from 'src/common/pipes/validation.pipe';
import { ResponseMessage } from 'src/decorator/transfrom-response.decorate';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/decorator/public.decorator';
import { QueryJobCategory } from './dto/query-job-category.dto';

@ApiTags('job-categories')
@Controller('job-categories')
export class JobCategoriesController {
  constructor(private readonly jobCategoriesService: JobCategoriesService) {}

  @Post()
  @ResponseMessage("Create Job Category")
  create(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    console.log("run here")
    return this.jobCategoriesService.create(createJobCategoryDto);
  }

  @Get()
  @Public()
  @ResponseMessage("Find All Caetegory")
  findAll(@Query() queryJobCategory: QueryJobCategory){
    return this.jobCategoriesService.findAll(queryJobCategory);
  }

  @Get(':id')
  @ResponseMessage("Find One Category")
  findOne(@Param('id', IsValidateObjectId) id: string){
    return this.jobCategoriesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage("Update job category")
  update(@Param('id', IsValidateObjectId) id: string, @Body() updateJobCategoryDto: UpdateJobCategoryDto) {
    return this.jobCategoriesService.update(id, updateJobCategoryDto);
  }

  @Delete(':id')
  @ResponseMessage("Remove job category")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', IsValidateObjectId) id: string){
    this.jobCategoriesService.remove(id);
  }
}
