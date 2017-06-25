import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TkSizeModule } from '../';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TkSizeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
