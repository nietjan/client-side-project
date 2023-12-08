import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  IAbonnement,
  ILocation,
  IRegistration,
  ROLE,
} from '@client-side/shared/api';
import { Subscription, of } from 'rxjs';
import { AbonnementService } from '../abonnement.services';
import { StorageService } from 'libs/frontend/ui/src/lib/storage.services';
import { RegistrationService } from '../../registration/registration.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'client-side-project-abonnement-list',
  templateUrl: './abonnement-list.component.html',
  styleUrls: ['./abonnement-list.component.css'],
})
export class AbonnementListComponent implements OnInit, OnDestroy {
  locationId: string | null = null;
  abonnoments: IAbonnement[] | null = null;
  abonnementSubscription: Subscription | undefined = undefined;
  roleSubscription: Subscription | undefined = undefined;
  userIdSubscription: Subscription | undefined = undefined;
  favoriteId: string | undefined = undefined;
  isEmployee: boolean = false;
  isLoggedIn: boolean = false;

  abonnementRegistration: Map<string, boolean> = new Map<string, boolean>();

  constructor(
    private abonnementService: AbonnementService,
    private storageService: StorageService,
    private registrationService: RegistrationService,
    private route: ActivatedRoute
  ) {
    //get locationId and if null return to /location
    this.route.paramMap.subscribe((params) => {
      this.locationId = params.get('id');
    });
  }

  ngOnInit(): void {
    //if locationId than it is abonnements of location else is all abonnements
    if (this.locationId) {
      //get locationId

      //get abonnements
      this.abonnementSubscription = this.abonnementService
        .allAbonnementsFromLocation(this.locationId!)
        .subscribe((results) => {
          this.abonnoments = results;
          this.checkIfAbonnementsAreRegisterd();
        });

      //get favorite abonnement
      this.abonnementService
        .favoriteAbonnementFromLocation(this.locationId!)
        .subscribe((value) => {
          this.favoriteId = value?._id;
        });
    } else {
      this.abonnementSubscription = this.abonnementService
        .allAbonnements()
        .subscribe((results) => {
          this.abonnoments = results;
        });
    }

    //set if user can create new
    this.roleSubscription = this.storageService
      .getRole()
      .subscribe((result) => {
        if (result == ROLE.EMPLOYEE) {
          this.isEmployee = true;
        } else {
          this.isEmployee = false;
        }
      });
  }

  checkIfAbonnementsAreRegisterd() {
    this.abonnementRegistration = new Map<string, boolean>();
    //check only when in list of locations
    if (this.locationId == null || this.locationId == undefined) return;

    this.userIdSubscription = this.storageService
      .getUserId()
      .subscribe((value) => {
        this.abonnementRegistration = new Map<string, boolean>();
        if (value == null) {
          this.isLoggedIn = false;
          return;
        }
        this.isLoggedIn = true;

        //check if for each abonnement if user has a registration
        this.registrationService
          .getRegistrations(value, this.locationId!, null)
          .subscribe((registration) => {
            console.log(registration);
            if (registration != null && registration.length != 0) {
              registration.forEach((value) => {
                this.abonnementRegistration.set(value.abonnementId, true);
              });
            }
          });
      });
  }

  delete(id: string): void {
    this.abonnementService.removeAbonnement(id);

    //set abonnements again
    this.abonnementSubscription = this.abonnementService
      .allAbonnements()
      .subscribe((results) => {
        this.abonnoments = results;
      });
  }

  ngOnDestroy(): void {
    if (this.abonnementSubscription) this.abonnementSubscription.unsubscribe();
    if (this.roleSubscription) this.roleSubscription.unsubscribe();
    if (this.userIdSubscription) this.userIdSubscription.unsubscribe();
  }

  register(abonnementId: string) {
    //can only register when on schreen of location
    if (!this.locationId) {
      return;
    }

    this.registrationService
      .createRegistration({
        locationId: this.locationId,
        abonnementId: abonnementId,
      })
      .subscribe((value) => {
        this.abonnementRegistration.set(value.abonnementId, true);
      });
  }

  deregister(abonnementId: string) {
    //can only register when on schreen of location
    if (!this.locationId) {
      return;
    }

    this.registrationService.removeRegistration(this.locationId, abonnementId);
    this.abonnementRegistration.delete(abonnementId);
  }

  //check if abonnement is registerd
  isRegisterd(abonnementId: string): boolean {
    let result = this.abonnementRegistration.get(abonnementId);
    if (result == undefined) return false;
    return result;
  }
}
