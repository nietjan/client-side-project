import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { LocationService } from './location.services';
import { ILocation } from '@client-side/shared/api';
import { CreateLocationDto } from '@client-side/backend/dto';
import {
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiHeader,
  ApiOperation,
} from '@nestjs/swagger';
import { NOTFOUND } from 'dns';
import { DbLocation } from './location.schema';

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
  getOne(@Param('id') id: string): ILocation {
    throw new HttpException('Not implented', HttpStatus.NOT_IMPLEMENTED);
  }

  @Post('')
  @ApiOperation({ summary: 'Create location' })
  async create(@Body() data: CreateLocationDto): Promise<DbLocation> {
    try {
      return await this.locationService.create(data);
    } catch (error) {
      console.log(error);

      if (typeof error === 'string') {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      } else if (error instanceof Error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      } else {
        throw new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
