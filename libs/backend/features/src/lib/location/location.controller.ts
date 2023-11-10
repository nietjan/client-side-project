import { Controller } from '@nestjs/common';
import { Get, Param, Post, Body } from '@nestjs/common';
import { LocationService } from './location.services';
import { ILocation } from '@client-side/shared/api';
import { CreateLocationDto } from '@client-side/backend/dto';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get('')
  getAll(): ILocation[] {
    return this.locationService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): ILocation {
    return this.locationService.getOne(id);
  }

  @Post('')
  create(@Body() data: CreateLocationDto): ILocation {
    console.log(data);
    return this.locationService.create(data);
  }
}
