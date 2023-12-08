import { NgModule } from '@angular/core';
import { AbonnementCreateComponent } from './abonnement-create/abonnement-create.component';
import { AbonnementListComponent } from './abonnement-list/abonnement-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EmployeeGuard, UiModule } from '@client-side/ui';
import { AbonnementService } from './abonnement.services';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';
import { HeadersInterceptor } from '@client-side/frontend/common';
import { SharedModule } from '../shared.module';

const routes: Routes = [
  {
    path: '',
    component: AbonnementListComponent,
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: AbonnementCreateComponent,
    canActivate: mapToCanActivate([EmployeeGuard]),
  },
  {
    path: ':id/update',
    pathMatch: 'full',
    component: AbonnementCreateComponent,
    canActivate: mapToCanActivate([EmployeeGuard]),
  },
];

@NgModule({
  declarations: [AbonnementCreateComponent],
  providers: [AbonnementService],
  exports: [],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class AbonnementModule {}
