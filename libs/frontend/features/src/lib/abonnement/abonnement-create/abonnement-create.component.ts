import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { IAbonnement, role } from '@client-side/shared/api';
import { Observable, Subscription } from 'rxjs';
import { AbonnementService } from '../abonnement.services';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'libs/frontend/ui/src/lib/storage.services';

@Component({
  selector: 'client-side-project-abonnement-create',
  templateUrl: './abonnement-create.component.html',
  styleUrls: ['./abonnement-create.component.css'],
})
export class AbonnementCreateComponent {
  isUpdating: boolean = false;
  roleSubscription: Subscription | undefined = undefined;
  canCreateNew: boolean = false;

  abonnoment: IAbonnement = {
    _id: '',
    name: '',
    price: 0,
    period: 0,
  };

  //list of possible periods
  periodNumberList = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24, 32, 36];

  constructor(
    private abonnementService: AbonnementService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
    //if in param there is id, than it is a update
    this.route.paramMap?.subscribe((params) => {
      let id = params.get('id');
      if (id != null) {
        this.isUpdating = true;
        this.abonnementService
          .singleAbonnoment(id)
          .subscribe(
            (value) => (this.abonnoment = { ...this.abonnoment, ...value })
          );

        //set if user can create new
        this.roleSubscription = this.storageService
          .getRole()
          .subscribe((result) => {
            if (result == role.EMPLOYEE) {
              this.canCreateNew = true;
            } else {
              this.canCreateNew = false;
            }
          });
      }
    });
  }

  onSubmit() {
    //if not allowed redirect
    if (!this.canCreateNew) {
      this.router.navigateByUrl('/abonnement');
    }

    this.abonnoment.period = Number(this.abonnoment.period);
    if (this.isUpdating) {
      //update
      this.abonnementService
        .updateAbonnement(this.abonnoment)
        .subscribe((value) => {
          this.router.navigateByUrl('/abonnement');
        });
    } else {
      console.log('suptmit');
      //create
      this.abonnementService
        .createAbonnement(this.abonnoment)
        .subscribe((value) => {
          this.router.navigateByUrl('/abonnement');
        });
    }
  }
}
