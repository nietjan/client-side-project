import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILocation } from '@client-side/shared/api';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.locationId = params.get('id');
    });
    this.subscription = this.locationService
      .singleLocation(this.locationId)
      .subscribe((results) => {
        console.log(`results: ${results}`);
        this.location = results;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
