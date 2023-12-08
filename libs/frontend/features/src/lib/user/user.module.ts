import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.services';
import { UserCreateComponent } from './user-create/user-create.component';
import { FormsModule } from '@angular/forms';
import { EmployeeGuard, UiModule } from '@client-side/ui';
import { SharedModule } from '../shared.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { RouterModule, Routes, mapToCanActivate } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserListComponent,
    canActivate: mapToCanActivate([EmployeeGuard]),
  },
  {
    path: 'create',
    pathMatch: 'full',
    component: UserCreateComponent,
  },
  {
    path: ':id/update',
    pathMatch: 'full',
    component: UserCreateComponent,
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: UserDetailComponent,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [UserListComponent, UserCreateComponent, UserDetailComponent],
  providers: [UserService],
  exports: [UserListComponent],
})
export class UserModule {}
