import { Component } from '@angular/core';
import { LocationService } from '../location.services';
import { AbonnementService } from '@client-side/frontend/features';
import {
  ILocation,
  ICreateLocation,
  IAbonnement,
} from '@client-side/shared/api';
import { Router } from '@angular/router';

@Component({
  selector: 'client-side-project-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css'],
})
export class LocationCreateComponent {
  location: ICreateLocation = {
    eMail: '',
    phoneNumber: '',
    hasTrainers: true,
    openingsTime: new Date(''),
    closingTime: new Date(''),
    address: {
      street: '',
      homeNumber: '',
      postalCode: '',
      city: '',
      country: '',
    },
    abonnoments: [],
  };

  allAbonnements: IAbonnement[] = [];

  constructor(
    private locationService: LocationService,
    private abonnementService: AbonnementService,
    private router: Router
  ) {
    //TODO: Get all abonnements from DB
  }

  public onSubmit(): void {
    var locationId = this.locationService.createLocation(
      this.location as ILocation
    );

    //redirect back to list
    if (locationId != null)
      this.router.navigateByUrl(`/location/${locationId}`);

    //TODO: Add functie for id id is not null - when form is not correct
  }
}
