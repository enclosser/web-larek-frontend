import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';
import { ISuccessView, TSuccessForm } from '../types';
import {IEvents} from "./base/events";

export class Success extends Component<TSuccessForm> implements ISuccessView {
    protected _close: HTMLElement;
    protected _totalPrice: HTMLParagraphElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container);

        this._totalPrice = ensureElement<HTMLParagraphElement>(
            '.order-success__description',
            container
        );

        this._close = ensureElement<HTMLElement>(
            '.order-success__close',
            container
        );

        this._close.addEventListener('click', () => {
            events.emit('success:close');
        });
    }

    set totalPrice(value: number) {
        this.setText(this._totalPrice, `Списано ${value} синапсов`);
    }
}
