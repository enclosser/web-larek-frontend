import {Component} from './base/Component';
import {cloneTemplate, createElement, ensureElement} from '../utils/utils';
import {ICartItem, IOrderPriceEvent, IShoppingCartView, TShopCartActions, TShoppingCart} from '../types';
import {IEvents} from "./base/events";
import {Card as CartItem} from "./Card";

export class ShoppingCart
	extends Component<TShoppingCart>
	implements IShoppingCartView {
	protected _items: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLElement;
	protected _itemIndex: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);

		// Инициализация элементов корзины с проверками на наличие
		this._items = ensureElement<HTMLElement>('.basket__list', container);
		this._price = ensureElement<HTMLElement>('.basket__price', container);
		this._button = ensureElement<HTMLElement>('.basket__button', container);
		this._itemIndex = container.querySelector('.basket__item-index');

		// Установка пустого состояния для корзины
		this.setItems([]);

		// Добавление обработчика на кнопку, если она существует
		if (this._button) {
			this._button.addEventListener('click',
				() => {
					events.emit('shoppingcard:click')
				});
		}

		events.on('shoppingcard:price:update', (payload: IOrderPriceEvent) => {
			this.setText(this._price, `${payload.price} синапсов`);
			this._updateOrderButtonState(payload.price); // Обновляем состояние кнопки заказа
		})

		events.on('shoppingcard:items:update', (shoppingCardItems: HTMLElement[]) => {
			this.setItems(shoppingCardItems);
			this._updateOrderIndex(); // Обновляем индексы после изменения товаров
		})
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

	// Защищенный метод для обновления индексов элементов корзины
	protected _updateOrderIndex(): void {
		const orderedList = this.container.querySelectorAll('.basket__item-index');
		orderedList.forEach((item, idx) => this.setText(item, idx + 1));
	}

	// Защищенный метод для обновления состояния кнопки заказа
	protected _updateOrderButtonState(price: number): void {
		// Активировать кнопку, если общая цена больше 0
		this.setDisabled(this._button, price <= 0);
	}
}