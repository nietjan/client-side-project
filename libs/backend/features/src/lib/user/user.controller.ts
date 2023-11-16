import { Controller } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.services';
import { IUser } from '@client-side/shared/api';
import { CreateUserDto } from '@client-side/backend/dto';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiHeader,
  ApiOperation,
} from '@nestjs/swagger';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getAll(): IUser[] {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): IUser {
    return this.userService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateUserDto): IUser {
    console.log(data);
    return this.userService.create(data);
  }
}
