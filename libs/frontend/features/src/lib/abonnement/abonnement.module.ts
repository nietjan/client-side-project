import { NgModule } from '@angular/core';
import { AbonnementCreateComponent } from './abonnement-create/abonnement-create.component';
import { AbonnementListComponent } from './abonnement-list/abonnement-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UiModule } from '@client-side/ui';
import { AbonnementService } from './abonnement.services';
import { RouterModule } from '@angular/router';
import { HeadersInterceptor } from '@client-side/frontend/common';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [AbonnementCreateComponent, AbonnementListComponent],
  providers: [
    AbonnementService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  exports: [AbonnementListComponent, AbonnementCreateComponent],
  imports: [SharedModule],
})
export class AbonnementModule {}
