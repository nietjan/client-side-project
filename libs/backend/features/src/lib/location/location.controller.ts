import {
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { LocationService } from './location.services';
import { CreateLocationDto, UpdateLocationDto } from '@client-side/backend/dto';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiOperation,
} from '@nestjs/swagger';
import { NOTFOUND } from 'dns';
import { DbLocation } from './location.schema';
import { DeleteResult } from 'mongodb';
import { ILocation, IUpdateLocation } from '@client-side/shared/api';
import { UpdateWriteOpResult } from 'mongoose';

//TODO: add all ApiResponses
@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('')
  //for auth use ApiHeader
  @ApiOperation({ summary: 'Get all locations' })
  @ApiResponse({
    status: 200,
    description: 'Succesfully returns all locations',
  })
  async getAll(): Promise<DbLocation[]> {
    try {
      return await this.locationService.getAll();
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get location with id' })
  @ApiParam({ name: 'id', description: 'Id of location', type: String })
  async getOne(@Param('id') id: string): Promise<DbLocation> {
    try {
      let result = await this.locationService.getOne(id);
      if (result != null) {
        return result;
      } else
        throw new HttpException(
          `Location with id: ${id} does not exist`,
          HttpStatus.NOT_FOUND
        );
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  @ApiOperation({ summary: 'Create location' })
  @ApiBody({ type: CreateLocationDto })
  async create(@Body() data: CreateLocationDto): Promise<DbLocation> {
    try {
      return await this.locationService.create(data);
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
  @ApiOperation({ summary: 'Delete location' })
  @ApiParam({ name: 'id', description: 'Id of location', type: String })
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    try {
      const result = await this.locationService.delete(id);
      if (result.deletedCount == 0) {
        throw new HttpException(
          `Location with id ${id} does not exist`,
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
  @ApiOperation({ summary: 'Delete location' })
  @ApiParam({ name: 'id', description: 'Id of location', type: String })
  @ApiBody({ type: UpdateLocationDto })
  async Update(
    @Param('id') id: string,
    @Body() location: UpdateLocationDto
  ): Promise<UpdateWriteOpResult> {
    try {
      const result = await this.locationService.update(location, id);
      if (result.modifiedCount == 0) {
        throw new HttpException(
          `Location with id ${id} does not exist`,
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
