import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.services';
import { LocationListComponent } from './location/location-list/location-list.component';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  declarations: [UserListComponent, LocationListComponent],
  providers: [UserService],
  exports: [UserListComponent],
})
export class FeaturesModule {}
