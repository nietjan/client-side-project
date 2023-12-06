import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { UiModule } from '@client-side/ui';
import { FormsModule } from '@angular/forms';
import { AbonnementModule } from '../abonnement/abonnement.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HeadersInterceptor } from '@client-side/frontend/common';
import { RegistrationService } from './registration.services';
import { UserModule } from '../user/user.module';
import { RegistrationListComponent } from './registration-list/registration-list.component';
import { SharedModule } from '../shared.module';
import { LocationModule } from '../location/location.module';

const routes: Routes = [
  {
    path: 'abonnement/:id',
    pathMatch: 'full',
    component: RegistrationListComponent,
  },
  {
    path: 'user/:id',
    pathMatch: 'full',
    component: RegistrationListComponent,
  },
  {
    path: 'location/:id',
    pathMatch: 'full',
    component: RegistrationListComponent,
  },
];

@NgModule({
  declarations: [RegistrationListComponent],
  providers: [],
  exports: [RegistrationListComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class RegistrationModule {}
