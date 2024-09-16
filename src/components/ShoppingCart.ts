import { Component } from './base/Component';
import { createElement, ensureElement } from '../utils/utils';
import { IShoppingCartView, TShopCartActions, TShoppingCart } from '../types';

export class ShoppingCart
	extends Component<TShoppingCart>
	implements IShoppingCartView
{
	protected _items: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLElement;
	protected _itemIndex: HTMLElement;

	constructor(container: HTMLElement, actions: TShopCartActions) {
		super(container);

		// Инициализация элементов корзины с проверками на наличие
		this._items = ensureElement<HTMLElement>('.basket__list', container);
		this._price = ensureElement<HTMLElement>('.basket__price', container);
		this._button = ensureElement<HTMLElement>('.basket__button', container);
		this._itemIndex = container.querySelector('.basket__item-index');

		// Установка пустого состояния для корзины
		this.setItems([]);

		// Добавление обработчика на кнопку, если она существует
		if (this._button && actions.onClick) {
			this._button.addEventListener('click', actions.onClick);
		}
	}

	// Установка элементов корзины
	set items(items: HTMLElement[]) {
		// Обновляем состояние кнопки заказа в зависимости от количества товаров
		this._updateOrderButtonState(items.length);
		this.setItems(items);
		this._updateOrderIndex(); // Обновляем индексы после изменения товаров

	}

	// Вспомогательный метод для замены элементов корзины
	private setItems(items: HTMLElement[]): void {
		if (items.length) {
			this._items.replaceChildren(...items);
		} else {
			this._items.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Ваша Корзина пуста!',
				})
			);
		}
	}

	// Установка цены
	set price(price: number) {
		this.setText(this._price, `${price} синапсов`);
	}

	// Защищенный метод для обновления индексов элементов корзины
	protected _updateOrderIndex(): void {
		const orderedList = this.container.querySelectorAll('.basket__item-index');
		orderedList.forEach((item, idx) => this.setText(item, idx + 1));
	}


	// Защищенный метод для обновления состояния кнопки заказа
	protected _updateOrderButtonState(itemCount: number): void {
		this.setDisabled(this._button, itemCount <= 0);
	}

}
