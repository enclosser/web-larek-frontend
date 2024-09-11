import { Component } from "./base/Component";
import { ensureElement } from "../utils/utils";

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export interface ICard<T> {
	id: string;
	image: string;
	price: number | string;
	title: string;
	button: boolean;
	category: string;
	description: string;
	onClick: () => void;
}

export class Card<T> extends Component<ICard<T>> {
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;

	constructor(container: HTMLElement, private actions: ICardActions) {
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
		this._description = ensureElement<HTMLElement>('.card__description', container);
		this._button = ensureElement<HTMLButtonElement>('.card__button', container);
		this._category = ensureElement<HTMLElement>('.card__category', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);

		this._button.addEventListener('click', actions.onClick);
	}

	setCardData({ title, image, price, category, description }: ICard<T>) {
		this.setText(this._title, title);
		this.setImage(this._image, image);
		this.setText(this._description, description);
		this.setText(this._category, category);
		this.setText(this._price, price);
	}

	setButtonState(enabled: boolean) {
		this.setDisabled(this._button, !enabled);
	}
}
