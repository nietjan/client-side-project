import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocationModule, UserModule } from '@client-side/frontend/features';

@Component({
  standalone: true,
  imports: [RouterModule, LocationModule, UserModule],
  selector: 'client-side-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
}
