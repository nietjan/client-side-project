import { Component } from '@angular/core';
import { UiService } from '../ui.services';
import { IUserCredentials, ROLE } from '@client-side/shared/api';
import { StorageService } from '../storage.services';
import { UserService } from '@client-side/frontend/features';
import { Subscription } from 'rxjs';

@Component({
  selector: 'client-side-project-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  //for collapsing navbar
  isCollapsed: boolean = true;
  signedIn: boolean = false;
  userName: string | null = null;
  userId: string | null = null;
  loginInfo: IUserCredentials = { eMail: '', password: '' };
  roleSubscription: Subscription | undefined = undefined;
  userRole: string = '';

  constructor(
    private uiService: UiService,
    private storageService: StorageService // private userService: UserService
  ) {
    const tokenStorage = localStorage.getItem('token');
    if (tokenStorage != null) {
      this.signedIn = true;
      this.userName = localStorage.getItem('name');
      this.userId = localStorage.getItem('id');
    }

    this.roleSubscription = this.storageService
      .getRole()
      .subscribe((result) => {
        if (result == ROLE.EMPLOYEE) {
          this.userRole = 'employee';
        } else {
          this.userRole = 'user';
        }
      });
  }

  onSubmit() {
    this.uiService.login(this.loginInfo).subscribe((value) => {
      console.log(value);
      this.userName = value.name;
      this.loginInfo = { eMail: '', password: '' };
      this.signedIn = true;
      this.userId = value._id;
      localStorage.setItem('role', value.role);
      localStorage.setItem('name', value.name);
      this.storageService.setRole(value.role);
      this.storageService.setUserId(value._id);
      localStorage.setItem('token', value.token);
    });
  }

  logOut() {
    this.userName = null;
    this.userId = null;
    this.signedIn = false;
    localStorage.removeItem('role');
    this.storageService.setRole(ROLE.USER);
    this.storageService.setUserId(null);
    localStorage.removeItem('token');
  }

  public deleteAccount(): void {
    this.uiService.deleteUser();
    this.logOut();
  }
}
