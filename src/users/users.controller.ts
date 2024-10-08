import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException, Query, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsValidateObjectId } from 'src/common/pipes/validation.pipe';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiExtraModels, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from './schema/user.schema';
import { QueryUserDto } from './dto/query-user.dto';
import { UserRequest } from 'src/decorator/user.decorator';
import { ResponseMessage } from 'src/decorator/transfrom-response.decorate';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@ApiTags('Users')
@ApiBearerAuth()
@ApiExtraModels(QueryUserDto)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private cloudinary: CloudinaryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({type: CreateUserDto})
  @ApiCreatedResponse({type: User})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({summary: 'Get All Users'})
  // @ApiQuery({
  //   name: 'query',
  //   type: QueryUserDto,
  //   style: 'deepObject',
  //   explode: true,
  //   required: false,
  // })
  getUsers(@Query() queryUserDto: QueryUserDto) {
    return this.usersService.getUsers(queryUserDto);
  }

  @Get('me')
  @ApiOperation({summary: 'Get current user'})
  @ResponseMessage("Get current user")
  async me(@UserRequest('sub') sub: string) {
    return this.usersService.findOneById(sub);
  }

  @Get(':id')
  @ApiOperation({summary: 'Find user by id'})
  @ResponseMessage("Get user")
  @ApiParam({
    name: 'id',
    type: String,
    example: '6702023b505f3882af215167'
  })
  async findOne(@Param('id', IsValidateObjectId) id: string) {
    const user = await this.usersService.findOneById(id);
    if(!user){
      throw new NotFoundException("User is not found")
    }
    return user
  }

  @Post(':id/upload')
  @ApiOperation({summary: 'Upload avatar'})
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id', IsValidateObjectId) id: string) {
    const path = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
    const updateUserDto = new UpdateUserDto();
    updateUserDto.avatar = path.url 
    await this.usersService.update(id,updateUserDto)
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update user by id'})
  @ResponseMessage("Update user by id")
  @ApiParam({
    name: 'id',
    type: String,
    example: '6702023b505f3882af215167'
  })
  @ApiBody({type: UpdateUserDto})
  update(@Param('id', IsValidateObjectId) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiParam({
    name: 'id',
    type: String,
    example: '6702023b505f3882af215167'
  })
  @ResponseMessage("Remove user")
  @ApiOperation({summary: 'Remove user by id'})
  async remove(@Param('id', IsValidateObjectId) id: string) {
    const infoUpdate = await this.usersService.remove(id);
    if(infoUpdate.matchedCount != 1){
      throw new NotFoundException("User is not found")
    }
  }
}
