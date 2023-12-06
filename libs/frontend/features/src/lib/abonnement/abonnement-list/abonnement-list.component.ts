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

@Component({
  selector: 'client-side-project-abonnement-list',
  templateUrl: './abonnement-list.component.html',
  styleUrls: ['./abonnement-list.component.css'],
})
export class AbonnementListComponent implements OnInit, OnDestroy {
  //Input is only needed if the list is only for 1 location, instead of all

  //TODO: vrewijer string[] want dat is stranks niet nodig, want er moet met het id een api call gedaan worden
  @Input() locationId: string | undefined | null;
  abonnoments: IAbonnement[] | null = null;
  abonnementSubscription: Subscription | undefined = undefined;
  roleSubscription: Subscription | undefined = undefined;
  userIdSubscription: Subscription | undefined = undefined;
  favoriteId: string | undefined = undefined;

  isEmployee: boolean = false;
  abonnementRegistration: Map<string, boolean> = new Map<string, boolean>();

  constructor(
    private abonnementService: AbonnementService,
    private storageService: StorageService,
    private registrationService: RegistrationService
  ) {
    //check if only abonnement from 1 location of all
    if (this.locationId != undefined && this.locationId != null) {
      this.abonnementSubscription = this.abonnementService
        .allAbonnementsFromLocation(this.locationId)
        .subscribe((results) => {
          this.abonnoments = results;
          this.checkIfAbonnementsAreRegisterd();
        });

      this.abonnementService
        .favoriteAbonnementFromLocation(this.locationId)
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
  }

  ngOnInit(): void {
    //set if user can create new
    this.roleSubscription = this.storageService
      .getRole()
      .subscribe((result) => {
        console.log(result);
        if (result == ROLE.EMPLOYEE) {
          this.isEmployee = true;
        } else {
          this.isEmployee = false;
        }
      });
  }

  checkIfAbonnementsAreRegisterd() {
    //check only when in list of locations
    if (this.locationId == null || this.locationId == undefined) return;

    this.userIdSubscription = this.storageService
      .getUserId()
      .subscribe((value) => {
        if (value == null) return;

        //check if for each abonnement if user has a registration
        this.abonnoments?.forEach((abonnement) => {
          this.registrationService
            .getRegistrations(value, this.locationId!, abonnement._id)
            .subscribe((registration) => {
              if (registration != null && registration.length != 0) {
                this.abonnementRegistration.set(
                  registration[0].abonnementId,
                  true
                );
              }
            });
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
