import { Route } from '@angular/router';
import { AboutComponent } from '@client-side/ui';
import {
  LocationListComponent,
  LocationDetailComponent,
  LocationCreateComponent,
} from '@client-side/frontend/features';

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
    path: 'location/:id',
    pathMatch: 'full',
    component: LocationDetailComponent,
  },
  //   {
  //     path: '',
  //     pathMatch: 'full',
  //     redirectTo: '/list',
  //   },
  //   {
  //     path: 'list',
  //     pathMatch: 'full',
  //     component: MealListComponent,
  //   },
];
