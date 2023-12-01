import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IAbonnement, ILocation, role } from '@client-side/shared/api';
import { Subscription, of } from 'rxjs';
import { AbonnementService } from '../abonnement.services';
import { StorageService } from 'libs/frontend/ui/src/lib/storage.services';

@Component({
  selector: 'client-side-project-abonnement-list',
  templateUrl: './abonnement-list.component.html',
  styleUrls: ['./abonnement-list.component.css'],
})
export class AbonnementListComponent implements OnInit, OnDestroy {
  //Input is only needed if the list is only for 1 location, instead of all

  //TODO: vrewijer string[] want dat is stranks niet nodig, want er moet met het id een api call gedaan worden
  @Input() locationId: string | undefined | null;
  abonnoments: IAbonnement[] | null = null;
  abonnementSubscription: Subscription | undefined = undefined;
  roleSubscription: Subscription | undefined = undefined;
  canCreateNew: boolean = false;

  constructor(
    private abonnementService: AbonnementService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    //check if only abonnement from 1 location of all
    if (this.locationId != undefined && this.locationId != null) {
      this.abonnementSubscription = this.abonnementService
        .allAbonnementsFromLocation(this.locationId)
        .subscribe((results) => {
          this.abonnoments = results;
        });
    } else {
      this.abonnementSubscription = this.abonnementService
        .allAbonnements()
        .subscribe((results) => {
          this.abonnoments = results;
        });

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

    console.log(this.abonnoments);
  }

  delete(id: string): void {
    this.abonnementService.removeAbonnement(id);

    //set abonnements again
    this.abonnementSubscription = this.abonnementService
      .allAbonnements()
      .subscribe((results) => {
        this.abonnoments = results;
      });
  }

  ngOnDestroy(): void {
    if (this.abonnementSubscription) this.abonnementSubscription.unsubscribe();
    if (this.roleSubscription) this.roleSubscription.unsubscribe();
  }
}
