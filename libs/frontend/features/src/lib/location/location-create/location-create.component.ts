import { Component } from '@angular/core';
import { LocationService } from '../location.services';
import {
  ILocation,
  ICreateLocation,
  ICreateAddress,
  IAddress,
} from '@client-side/shared/api';
import { Router } from '@angular/router';

@Component({
  selector: 'client-side-project-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css'],
})
export class LocationCreateComponent {
  address: ICreateAddress = {
    street: 'street',
    homeNumber: '1',
    city: 'city',
    country: 'country',
    postalCode: 'postalCode',
  };

  locationToAdd: ICreateLocation = {
    eMail: '',
    phoneNumber: '',
    hasTrainers: true,
    openingsTime: new Date(),
    closingTime: new Date(),
    address: this.address,
  };

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  public create(): void {
    var locationId = this.locationService.createLocation(
      this.locationToAdd as ILocation
    );

    //redirect back to list
    if (locationId != null)
      this.router.navigateByUrl(`/location/${locationId}`);

    //TODO: Add functie for id id is not null - when form is not correct
  }
}
