import { Component } from '@angular/core';
import { UiService } from '../ui.services';
import { IUserCredentials, role } from '@client-side/shared/api';
import { StorageService } from '../storage.services';

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
  loginInfo: IUserCredentials = { eMail: '', password: '' };

  constructor(
    private uiService: UiService,
    private storageService: StorageService
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
      localStorage.setItem('role', value.role);
      localStorage.setItem('name', value.name);
      this.storageService.setRole(value.role);
      localStorage.setItem('token', value.token);
    });
  }

  logOut() {
    this.userToken = null;
    this.userName = null;
    this.signedIn = false;
    localStorage.removeItem('role');
    this.storageService.setRole(role.USER);
    localStorage.removeItem('token');
  }
}
