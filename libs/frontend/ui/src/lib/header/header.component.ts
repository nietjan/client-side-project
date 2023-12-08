import { Component } from '@angular/core';
import { UiService } from '../ui.services';
import {
  ILoginReturnInfo,
  IUserCredentials,
  ROLE,
} from '@client-side/shared/api';
import { StorageService } from '../storage.services';
import { UserService } from '@client-side/frontend/features';
import { Observable, Subscription, catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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
  loginError: string | null = null;
  isEmployee: boolean = false;

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
  }

  onSubmit() {
    this.uiService.login(this.loginInfo).subscribe({
      next: (value) => {
        this.setLoginInfo(value);
      },
      error: (error) => {
        this.handleLoginError(error);
      },
    });
  }

  private setLoginInfo(info: ILoginReturnInfo) {
    this.userName = info.name;
    this.loginInfo = { eMail: '', password: '' };
    this.signedIn = true;
    this.userId = info._id;

    if (info.role == ROLE.EMPLOYEE) {
      this.isEmployee = true;
    } else {
      this.isEmployee = false;
    }

    localStorage.setItem('role', info.role);
    localStorage.setItem('name', info.name);
    this.storageService.setRole(info.role);
    this.storageService.setUserId(info._id);
    localStorage.setItem('token', info.token);

    this.loginError = null;
  }

  logOut() {
    this.userName = null;
    this.userId = null;
    this.signedIn = false;
    localStorage.removeItem('role');
    this.storageService.setRole(ROLE.USER);
    this.storageService.setUserId(null);
    localStorage.removeItem('token');
    this.isEmployee = false;
  }

  public deleteAccount(): void {
    this.uiService.deleteUser();
    this.logOut();
  }

  private handleLoginError(error: HttpErrorResponse) {
    if (error.status == 401) {
      this.loginError = 'E-mail or password is incorrect';
    } else {
      this.loginError = 'Server error, please try again';
    }
  }
}
