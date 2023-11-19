import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  LocationModule,
  UserModule,
  AbonnementModule,
} from '@client-side/frontend/features';
import { UiModule } from '@client-side/ui';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    LocationModule,
    UserModule,
    UiModule,
    AbonnementModule,
  ],
  selector: 'client-side-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
}
