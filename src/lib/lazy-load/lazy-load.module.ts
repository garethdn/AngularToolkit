import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TkLazyBgImgModule } from './image/lazy-bg-img/lazy-bg-img.module';
import { TkLazyElModule } from './element/lazy-el.module';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [TkLazyBgImgModule, TkLazyElModule]
})
export class TkLazyLoadModule { }
