import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AbonnementModule,
  LocationModule,
  UserModule,
  RegistrationModule,
} from '@client-side/frontend/features';
import { UiModule } from '@client-side/ui';
import { StorageService } from 'libs/frontend/ui/src/lib/storage.services';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    LocationModule,
    UserModule,
    UiModule,
    AbonnementModule,
    RegistrationModule,
  ],
  providers: [StorageService],
  selector: 'client-side-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
}
