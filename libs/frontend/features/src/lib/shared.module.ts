import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UiModule } from '@client-side/ui';
import { UserService } from './user/user.services';
import { LocationService } from './location/location.services';
import { AbonnementService } from './abonnement/abonnement.services';
import { RegistrationService } from './registration/registration.services';
import { HeadersInterceptor } from '@client-side/frontend/common';

@NgModule({
  imports: [CommonModule, UiModule],
  providers: [
    UserService,
    LocationService,
    AbonnementService,
    RegistrationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  exports: [
    CommonModule,
    FormsModule,
    UiModule,
    HttpClientModule,
    RouterModule,
  ],
})
export class SharedModule {}
