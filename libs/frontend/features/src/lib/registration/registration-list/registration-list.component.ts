import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IAbonnement,
  IAddress,
  ILocation,
  IRegistration,
  IRegistrationInfo,
  IUser,
  ROLE,
} from '@client-side/shared/api';
import { Subscription, lastValueFrom } from 'rxjs';
import { LocationService } from '../../location/location.services';
import { AbonnementService } from '../../abonnement/abonnement.services';
import { StorageService } from 'libs/frontend/ui/src/lib/storage.services';
import { RegistrationService } from '../registration.services';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.services';

@Component({
  selector: 'client-side-project-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css'],
})
export class RegistrationListComponent implements OnInit, OnDestroy {
  registrationSubscription: Subscription | undefined = undefined;
  roleSubscription: Subscription | undefined = undefined;
  registrationList: IRegistrationInfo[] = [];
  emtpyApiResponse: boolean = false;
  canDelete: boolean = false;

  showUserRegistrationInfo: boolean = false;
  showLocationRegistrationInfo: boolean = false;
  showAbonnementRegistrationInfo: boolean = false;

  constructor(
    private registrationService: RegistrationService,
    private locationService: LocationService,
    private abonnementSerice: AbonnementService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //check if it is for user, location or abonnement or everything
    const route = this.router.url;
    if (route.includes('user')) {
      //show everything but user info
      this.showLocationRegistrationInfo = true;
      this.showAbonnementRegistrationInfo = true;
    } else if (route.includes('location')) {
      //show everything but location info
      this.showUserRegistrationInfo = true;
      this.showAbonnementRegistrationInfo = true;
    } else if (route.includes('abonnement')) {
      //show everything but abonnement info
      this.showUserRegistrationInfo = true;
      this.showLocationRegistrationInfo = true;
    } else {
      //show everything
      this.showUserRegistrationInfo = true;
      this.showLocationRegistrationInfo = true;
      this.showAbonnementRegistrationInfo = true;
    }

    const ids = this.setupForRegistrationsList();
    this.fillList(ids[0], ids[1], ids[2]);
  }

  //setup for filling list
  private setupForRegistrationsList(): (string | null)[] {
    let userId: string | null = null;
    let locationId: string | null = null;
    let abonnementId: string | null = null;
    let paramId: string | null = null;

    //get id of param
    this.route.paramMap?.subscribe((params) => {
      paramId = params.get('id');
    });

    //fill data for method
    if (this.showUserRegistrationInfo == false) {
      //get registrations of User
      userId = paramId;

      //if id is same as id of localStorage than user can delete
      if (userId == localStorage.getItem('id')) {
        this.canDelete = true;
      }
    } else if (this.showLocationRegistrationInfo == false) {
      //get registrations of location
      locationId = paramId;
    } else if (this.showAbonnementRegistrationInfo == false) {
      //get registrations of abonnement
      abonnementId = paramId;
    }

    return [userId, locationId, abonnementId];
  }

  //fill registration list
  private async fillList(
    userId: string | null,
    locationId: string | null,
    abonnementId: string | null
  ) {
    this.registrationSubscription = this.registrationService
      .getRegistrations(userId, locationId, abonnementId)
      .subscribe((results) => {
        results = results as IRegistration[] | null;

        if (results?.length == 0 || results == null)
          this.emtpyApiResponse = true;

        console.log(`results: ${results}`);
        results?.forEach(async (value) => {
          this.registrationList.push(await this.fillObject(value));
        });
      });
  }

  //fill a registrationInfo object
  private async fillObject(
    registration: IRegistration
  ): Promise<IRegistrationInfo> {
    let user: { name: string; _id: string } | null = null;
    let location: {
      _id: string;
      street: string;
      homeNumber: string;
      postalCode: string;
      city: string;
    } | null = null;
    let abonnement: { name: string; _id: string } | null = null;

    //fill user info if needed
    if (this.showUserRegistrationInfo) {
      let userMethod = await this.getUser(registration.userId);
      if (userMethod == null) user = null;
      else {
        user = {
          _id: userMethod._id,
          name: userMethod.name,
        };
      }
    }

    //fill location info if needed
    if (this.showLocationRegistrationInfo) {
      let locationMethod = await this.getLocation(registration.locationId);
      if (locationMethod == null) user = null;
      else {
        location = {
          _id: locationMethod._id,
          street: locationMethod.address.street,
          homeNumber: locationMethod.address.homeNumber,
          postalCode: locationMethod.address.postalCode,
          city: locationMethod.address.city,
        };
      }
    }

    //fill abonnement info if needed
    if (this.showAbonnementRegistrationInfo) {
      let abonnementMethod = await this.getAbonnement(
        registration.abonnementId
      );
      if (abonnementMethod == null) user = null;
      else {
        abonnement = {
          _id: abonnementMethod._id,
          name: abonnementMethod.name,
        };
      }
    }

    return {
      registration: registration,
      user: user,
      location: location,
      abonnement: abonnement,
    };
  }

  private async getUser(id: string): Promise<IUser | null> {
    return await lastValueFrom(this.userService.singleUser(id));
  }

  private async getLocation(id: string): Promise<ILocation | null> {
    return await lastValueFrom(this.locationService.singleLocation(id));
  }

  private async getAbonnement(id: string): Promise<IAbonnement | null> {
    return await lastValueFrom(this.abonnementSerice.singleAbonnoment(id));
  }

  ngOnDestroy(): void {
    if (this.registrationSubscription)
      this.registrationSubscription.unsubscribe();
  }
}
