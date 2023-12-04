import { Route } from '@angular/router';
import { AboutComponent } from '@client-side/ui';
import {
  LocationListComponent,
  LocationDetailComponent,
  LocationCreateComponent,
  AbonnementListComponent,
  AbonnementCreateComponent,
  RegistrationListComponent,
} from '@client-side/frontend/features';
import { UserCreateComponent } from 'libs/frontend/features/src/lib/user/user-create/user-create.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'location',
  },
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent,
  },
  {
    path: 'location',
    pathMatch: 'full',
    component: LocationListComponent,
  },
  {
    path: 'location/create',
    pathMatch: 'full',
    component: LocationCreateComponent,
  },
  {
    path: 'location/:id/update',
    pathMatch: 'full',
    component: LocationCreateComponent,
  },
  {
    path: 'location/:id/registration',
    pathMatch: 'full',
    component: RegistrationListComponent,
  },
  {
    path: 'location/:id',
    pathMatch: 'full',
    component: LocationDetailComponent,
  },
  {
    path: 'abonnement',
    pathMatch: 'full',
    component: AbonnementListComponent,
  },
  {
    path: 'abonnement/create',
    pathMatch: 'full',
    component: AbonnementCreateComponent,
  },
  {
    path: 'abonnement/:id/update',
    pathMatch: 'full',
    component: AbonnementCreateComponent,
  },
  {
    path: 'abonnement/:id/registration',
    pathMatch: 'full',
    component: RegistrationListComponent,
  },
  {
    path: 'user/create',
    pathMatch: 'full',
    component: UserCreateComponent,
  },
  {
    path: 'user/:id/registration',
    pathMatch: 'full',
    component: RegistrationListComponent,
  },
];
