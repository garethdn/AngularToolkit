import { Directive, Input, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ElementVisibilityUtils } from '../../../common/element_visibility.utils'

import 'rxjs/add/observable/fromEvent';

@Directive({
    selector: '[tkLazyBgImg]'
})
export class TkLazyBgImgDirective {

    @Input() tkLazyBgImg: string;
    @Input() placeholder: string;

    private _observer: IntersectionObserver;

    constructor(
        private _elRef: ElementRef,
        private _renderer: Renderer2) {

    }

    ngOnInit(): void {
        this._observer = ElementVisibilityUtils.createElementObserver(this._toggleVisibility.bind(this));
        this._observer.observe(this._elRef.nativeElement);
    }

    private _toggleVisibility(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
        entries.forEach(entry => {
            if (entry['isIntersecting']) {
                this._insertBackgroundImage(this.tkLazyBgImg);
                this._observer.disconnect();
            }
            else {
                this._insertBackgroundImage(this.placeholder)
            }
        });
    }

    private _insertBackgroundImage(src: string) {
        this._renderer.setStyle(this._elRef.nativeElement, 'backgroundImage', src);
        // let img = new Image();

        // Observable.fromEvent(img, 'load').subscribe(res => {
        //     this._renderer.setStyle(this._elRef.nativeElement, 'backgroundImage', src);
        // });

        // img.src = src;
    }

    ngOnDestroy(): void {
        this._observer.disconnect();
    }

}
