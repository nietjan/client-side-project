import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.services';
import { UserCreateComponent } from './user-create/user-create.component';
import { FormsModule } from '@angular/forms';
import { UiModule } from '@client-side/ui';
import { SharedModule } from '../shared.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { Routes } from '@angular/router';

const routes: Routes = [
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
  imports: [SharedModule],
  declarations: [UserListComponent, UserCreateComponent, UserDetailComponent],
  providers: [UserService],
  exports: [UserListComponent],
})
export class UserModule {}
