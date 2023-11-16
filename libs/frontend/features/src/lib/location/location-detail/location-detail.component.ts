import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILocation } from '@client-side/shared/api';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../location.services';

@Component({
  selector: 'client-side-project-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css'],
})
export class LocationDetailComponent implements OnInit, OnDestroy {
  location: ILocation | null = null;
  subscription: Subscription | undefined = undefined;
  locationId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      this.locationId = params.get('id');
    });
  }

  ngOnInit(): void {
    this.subscription = this.locationService
      .singleLocation(this.locationId)
      .subscribe((results) => {
        console.log(`results: ${results}`);
        if (results == null) this.router.navigateByUrl('/location');
        this.location = results;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  public removeLocation(id: string | null | undefined): void {
    if (id == null || id == undefined) return;
    this.locationService.removeLocation(id);
  }
}
