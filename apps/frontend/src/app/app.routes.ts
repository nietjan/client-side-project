import { Route } from '@angular/router';
import { AboutComponent } from '@client-side/ui';
import { UserListComponent } from '@client-side/frontend/features';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: UserListComponent,
  },
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
