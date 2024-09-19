import {Component} from './base/Component';
import {ensureElement, toggleClass} from '../utils/utils';
import {IPageView, TPage, TPageActions, TUpdateCounter} from '../types';
import {IEvents} from "./base/events";

export class Page extends Component<TPage> implements IPageView {
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _card: HTMLElement;
	protected _cardCounter: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);

		// Инициализация элементов с помощью ensureElement
		this._catalog = ensureElement<HTMLElement>('.gallery', container);
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper', container);
		this._card = ensureElement<HTMLElement>('.header__basket', container);
		this._cardCounter = ensureElement<HTMLElement>('.header__basket-counter', container);

		// Добавление обработчика клика на корзину, если он существует
		this._card.addEventListener('click', () => {
			events.emit('card:click');
		});

		events.on('catalog:update', (items: HTMLElement[]) => {
			this._catalog.replaceChildren(...items);
		});

		events.on('card:updateCounter', (payload: TUpdateCounter) => {
			this.setText(this._cardCounter, payload.count);
		});

		events.on('modal:open', () => {
			toggleClass(this._wrapper, 'page__wrapper_locked', true)
		});
		events.on('modal:close', () => {
			toggleClass(this._wrapper, 'page__wrapper_locked', false)
		});
	}
}
