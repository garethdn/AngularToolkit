import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TkLazyBgImgDirective } from './lazy-bg-img.directive'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TkLazyBgImgDirective],
  exports: [TkLazyBgImgDirective]
})
export class TkLazyBgImgModule { }
