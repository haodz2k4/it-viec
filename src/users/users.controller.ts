import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, NotFoundException, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsValidateObjectId } from 'src/common/pipes/validation.pipe';
import { ApiBody, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './schema/user.schema';
import { QueryUserDto } from './dto/query-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Users')
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
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get All User' })
  getUsers(@Query() queryUserDto: QueryUserDto) {
    return this.usersService.getUsers(queryUserDto);
  }

  @Get(':id')
  @ApiOperation({summary: 'Find user by id'})
  async findOne(@Param('id', IsValidateObjectId) id: string) {
    const user = await this.usersService.findOneById(id);
    if(!user){
      throw new NotFoundException("User is not found")
    }
    return user
  }

  @Patch(':id')
  @ApiOperation({summary: 'Update user by id'})
  @ApiBody({type: UpdateUserDto})
  update(@Param('id', IsValidateObjectId) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({summary: 'Remove user by id'})
  async remove(@Param('id', IsValidateObjectId) id: string) {
    const infoUpdate = await this.usersService.remove(id);
    if(infoUpdate.matchedCount != 1 || infoUpdate.modifiedCount != 1){
      throw new NotFoundException("User is not found")
    }
  }
}
