import { Route } from '@angular/router';
import { AboutComponent } from '@client-side/ui';
import {
  LocationListComponent,
  LocationDetailComponent,
} from '@client-side/frontend/features';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: LocationListComponent,
  },
  { path: ':id', pathMatch: 'full', component: LocationDetailComponent },
  {
    path: 'about',
    pathMatch: 'full',
    component: AboutComponent,
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
