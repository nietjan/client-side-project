import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationListComponent } from './location-list/location-list.component';
import { LocationDetailComponent } from './location-detail/location-detail.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LocationService } from './location.services';
import { RouterModule, Routes } from '@angular/router';
import { LocationCreateComponent } from './location-create/location-create.component';
import { UiModule } from '@client-side/ui';
import { FormsModule } from '@angular/forms';
import { AbonnementModule } from '../abonnement/abonnement.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HeadersInterceptor } from '@client-side/frontend/common';
import { SharedModule } from '../shared.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LocationListComponent,
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: LocationCreateComponent,
  },
  {
    path: ':id/update',
    pathMatch: 'full',
    component: LocationCreateComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: LocationDetailComponent,
  },
];

@NgModule({
  declarations: [
    LocationListComponent,
    LocationDetailComponent,
    LocationCreateComponent,
  ],
  providers: [],
  exports: [LocationListComponent, LocationDetailComponent],
  imports: [
    SharedModule,
    UiModule,
    AbonnementModule,
    NgMultiSelectDropDownModule,
    RouterModule.forChild(routes),
  ],
})
export class LocationModule {}
