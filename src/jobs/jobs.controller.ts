import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsValidateObjectId } from 'src/common/pipes/validation.pipe';
import { QueryJobDto } from './dto/query-job.dto';

@Controller('jobs')
@ApiTags('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }

  @Get()
  findAll(@Query() queryJobDto: QueryJobDto) {
    return this.jobsService.findAll(queryJobDto);
  }

  @Get(':id')
  findOne(@Param('id', IsValidateObjectId) id: string) {
    return this.jobsService.findOneById(id);
  }

  @Patch(':id')
  update(@Param('id', IsValidateObjectId) id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(id, updateJobDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', IsValidateObjectId) id: string) {
    const infoUpdate = await this.jobsService.remove(id);
    if(infoUpdate.modifiedCount == 0){
      throw new NotFoundException("Job is not found")
    }
  
  }
}
