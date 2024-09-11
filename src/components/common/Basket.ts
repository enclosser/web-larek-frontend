import { Component } from "../base/Component";
import { cloneTemplate, createElement, ensureElement, formatNumber } from "../../utils/utils";
import { EventEmitter } from "../base/events";

interface IBasketView {
    items: HTMLElement[];
    total: number;
}

export class Basket extends Component<IBasketView> {
    private _list: HTMLElement;
    private _total: HTMLElement;
    private _button: HTMLElement;

    constructor(container: HTMLElement, private events: EventEmitter) {
        super(container);

        this._list = ensureElement<HTMLElement>('.basket__list', this.container);
        this._total = ensureElement<HTMLElement>('.basket__total', this.container);
        this._button = ensureElement<HTMLElement>('.basket__action', this.container);

        this._button.addEventListener('click', () => events.emit('order:open'));

        this.items = [];
    }

    set items(items: HTMLElement[]) {
        this._list.replaceChildren(...(items.length
                ? items
                : [createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' })]
        ));
    }

    set total(total: number) {
        this.setText(this._total, formatNumber(total));
    }
}
