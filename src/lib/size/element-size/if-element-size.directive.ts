import { Directive, Input, TemplateRef, ViewContainerRef, NgZone, OnDestroy, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Directive({
    selector: '[tkIfElementSize]'
})
export class TkIfElementSizeDirective implements OnDestroy, OnChanges {

    private _hasView: boolean = false;
    private _lessThan: number;
    private _greatherThan: number;
    private _resizeSubscription: Subscription;
    private _closestAncestorSelector:string;

    constructor(
        private _templateRef: TemplateRef<any>,
        private _viewContainer: ViewContainerRef,
        private _elRef:ElementRef,
        private _zone: NgZone) {

        this._subscribeToWindowResize();
    }

    ngOnChanges(changes: SimpleChanges):void {
        if ('tkIfElementSize' in changes) {
            this._greatherThan = changes['tkIfElementSize'].currentValue;
        }

        if ('tkIfElementSizeLt' in changes) {
            this._lessThan = changes['tkIfElementSizeLt'].currentValue;
        }

        this._toggle();
    }

    get closest():Element {
        let parentEl = (<HTMLElement>this._elRef.nativeElement).parentElement;

        return this._closestAncestorSelector ?
            parentEl.closest(this._closestAncestorSelector) :
            parentEl;
    }

    @Input() set tkIfElementSizeLt(size: number) {
        this._lessThan = size;
    }

    @Input() set tkIfElementSize(size: number) {
        this._greatherThan = size;
    }

    @Input() set tkIfElementSizeEl(selector:string) {
        this._closestAncestorSelector = selector;
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
        if (this._isValidSize() && !this._hasView) {
            this._embedView();
        } else if (!this._isValidSize() && this._hasView) {
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

    private _isValidSize(): boolean {
        return this.closest.clientWidth > this._greatherThan && (this._lessThan ? (this.closest.clientWidth < this._lessThan) : true);
    }

    ngOnDestroy(): void {
        this._resizeSubscription.unsubscribe();
    }

}
