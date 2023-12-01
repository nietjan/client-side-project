import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILocation, role } from '@client-side/shared/api';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../location.services';
import { StorageService } from 'libs/frontend/ui/src/lib/storage.services';

@Component({
  selector: 'client-side-project-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css'],
})
export class LocationDetailComponent implements OnInit, OnDestroy {
  location: ILocation | null = null;
  locationSubscription: Subscription | undefined = undefined;
  locationId: string | null = null;
  roleSubscription: Subscription | undefined = undefined;
  canCreateNew: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private router: Router,
    private storageService: StorageService
  ) {
    //get locationId and if null return to /location
    this.route.paramMap.subscribe((params) => {
      this.locationId = params.get('id');
    });
    if (this.locationId == null) this.router.navigateByUrl('/location');
  }

  ngOnInit(): void {
    this.locationSubscription = this.locationService
      .singleLocation(this.locationId!)
      .subscribe((results) => {
        console.log(`results: ${results}`);
        if (results == null) this.router.navigateByUrl('/location');
        this.location = results;
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

  ngOnDestroy(): void {
    if (this.locationSubscription) this.locationSubscription.unsubscribe();
    if (this.roleSubscription) this.roleSubscription.unsubscribe();
  }

  public removeLocation(id: string | null | undefined): void {
    if (id == null || id == undefined) return;
    this.locationService.removeLocation(id);
  }
}
