import { Component, Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { IAbonnement } from '@client-side/shared/api';

@Component({
  selector: 'client-side-project-abonnement-create',
  templateUrl: './abonnement-create.component.html',
  styleUrls: ['./abonnement-create.component.css'],
})
export class AbonnementCreateComponent {
  @Output() newItemEvent = new EventEmitter<IAbonnement | null>();
  @Input() updateAbonnoment: IAbonnement | null | undefined;

  abonnoment: IAbonnement = {
    name: '',
    price: 0,
    period: 0,
  };

  constructor() {
    if (this.updateAbonnoment != undefined) {
      //user should be updated
      this.abonnoment = this.updateAbonnoment;
    }
  }

  onSubmit() {
    // sent back abonnoment and clear fields

    //TODO: remove this when finished
    if (this.updateAbonnoment != null) {
      this.abonnoment = {
        name: 'Update',
        price: 100,
        period: 100,
      };
      this.newItemEvent.emit(this.abonnoment);
      this.clearFields();
    } else {
      this.newItemEvent.emit(this.abonnoment);
      this.clearFields();
    }
  }

  private clearFields() {
    this.abonnoment = {
      name: '',
      price: 0,
      period: 0,
    };
  }

  cancel() {
    //sent back null and clear fields
    this.newItemEvent.emit(null);
    this.clearFields();
  }
}
