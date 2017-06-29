import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TkLazyElDirective } from './lazy-el.directive'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TkLazyElDirective],
  exports: [TkLazyElDirective]
})
export class TkLazyElModule { }
