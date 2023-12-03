import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.services';
import { UserCreateComponent } from './user-create/user-create.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, HttpClientModule, FormsModule],
  declarations: [UserListComponent, UserCreateComponent],
  providers: [UserService],
  exports: [UserListComponent],
})
export class UserModule {}
