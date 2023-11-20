import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAbonnement, ILocation } from '@client-side/shared/api';
import { LocationService } from '../../location.services';
import { Subscription, of } from 'rxjs';

@Component({
  selector: 'client-side-project-abonnement-list',
  templateUrl: './abonnement-list.component.html',
  styleUrls: ['./abonnement-list.component.css'],
})
export class AbonnementListComponent implements OnInit, OnDestroy {
  @Input() location: ILocation | undefined | null;
  @Input() locationId: string | undefined | null;
  paramLocationId: string | null = null;
  abonnoments: IAbonnement[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService
  ) {
    this.route.paramMap.subscribe((params) => {
      this.paramLocationId = params.get('id');
    });
  }

  ngOnInit(): void {
    //check were to get abonnoments from
    if (this.location != undefined && this.location != null)
      this.subscription = of(this.location.abonnoments).subscribe((result) => {
        this.abonnoments = this.location?.abonnoments as IAbonnement[];
      });
    else if (this.locationId != undefined && this.locationId != null)
      this.getAbbonomentId(this.locationId);
    else this.getAbbonomentId(this.paramLocationId);
  }

  private getAbbonomentId(id: string | null): void {
    this.subscription = this.locationService
      .allAbonnements(id)
      .subscribe((results) => {
        this.abonnoments = results;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
