import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILocation } from '@client-side/shared/api';
import { Subscription } from 'rxjs';
import { LocationService } from '../location.services';

@Component({
  selector: 'client-side-project-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class LocationListComponent implements OnInit, OnDestroy {
  locations: ILocation[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.subscription = this.locationService
      .allLocations()
      .subscribe((results) => {
        console.log(`results: ${results}`);
        this.locations = results;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  public removeLocation(id: string): void {
    this.locationService.removeLocation(id);
  }
}
