import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.services';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [UserListComponent],
  providers: [UserService],
  exports: [UserListComponent],
})
export class FeaturesModule {}
