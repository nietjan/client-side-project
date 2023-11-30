import { Component } from '@angular/core';

@Component({
  selector: 'client-side-project-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  //for collapsing navbar
  isCollapsed: boolean = true;
  signedIn: boolean = true;

  loginInfo: { eMail: string; password: string } = { eMail: '', password: '' };

  onSubmit() {
    this.signedIn = true;
  }

  logOut() {
    this.signedIn = false;
  }
}
