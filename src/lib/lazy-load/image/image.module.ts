import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TkLazyBgImgModule } from './lazy-bg-img/lazy-bg-img.module'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [TkLazyBgImgModule]
})
export class TkImageModule { }
