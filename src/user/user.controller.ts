import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 201, description: 'User created.', type: User })
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 200,
    description: 'All users',
    type: [User],
  })
  findAll() {
    return this.userService.findAll();
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get an user' })
  @ApiResponse({
    status: 200,
    description: 'User founded',
    type: User,
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'User updated',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
