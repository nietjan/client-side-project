import { Component } from '@angular/core';
import { LocationService } from '../location.services';
import {
  ILocation,
  ICreateLocation,
  ICreateAddress,
  IAddress,
  IAbonnement,
  ICreateAbonnement,
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

  abonnoments: IAbonnement[] = [
    { name: 'Yearly', period: 12, price: 12.5 },
    { name: 'Monthly', period: 1, price: 19.99 },
  ];

  locationToAdd: ICreateLocation = {
    eMail: 'create@create.com',
    phoneNumber: '06 12345678',
    hasTrainers: true,
    openingsTime: new Date(),
    closingTime: new Date(),
    address: this.address,
    abonnoments: this.abonnoments,
  };

  abonnomentCreateScreenOpen: boolean = false;
  abonnomentToUpdate: IAbonnement | null = null;

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

  addAbonnoment(abonnoment: IAbonnement | null) {
    // if abonnomentToUpdate is not null, then the abonnoment needs to be updated instead of added
    if (this.abonnomentToUpdate != null) {
      this.updateAbonnoment(abonnoment);
    } else {
      if (abonnoment != null) {
        this.location.abonnoments.push(abonnoment);
      }
      this.abonnomentCreateScreenOpen = false;
    }
  }

  updateAbonnoment(updateAbonnoment: IAbonnement | null) {
    if (updateAbonnoment != null && this.abonnomentToUpdate != null) {
      var index = this.location.abonnoments.indexOf(this.abonnomentToUpdate);

      if (index !== -1) {
        this.location.abonnoments[index] = updateAbonnoment;
      }
      this.abonnomentToUpdate = null;
    }

    this.abonnomentCreateScreenOpen = false;
  }

  openUpdateScreen(abonnement: IAbonnement) {
    this.abonnomentToUpdate = abonnement;
    this.openAbnnomentScreen();
  }

  openAbnnomentScreen() {
    this.abonnomentCreateScreenOpen = true;
  }

  deleteAbonnoment(abonnement: IAbonnement) {
    this.location.abonnoments.forEach((item, index) => {
      if (item === abonnement) this.location.abonnoments.splice(index, 1);
    });
  }

  onSubmit(): void {}
}
