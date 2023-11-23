import { NgModule } from '@angular/core';
import { AbonnementCreateComponent } from './abonnement-create/abonnement-create.component';
import { AbonnementListComponent } from './abonnement-list/abonnement-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UiModule } from '@client-side/ui';
import { AbonnementService } from './abonnement.services';
@NgModule({
  declarations: [AbonnementCreateComponent, AbonnementListComponent],
  providers: [AbonnementService],
  exports: [AbonnementListComponent, AbonnementCreateComponent],
  imports: [FormsModule, CommonModule, HttpClientModule, UiModule],
})
export class AbonnementModule {}
