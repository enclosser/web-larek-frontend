import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { ICardView, TCard, TDictCategoryCard } from '../types';
import {IEvents} from "./base/events";

export class Card<T> extends Component<TCard> implements ICardView {
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _price: HTMLSpanElement;
	protected _category?: HTMLSpanElement;
	protected _description?: HTMLParagraphElement;
	protected _button?: HTMLButtonElement;
	protected _statusBtn: boolean;

	constructor(
		container: HTMLElement,
		events: IEvents,
		protected blockName: string = 'card'
	) {
		super(container);
		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._image = container.querySelector(`.${blockName}__image`);
		this._price = ensureElement<HTMLSpanElement>(`.${blockName}__price`, container);
		this._category = container.querySelector(`.${blockName}__category`);
		this._description = container.querySelector(`.${blockName}__text`) as HTMLParagraphElement;
		this._button = container.querySelector(`.${blockName}__button`);
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set price(value: string) {
		this.setText(this._price, value === null ? 'Бесценно' : `${value} синапсов`);
	}

	set category(value: string) {
		this.setText(this._category, value);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (element) {
			element.src = src;
			if (alt) element.alt = alt;
		}
	}

	protected setCategoryCard(value: string) {
		this.addStyleClass(this._category, TDictCategoryCard.get(value));
	}
}
