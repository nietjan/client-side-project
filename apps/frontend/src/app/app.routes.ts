import { Route, mapToCanActivate } from '@angular/router';
import { AboutComponent, EmployeeGuard } from '@client-side/ui';

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
    loadChildren: () =>
      import(
        '../../../../libs/frontend/features/src/lib/location/location.module'
      ).then((m) => m.LocationModule),
  },
  {
    path: 'abonnement',
    loadChildren: () =>
      import(
        '../../../../libs/frontend/features/src/lib/abonnement/abonnement.module'
      ).then((m) => m.AbonnementModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import(
        '../../../../libs/frontend/features/src/lib/user/user.module'
      ).then((m) => m.UserModule),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import(
        '../../../../libs/frontend/features/src/lib/registration/registration.modules'
      ).then((m) => m.RegistrationModule),
  },
];
