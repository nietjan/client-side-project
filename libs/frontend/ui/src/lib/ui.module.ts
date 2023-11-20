import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [AboutComponent, HeaderComponent, SpinnerComponent],
  exports: [AboutComponent, HeaderComponent, SpinnerComponent],
})
export class UiModule {}
