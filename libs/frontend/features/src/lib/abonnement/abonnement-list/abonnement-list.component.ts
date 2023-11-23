import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IAbonnement, ILocation } from '@client-side/shared/api';
import { Subscription, of } from 'rxjs';
import { AbonnementService } from '../abonnement.services';

@Component({
  selector: 'client-side-project-abonnement-list',
  templateUrl: './abonnement-list.component.html',
  styleUrls: ['./abonnement-list.component.css'],
})
export class AbonnementListComponent implements OnInit, OnDestroy {
  //Input is only needed if the list is only for 1 location, instead of all

  //TODO: vrewijer string[] want dat is stranks niet nodig, want er moet met het id een api call gedaan worden
  @Input() locationId: string | string[] | undefined | null;
  abonnoments: IAbonnement[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private abonnementService: AbonnementService) {}

  ngOnInit(): void {
    //check if only abonnement from 1 location of all
    if (this.locationId != undefined && this.locationId != null) {
      this.subscription = this.abonnementService
        .allAbonnementsFromLocation(this.locationId as string[])
        .subscribe((results) => {
          console.log(`results: ${results}`);
          this.abonnoments = results;
        });
    } else {
      this.subscription = this.abonnementService
        .allAbonnements()
        .subscribe((results) => {
          console.log(`results: ${results}`);
          this.abonnoments = results;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
