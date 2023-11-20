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
      this.subscription = of(this.location.abonnoments).subscribe();
    else if (this.locationId != undefined && this.locationId != null)
      this.getAbbonomentFromInputId();
    else this.getAbbonomentFromParamId();
  }

  private getAbbonomentFromInputId(): void {
    // this.subscription = this.locationService
    //   .allAbonnements(this.locationId)
    //   .subscribe((results) => {
    //     console.log(`results: ${results}`);
    //     if (results == null) this.router.navigateByUrl('/location');
    //     this.location = results;
    //   });
  }

  private getAbbonomentFromParamId(): void {}

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
