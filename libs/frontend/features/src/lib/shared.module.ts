import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UiModule } from '@client-side/ui';
import { UserService } from './user/user.services';
import { LocationService } from './location/location.services';
import { AbonnementService } from './abonnement/abonnement.services';
import { RegistrationService } from './registration/registration.services';
import { HeadersInterceptor } from '@client-side/frontend/common';
import { AbonnementModule } from './abonnement/abonnement.module';
import { AbonnementListComponent } from './abonnement/abonnement-list/abonnement-list.component';

@NgModule({
  imports: [CommonModule, UiModule, RouterModule],
  providers: [
    UserService,
    LocationService,
    RegistrationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
    AbonnementService,
  ],
  declarations: [AbonnementListComponent],
  exports: [
    CommonModule,
    FormsModule,
    UiModule,
    HttpClientModule,
    RouterModule,
    AbonnementListComponent,
  ],
})
export class SharedModule {}
