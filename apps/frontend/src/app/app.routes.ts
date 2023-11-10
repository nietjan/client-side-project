import { Route } from '@angular/router';
import { AboutComponent } from '@client-side/ui';

export const appRoutes: Route[] = [
  {
    path: '',
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
