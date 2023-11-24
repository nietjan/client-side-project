import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { IAbonnement } from '@client-side/shared/api';
import { Observable } from 'rxjs';
import { AbonnementService } from '../abonnement.services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'client-side-project-abonnement-create',
  templateUrl: './abonnement-create.component.html',
  styleUrls: ['./abonnement-create.component.css'],
})
export class AbonnementCreateComponent {
  isUpdating: boolean = false;

  abonnoment: IAbonnement = {
    id: '',
    name: '',
    price: 0,
    period: 0,
  };

  //list of possible periods
  periodNumberList = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24, 32, 36];

  constructor(
    private abonnementService: AbonnementService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    //if in param there is id, than it is a update
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      if (id != null) {
        this.isUpdating = true;
        this.abonnementService
          .singleAbonnoment(id)
          .subscribe(
            (value) => (this.abonnoment = { ...this.abonnoment, ...value })
          );
      }
    });
  }

  onSubmit() {
    if (this.isUpdating) {
      //Not update
      this.abonnementService.updateAbonnement(this.abonnoment);
    } else {
      //Update
      this.abonnementService.createAbonnement(this.abonnoment);
    }

    this.router.navigateByUrl('/abonnement');
  }
}
