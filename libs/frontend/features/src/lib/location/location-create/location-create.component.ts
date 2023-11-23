import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.services';
import { AbonnementService } from '@client-side/frontend/features';
import {
  ILocation,
  ICreateLocation,
  IAbonnement,
} from '@client-side/shared/api';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'client-side-project-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css'],
})
export class LocationCreateComponent implements OnInit {
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
    abonnements: [],
  };

  //multiselect drop down
  dropdownList: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  allAbonnements: IAbonnement[] = [];
  dropDownValues: any[] = [];

  constructor(
    private locationService: LocationService,
    private abonnementService: AbonnementService,
    private router: Router
  ) {
    abonnementService.allAbonnements().subscribe((value) => {
      if (value != null) {
        this.allAbonnements = value;
      }
    });
  }

  ngOnInit() {
    this.allAbonnements.forEach((element) => {
      this.dropdownList.push({
        id: element.id,
        text: `${element.name} - €${element.price} - ${element.period} months`,
      });
    });

    this.dropdownSettings = {
      singleSelection: false,
      noDataAvailablePlaceholderText: 'No abonnements available',
      textField: 'text',
      enableCheckAll: false,
      allowSearchFilter: false,
    };
  }

  addAbonnementToLocation(abonnement: IAbonnement) {
    this.location.abonnements.push(abonnement.id);
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

  //multiselect
  onItemSelect(item: any) {
    this.location.abonnements.push(item.id);
  }

  OnItemDeselect(item: any) {
    this.location.abonnements = this.location.abonnements.filter(
      (str) => str !== item.id
    );
  }
}
