import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './location.services';
import { RouterModule } from '@angular/router';
import { LocationCreateComponent } from './location-create/location-create.component';
import { AbonnementListComponent } from './abonnement/abonnement-list/abonnement-list.component';
import { AbonnementCreateComponent } from './abonnement/abonnement-create/abonnement-create.component';
import { LocationUpdateComponent } from './location-update/location-update.component';
import { UiModule } from '@client-side/ui';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    LocationListComponent,
    LocationDetailComponent,
    LocationCreateComponent,
    LocationUpdateComponent,
    AbonnementListComponent,
    AbonnementCreateComponent,
  ],
  providers: [LocationService],
  exports: [
    LocationListComponent,
    LocationDetailComponent,
    AbonnementListComponent,
    AbonnementCreateComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    UiModule,
    FormsModule,
  ],
})
export class LocationModule {}
