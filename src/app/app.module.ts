import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TkSizeModule, TkImageModule, TkLazyElModule } from '../../';
import { AppComponent } from './app.component';
import { TkDummyComponent } from './dummy.component';

@NgModule({
  declarations: [
    AppComponent,
    TkDummyComponent
  ],
  imports: [
    BrowserModule,
    TkSizeModule,
    TkImageModule,
    TkLazyElModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
