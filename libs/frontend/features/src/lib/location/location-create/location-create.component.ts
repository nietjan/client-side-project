import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.services';
import { AbonnementService } from '@client-side/frontend/features';
import {
  ILocation,
  ICreateLocation,
  IAbonnement,
  ROLE,
} from '@client-side/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { StorageService } from 'libs/frontend/ui/src/lib/storage.services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'client-side-project-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css'],
})
export class LocationCreateComponent implements OnInit {
  isUpdating: boolean = false;
  roleSubscription: Subscription | undefined = undefined;
  canCreateNew: boolean = false;

  location: ILocation = {
    _id: '',
    eMail: '',
    phoneNumber: '',
    hasTrainers: true,
    openingsTime: '00:00',
    closingTime: '23:59',
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
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
    //if in param there is id, than it is a update
    this.route.paramMap?.subscribe((params) => {
      let id = params.get('id');
      if (id != null) {
        this.isUpdating = true;
        this.locationService.singleLocation(id).subscribe((value) => {
          console.log(value);
          this.location = { ...this.location, ...value };
        });
      }

      //fill list only after it is sure that it is updating or creating
      this.fillAbonnementList();
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

  fillAbonnementList() {
    this.abonnementService.allAbonnements().subscribe((value) => {
      if (value != null) {
        this.allAbonnements = value;
        let list: any[] = [];
        let selected: any[] = [];
        this.allAbonnements.forEach((element) => {
          list.push({
            id: element._id,
            text: this.formatAbonnementString(element),
          });

          if (this.location.abonnements.find((id) => id === element._id)) {
            selected.push({
              id: element._id,
              text: this.formatAbonnementString(element),
            });
          }
        });

        this.dropdownList = list;
        this.dropDownValues = selected;
      }
    });
  }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      noDataAvailablePlaceholderText: 'No abonnements available',
      textField: 'text',
      enableCheckAll: false,
      allowSearchFilter: false,
    };
  }

  public onSubmit(): void {
    //if not allowed redirect
    if (!this.canCreateNew) {
      this.router.navigateByUrl('/location');
    }

    if (this.isUpdating) {
      this.locationService.updateLocation(this.location).subscribe((value) => {
        this.router.navigateByUrl(`/location/${this.location._id}`);
      });
    } else {
      this.locationService.createLocation(this.location).subscribe((value) => {
        this.router.navigateByUrl(`/location/${value._id}`);
      });
    }
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

  formatAbonnementString(abonnement: IAbonnement): string {
    return `${abonnement.name} - €${abonnement.price} - ${abonnement.period} months`;
  }
}
