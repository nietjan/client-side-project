import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UiService } from './ui.services';
import { StorageService } from './storage.services';
import { UserModule } from '@client-side/frontend/features';
import { HeadersInterceptor } from '@client-side/frontend/common';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  declarations: [AboutComponent, HeaderComponent, SpinnerComponent],
  providers: [
    UiService,
    StorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  exports: [SpinnerComponent, HeaderComponent],
})
export class UiModule {}
