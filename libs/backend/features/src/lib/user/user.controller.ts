import { Controller } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.services';
import { ILocation } from '@client-side/shared/api';
import { CreateLocationDto } from '@client-side/backend/dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  getAll(): ILocation[] {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): ILocation {
    return this.userService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateLocationDto): ILocation {
    console.log(data);
    return this.userService.create(data);
  }
}
