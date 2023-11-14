import { Controller } from '@nestjs/common';
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
  getAll(): ILocation[] {
    return this.locationService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get location with id' })
  @ApiParam({ name: 'id', description: 'Id of location', type: String })
  getOne(@Param('id') id: string): ILocation {
    return this.locationService.getOne(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Create location' })
  create(@Body() data: CreateLocationDto): ILocation {
    console.log(data);
    return this.locationService.create(data);
  }
}
