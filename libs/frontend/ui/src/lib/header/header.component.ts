import { Component } from '@angular/core';
import { UiService } from '../ui.services';
import { IUserCredentials } from '@client-side/shared/api';

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

  constructor(private uiService: UiService) {}

  onSubmit() {
    this.uiService.login(this.loginInfo).subscribe((value) => {
      this.userToken = value.token;
      this.userName = value.name;
      this.loginInfo = { eMail: '', password: '' };
      this.signedIn = true;
      localStorage.setItem('token', value.token);
    });
  }

  logOut() {
    this.signedIn = false;
    this.userToken = null;
    this.userName = null;
    localStorage.removeItem('token');
  }
}
