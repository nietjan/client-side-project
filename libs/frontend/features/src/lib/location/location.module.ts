import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from './location-list/location-list.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './location.services';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [LocationListComponent],
  providers: [LocationService],
  exports: [LocationListComponent],
})
export class LocationModule {}
