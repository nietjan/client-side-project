import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UiModule } from '@client-side/ui';
import { FormsModule } from '@angular/forms';
import { AbonnementModule } from '../abonnement/abonnement.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HeadersInterceptor } from '@client-side/frontend/common';
import { RegistrationService } from './registration.services';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [],
  providers: [
    RegistrationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  exports: [],
  imports: [
    CommonModule,
    HttpClientModule,
    UiModule,
    AbonnementModule,
    RouterModule,
    LocationModule,
    UserModule,
    NgMultiSelectDropDownModule,
  ],
})
export class LocationModule {}
