import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TkIfScreenSizeDirective } from './if-screen-size.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TkIfScreenSizeDirective],
  exports: [TkIfScreenSizeDirective]
})
export class TkScreenSizeModule { }
