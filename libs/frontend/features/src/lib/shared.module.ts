import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UiModule } from '@client-side/ui';

@NgModule({
  imports: [CommonModule, UiModule],
  exports: [
    CommonModule,
    FormsModule,
    UiModule,
    HttpClientModule,
    RouterModule,
  ],
})
export class SharedModule {}
