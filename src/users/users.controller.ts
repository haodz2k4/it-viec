import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsValidateObjectId } from 'src/common/pipes/validation.pipe';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { User } from './schema/user.schema';
import { QueryUserDto } from './dto/query-user.dto';
import { UserRequest } from 'src/decorator/user.decorator';
import { ResponseMessage } from 'src/decorator/transfrom-response.decorate';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({type: CreateUserDto})
  @ApiCreatedResponse({type: User})
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get All User' })
  @ApiQuery({type: QueryUserDto})
  getUsers(@Query() queryUserDto: QueryUserDto) {
    return this.usersService.getUsers(queryUserDto);
  }

  @Get('me')
  @ApiOperation({summary: 'Get current user'})
  @ResponseMessage("Get current user")
  async me(@UserRequest() user) {
    return user 
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

  @Post('upload')
  @ApiOperation({summary: 'Upload avatar'})
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
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
