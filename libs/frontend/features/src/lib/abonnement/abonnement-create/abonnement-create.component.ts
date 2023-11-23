import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { IAbonnement } from '@client-side/shared/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'client-side-project-abonnement-create',
  templateUrl: './abonnement-create.component.html',
  styleUrls: ['./abonnement-create.component.css'],
})
export class AbonnementCreateComponent {
  @Input() updateAbonnoment: IAbonnement | null | undefined;

  abonnoment: IAbonnement = {
    id: '',
    name: '',
    price: 0,
    period: 0,
  };

  //list of possible periods
  periodNumberList = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24, 32, 36];

  constructor() {
    if (this.updateAbonnoment != undefined && this.updateAbonnoment != null) {
      //user should be updated
      this.abonnoment = this.updateAbonnoment;
    }
  }

  onSubmit() {
    // sent back abonnoment and clear fields
    //TODO: Sent back to API
  }

  cancel() {
    console.log(this.cancel);
  }
}
