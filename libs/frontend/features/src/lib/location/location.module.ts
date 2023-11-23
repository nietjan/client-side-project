import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './location.services';
import { RouterModule } from '@angular/router';
import { LocationCreateComponent } from './location-create/location-create.component';
import { LocationUpdateComponent } from './location-update/location-update.component';
import { UiModule } from '@client-side/ui';
import { FormsModule } from '@angular/forms';
import { AbonnementModule } from '../abonnement/abonnement.module';
@NgModule({
  declarations: [
    LocationListComponent,
    LocationDetailComponent,
    LocationCreateComponent,
    LocationUpdateComponent,
  ],
  providers: [LocationService],
  exports: [LocationListComponent, LocationDetailComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    UiModule,
    FormsModule,
    AbonnementModule,
  ],
})
export class LocationModule {}
