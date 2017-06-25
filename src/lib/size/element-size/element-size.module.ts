import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TkIfElementSizeDirective } from './if-element-size.directive'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TkIfElementSizeDirective],
  exports: [TkIfElementSizeDirective]
})
export class TkElementSizeModule { }
