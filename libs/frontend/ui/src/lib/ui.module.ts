import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UiService } from './ui.services';
import { StorageService } from './storage.services';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  declarations: [AboutComponent, HeaderComponent, SpinnerComponent],
  providers: [UiService, StorageService],
  exports: [SpinnerComponent, HeaderComponent],
})
export class UiModule {}
