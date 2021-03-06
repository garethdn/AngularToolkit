import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TkScreenSizeModule } from './screen-size/screen-size.module';
import { TkElementSizeModule } from './element-size/element-size.module';

@NgModule({
  imports: [
    CommonModule,
    TkScreenSizeModule,
    TkElementSizeModule
  ],
  declarations: [],
  exports: [TkScreenSizeModule, TkElementSizeModule]
})
export class TkSizeModule { }
