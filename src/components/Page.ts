import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';
import { IPageView, TPage, TPageActions, TUpdateCounter } from '../types';

export class Page extends Component<TPage> implements IPageView {
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _cart: HTMLElement;
	protected _cartCounter: HTMLElement;

	constructor(container: HTMLElement, actions: TPageActions) {
		super(container);

		// Инициализация элементов с помощью ensureElement
		this._catalog = ensureElement<HTMLElement>('.gallery', container);
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper', container);
		this._cart = ensureElement<HTMLElement>('.header__basket', container);
		this._cartCounter = ensureElement<HTMLElement>('.header__basket-counter', container);

		// Добавление обработчика клика на корзину, если он существует
		if (actions?.onClick) {
			this._cart.addEventListener('click', actions.onClick);
		}
	}

	// Метод для установки элементов каталога
	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	// Установка счетчика корзины
	set cartCounter(data: TUpdateCounter) {
		this.setText(this._cartCounter, data.count);
	}

	// Блокировка страницы
	set locked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
	}

	// Метод для переключения класса
	private toggleClass(element: HTMLElement, className: string, condition: boolean): void {
		if (condition) element.classList.add(className);
		else element.classList.remove(className);
	}
}
