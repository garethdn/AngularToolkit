import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  @ViewChild('myList') myList:ElementRef;

  public title = 'app';
  public list:any[] = [];
  public observerOptions:IntersectionObserverInit;

  ngOnInit() {
    this.observerOptions = {
      root: this.myList.nativeElement
    }
  }

  constructor() {
    for (var i = 0; i < 2000; i++) {
      this.list.push(i);
    }
  }

}
