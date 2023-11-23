import { NgModule } from '@angular/core';
import { AbonnementCreateComponent } from './abonnement-create/abonnement-create.component';
import { AbonnementListComponent } from './abonnement-list/abonnement-list.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AbonnementCreateComponent, AbonnementListComponent],
  providers: [],
  exports: [AbonnementListComponent],
  imports: [FormsModule, CommonModule, HttpClientModule],
})
export class AbonnementModule {}
