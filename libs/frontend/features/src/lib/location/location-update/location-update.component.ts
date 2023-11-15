import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICreateAddress, ILocation } from '@client-side/shared/api';
import { LocationService } from '../location.services';

@Component({
  selector: 'client-side-project-location-update',
  templateUrl: './location-update.component.html',
  styleUrls: ['./location-update.component.css'],
})
export class LocationUpdateComponent {
  locationId: string | null = null;

  address: ICreateAddress = {
    street: 'Updatestreet',
    homeNumber: 'Update1',
    city: 'Updatecity',
    country: 'Updatecountry',
    postalCode: 'UpdatepostalCode',
  };

  locationToAdd: ILocation = {
    id: '',
    eMail: 'UpdateEmail',
    phoneNumber: 'UpdatePhone',
    hasTrainers: true,
    openingsTime: new Date(),
    closingTime: new Date(),
    address: this.address,
  };

  constructor(
    private locationService: LocationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public update(): void {
    this.route.paramMap.subscribe((params) => {
      this.locationId = params.get('id');
    });

    //redirect back to list if id is null
    if (this.locationId != null) this.router.navigateByUrl('/location');

    this.locationToAdd.id = this.locationId as string;
    let result = this.locationService.updateLocation(this.locationToAdd);
    if (result != null)
      this.router.navigateByUrl(`/location/${this.locationId}`);

    //TODO: Add functie if result is null - when form is not correct
  }
}
