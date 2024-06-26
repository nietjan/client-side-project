import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Put,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { UserService } from './user.services';
import { CreateUserDto, UpdateUserDto } from '@client-side/backend/dto';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { NOTFOUND } from 'dns';
import { DbUser } from './user.schema';
import { DeleteResult } from 'mongodb';
import { IUser, IUpdateUser } from '@client-side/shared/api';
import { UpdateWriteOpResult } from 'mongoose';
import { AuthGuard } from '../auth/guards/auth.guards';

//TODO: add all ApiResponses
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  //for auth use ApiHeader
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Succesfully returns all users',
  })
  async getAll(): Promise<Object[]> {
    try {
      return await this.userService.getAll();
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user with id' })
  @ApiParam({ name: 'id', description: 'Id of user', type: String })
  async getOne(@Param('id') id: string): Promise<Object> {
    try {
      let result = await this.userService.getOne(id);
      if (result != null) {
        return result;
      } else
        throw new HttpException(
          `user with id: ${id} does not exist`,
          HttpStatus.NOT_FOUND
        );
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() data: CreateUserDto): Promise<Object> {
    try {
      return await this.userService.create(data);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Server erro',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'Id of user', type: String })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async delete(
    @Param('id') id: string,
    @Request() req: any
  ): Promise<DeleteResult> {
    //TODO: also delete registrations with this id
    if (id != req['user'].user_id) {
      throw new UnauthorizedException('Not allowed to delete user');
    }

    try {
      const result = await this.userService.delete(id);
      if (result.deletedCount == 0) {
        throw new HttpException(
          `user with id ${id} does not exist`,
          HttpStatus.NOT_FOUND
        );
      }

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'Id of user', type: String })
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async Update(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
    @Request() req: any
  ): Promise<UpdateWriteOpResult> {
    if (id != req['user'].user_id) {
      throw new UnauthorizedException('Not allowed to delete user');
    }

    try {
      const result = await this.userService.update(user, id);
      if (result.modifiedCount == 0) {
        throw new HttpException(
          `user with id ${id} does not exist`,
          HttpStatus.NOT_FOUND
        );
      }
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
}
