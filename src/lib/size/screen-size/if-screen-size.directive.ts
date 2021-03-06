import { Directive, Input, TemplateRef, ViewContainerRef, NgZone, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Directive({
    selector: '[tkIfScreenSize]'
})
export class TkIfScreenSizeDirective implements OnDestroy, OnChanges {

    private _hasView: boolean = false;
    private _lessThan: number;
    private _greatherThan: number;
    private _resizeSubscription: Subscription;

    constructor(
        private _templateRef: TemplateRef<any>,
        private _viewContainer: ViewContainerRef,
        private _zone: NgZone) {

        this._subscribeToWindowResize();
    }

    ngOnChanges(changes: SimpleChanges):void {
        if ('tkIfScreenSize' in changes) {
            this._greatherThan = changes['tkIfScreenSize'].currentValue;
        }

        if ('tkIfScreenSizeLt' in changes) {
            this._lessThan = changes['tkIfScreenSizeLt'].currentValue;
        }

        this._toggle();
    }

    @Input() set tkIfScreenSizeLt(size: number) {
        this._lessThan = size;
    }

    @Input() set tkIfScreenSize(size: number) {
        this._greatherThan = size;
    }

    private _subscribeToWindowResize(): void {
        this._zone.runOutsideAngular(() => {
            this._resizeSubscription = Observable
                .fromEvent(window, 'resize')
                .debounceTime(200)
                .subscribe(this._toggle.bind(this))
        });
    }

    private _toggle(): void {
        if (this._doesFitInWindowBounds() && !this._hasView) {
            this._embedView();
        } else if (!this._doesFitInWindowBounds() && this._hasView) {
            this._clearView();
        }
    }

    private _embedView():void {
        this._zone.run(() => {
            this._viewContainer.createEmbeddedView(this._templateRef);
            this._hasView = true;
        });
    }

    private _clearView():void {
        this._zone.run(() => {
            this._viewContainer.clear();
            this._hasView = false;
        });        
    }

    private _doesFitInWindowBounds(): boolean {
        return (window.innerWidth > this._greatherThan) && (this._lessThan ? (window.innerWidth < this._lessThan) : true);
    }

    ngOnDestroy(): void {
        this._resizeSubscription.unsubscribe();
    }

}
