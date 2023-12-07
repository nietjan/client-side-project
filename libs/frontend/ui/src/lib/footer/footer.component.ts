import { Component } from '@angular/core';
import { UiService } from '../ui.services';
import { IUserCredentials, ROLE } from '@client-side/shared/api';
import { StorageService } from '../storage.services';
import { UserService } from '@client-side/frontend/features';
import { Subscription } from 'rxjs';

@Component({
  selector: 'client-side-project-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent {}
