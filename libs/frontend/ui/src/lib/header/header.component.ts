import { Component } from '@angular/core';
import { UiService } from '../ui.services';
import { IUserCredentials, ROLE } from '@client-side/shared/api';
import { StorageService } from '../storage.services';
import { UserService } from '@client-side/frontend/features';

@Component({
  selector: 'client-side-project-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  //for collapsing navbar
  isCollapsed: boolean = true;
  signedIn: boolean = false;
  userToken: string | null = null;
  userName: string | null = null;
  userId: string | null = null;
  loginInfo: IUserCredentials = { eMail: '', password: '' };

  constructor(
    private uiService: UiService,
    private storageService: StorageService,
    private userService: UserService
  ) {
    const tokenStorage = localStorage.getItem('token');
    if (tokenStorage != null) {
      this.signedIn = true;
      this.userName = localStorage.getItem('name');
    }
  }

  onSubmit() {
    this.uiService.login(this.loginInfo).subscribe((value) => {
      this.userToken = value.token;
      this.userName = value.name;
      this.loginInfo = { eMail: '', password: '' };
      this.signedIn = true;
      this.userId = value._id;
      localStorage.setItem('role', value.role);
      localStorage.setItem('name', value.name);
      this.storageService.setRole(value.role);
      localStorage.setItem('token', value.token);
    });
  }

  logOut() {
    this.userToken = null;
    this.userName = null;
    this.userId = null;
    this.signedIn = false;
    localStorage.removeItem('role');
    this.storageService.setRole(ROLE.USER);
    localStorage.removeItem('token');
  }

  public deleteAccount(): void {
    this.userService.removeUser(this.userId);
    this.logOut();
  }
}
