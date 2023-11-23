import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IAbonnement,
  ICreateAddress,
  ILocation,
} from '@client-side/shared/api';
import { LocationService } from '../location.services';

@Component({
  selector: 'client-side-project-location-update',
  templateUrl: './location-update.component.html',
  styleUrls: ['./location-update.component.css'],
})
export class LocationUpdateComponent {
  locationId: string | null = null;

  address: ICreateAddress = {
    street: 'Street',
    homeNumber: '1',
    city: 'Updated city',
    country: 'country',
    postalCode: 'postalCode',
  };

  locationToAdd: ILocation = {
    id: '',
    eMail: 'Updated - Email@update.com',
    phoneNumber: '03 12345678',
    hasTrainers: true,
    openingsTime: new Date(),
    closingTime: new Date(),
    address: this.address,
    abonnements: ['1', '2'],
  };

  constructor(
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((params) => {
      this.locationId = params.get('id');
    });
  }

  public update(): void {
    //redirect back to list if id is null
    if (this.locationId != null) this.router.navigateByUrl('/location');

    this.locationToAdd.id = this.locationId as string;
    let result = this.locationService.updateLocation(this.locationToAdd);
    if (result != null)
      this.router.navigateByUrl(`/location/${this.locationId}`);

    //TODO: Add functie if result is null - when form is not correct
  }
}
