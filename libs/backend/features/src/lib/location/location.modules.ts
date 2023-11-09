import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.services';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class BackendFeaturesMealModule {}
