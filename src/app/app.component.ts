import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public title = 'app';
  public list:any[] = [];

  constructor() {
    for (var i = 0; i < 800; i++) {
      this.list.push(i);
    }
  }

}
