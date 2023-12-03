import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILocation, ROLE } from '@client-side/shared/api';
import { Subscription } from 'rxjs';
import { LocationService } from '../location.services';
import { StorageService } from 'libs/frontend/ui/src/lib/storage.services';

@Component({
  selector: 'client-side-project-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class LocationListComponent implements OnInit, OnDestroy {
  locations: ILocation[] | null = null;
  locationSubscription: Subscription | undefined = undefined;
  roleSubscription: Subscription | undefined = undefined;
  canCreateNew: boolean = false;

  constructor(
    private locationService: LocationService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.locationSubscription = this.locationService
      .allLocations()
      .subscribe((results) => {
        console.log(`results: ${results}`);
        this.locations = results;
      });

    //set if user can create new
    this.roleSubscription = this.storageService
      .getRole()
      .subscribe((result) => {
        if (result == ROLE.EMPLOYEE) {
          this.canCreateNew = true;
        } else {
          this.canCreateNew = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.locationSubscription) this.locationSubscription.unsubscribe();
    if (this.roleSubscription) this.roleSubscription.unsubscribe();
  }
}
