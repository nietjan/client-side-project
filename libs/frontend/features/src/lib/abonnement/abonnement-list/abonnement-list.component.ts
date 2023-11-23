import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IAbonnement, ILocation } from '@client-side/shared/api';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'client-side-project-abonnement-list',
  templateUrl: './abonnement-list.component.html',
  styleUrls: ['./abonnement-list.component.css'],
})
export class AbonnementListComponent implements OnInit, OnDestroy {
  //Input is only needed if the list is only for 1 location, instead of all
  @Input() locationId: string | undefined | null;
  abonnoments: IAbonnement[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor() {}

  ngOnInit(): void {
    //check if only abonnement from 1 location of all
    if (this.locationId != undefined && this.locationId != null) {
      //TODO: Get all from abonnementService but only the correct ones
    } else {
      //TODO: get all from abonnementService
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
