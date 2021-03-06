import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'tk-dummy',
    template: `
        <h1>{{index}}: Dummy</h1>
    `,
    styles: [`
        :host {
            border: 3px dashed red;
            height: 300px;
            width: 80%;
            display: block;
        }
    `]
})
export class TkDummyComponent implements OnInit, OnDestroy {

    @Input() index:number;

    ngOnInit() {
        console.info(`Init index: ${this.index}`);
    }

    ngOnDestroy() {
        console.info(`Destroying index: ${this.index}`);
    }
}
