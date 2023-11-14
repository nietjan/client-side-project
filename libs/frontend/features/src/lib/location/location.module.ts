import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './location.services';
import { RouterModule } from '@angular/router';
import { LocationCreateComponent } from './location-create/location-create.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule],
  declarations: [
    LocationListComponent,
    LocationDetailComponent,
    LocationCreateComponent,
  ],
  providers: [LocationService],
  exports: [LocationListComponent, LocationDetailComponent],
})
export class LocationModule {}
