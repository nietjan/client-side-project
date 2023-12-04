import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IAbonnement,
  ILocation,
  IRegistration,
  IRegistrationInfo,
  IUser,
  ROLE,
} from '@client-side/shared/api';
import { Subscription } from 'rxjs';
import { LocationService } from '../../location/location.services';
import { AbonnementService } from '../../abonnement/abonnement.services';
import { StorageService } from 'libs/frontend/ui/src/lib/storage.services';
import { RegistrationService } from '../registration.services';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.services';

@Component({
  selector: 'client-side-project-registration-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class RegistrationListComponent implements OnInit, OnDestroy {
  registrationSubscription: Subscription | undefined = undefined;
  roleSubscription: Subscription | undefined = undefined;
  registrationList: IRegistrationInfo[] = [];

  showUserRegistrationInfo: boolean = false;
  showLocationRegistrationInfo: boolean = false;
  showAbonnementRegistrationInfo: boolean = false;

  constructor(
    private registrationService: RegistrationService,
    private locationService: LocationService,
    private abonnementSerice: AbonnementService,
    private userService: UserService,
    private storageService: StorageService,
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
    let user: IUser | null = null;
    let location: ILocation | null = null;
    let abonnement: IAbonnement | null = null;

    //fill user info if needed
    if (this.showUserRegistrationInfo) {
      this.userService.singleUser(registration.userId).subscribe((value) => {
        user = value;
      });
    }

    //fill location info if needed
    if (this.showLocationRegistrationInfo) {
      this.locationService
        .singleLocation(registration.locationId)
        .subscribe((value) => {
          location = value;
        });
    }

    //fill abonnement info if needed
    if (this.showAbonnementRegistrationInfo) {
      this.abonnementSerice
        .singleAbonnoment(registration.abonnementId)
        .subscribe((value) => {
          abonnement = value;
        });
    }

    return {
      registration: registration,
      user: user,
      location: location,
      abonnement: abonnement,
    };
  }

  ngOnDestroy(): void {
    if (this.registrationSubscription)
      this.registrationSubscription.unsubscribe();
  }
}
