import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UiService } from './ui.services';
import { FooterComponent } from './footer/footer.component';
import { HeadersInterceptor } from '@client-side/frontend/common';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  declarations: [
    AboutComponent,
    HeaderComponent,
    SpinnerComponent,
    FooterComponent,
  ],
  providers: [
    UiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  exports: [SpinnerComponent, HeaderComponent, FooterComponent],
})
export class UiModule {}
