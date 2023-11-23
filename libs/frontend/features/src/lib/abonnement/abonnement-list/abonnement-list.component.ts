import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAbonnement, ILocation } from '@client-side/shared/api';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'client-side-project-abonnement-list',
  templateUrl: './abonnement-list.component.html',
  styleUrls: ['./abonnement-list.component.css'],
})
export class AbonnementListComponent implements OnInit, OnDestroy {
  @Input() location: ILocation | undefined | null;
  abonnoments: IAbonnement[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor() {}

  ngOnInit(): void {
    //check if only abonnement from 1 location of all
    if (this.location != undefined && this.location != null)
      this.subscription = of(this.location.abonnoments).subscribe((result) => {
        this.abonnoments = this.location?.abonnoments as IAbonnement[];
      });
    else {
      //TODO: get all from abonnementService
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
