import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AbonnementService } from './abonnement.services';
import { AbonnementListComponent } from './abonnement-list/abonnement-list.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule],
  declarations: [AbonnementListComponent],
  providers: [AbonnementService],
  exports: [AbonnementListComponent],
})
export class AbonnementModule {}
