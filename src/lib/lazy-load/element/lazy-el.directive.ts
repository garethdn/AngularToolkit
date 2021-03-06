import { Directive, Input, TemplateRef, ElementRef, ViewContainerRef, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ElementVisibilityUtils } from '../../common/element_visibility.utils'

import 'rxjs/add/observable/fromEvent';

@Directive({
    selector: '[tkLazyEl]'
})
export class TkLazyElDirective implements OnInit {

    @Input() tkLazyEl: IntersectionObserverInit = {};
    @Input('tkLazyElDestroy') destroyOnHidden: boolean = false;

    private _observer: IntersectionObserver;
    private _hasView: boolean = false;
    private _observerSupported = window['IntersectionObserver'];
    private _defaultOptions:IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    }

    constructor(
        private _templateRef: TemplateRef<any>,
        private _viewContainer: ViewContainerRef,
        private _elRef: ElementRef,
        private _chRef: ChangeDetectorRef) {

    }

    ngOnInit() {
        Object.assign(this._defaultOptions, this.tkLazyEl);

        if (this._observerSupported) {
            this._observer = ElementVisibilityUtils.createElementObserver(this._toggle.bind(this), this._defaultOptions);
            this._observer.observe(this._elRef.nativeElement.parentElement);
        }
        else {
            this._embedView();
        }
    }

    private _toggle(entries: IntersectionObserverEntry[], observer: IntersectionObserver): void {
        entries.forEach(e => {
            if (e['isIntersecting'] && !this._hasView) {
                this._embedView();
                this._chRef.markForCheck();
                this._chRef.detectChanges();

                if (!this.destroyOnHidden) {
                    this._observer.disconnect();
                }
            }
            else if (!e['isIntersecting'] && this._hasView && this.destroyOnHidden) {
                this._clearView();
                this._chRef.detectChanges();
            }
        })
    }

    private _embedView(): void {
        this._viewContainer.createEmbeddedView(this._templateRef);
        this._hasView = true;
    }

    private _clearView(): void {
        this._viewContainer.clear();
        this._hasView = false;
    }

    ngOnDestroy(): void {
        this._observer.disconnect();
    }

}
