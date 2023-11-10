import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeaturesModule } from '@client-side/frontend/features';

@Component({
  standalone: true,
  imports: [RouterModule, FeaturesModule],
  selector: 'client-side-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend';
}
