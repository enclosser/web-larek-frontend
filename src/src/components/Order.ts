import { IOrderView, TOrderActions, TOrderForm } from '../types';
import { Form } from './Form';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export class Order extends Form<TOrderForm> implements IOrderView {
	protected _cash: HTMLButtonElement;
	protected _card: HTMLButtonElement;
	protected _paymentTypes: HTMLButtonElement[];

	constructor(
		container: HTMLFormElement,
		events: IEvents,
		actions: TOrderActions
	) {
		super(container, events);

		// Получение элементов с обязательной проверкой наличия
		this._cash = ensureElement<HTMLButtonElement>('[name="cash"]', container);
		this._card = ensureElement<HTMLButtonElement>('[name="card"]', container);
		this._paymentTypes = [this._cash, this._card];

		// Инициализация обработчиков событий
		this.initializeEventListeners(actions);
		this.valid = false;
	}

	// Метод для добавления обработчиков событий
	private initializeEventListeners(actions: TOrderActions): void {
		if (actions.onClickPayment) {
			this._paymentTypes.forEach(button =>
				button.addEventListener('click', actions.onClickPayment)
			);
		}
	}

	// Добавляем метод для получения адреса
	getAddress(): string {
		return this.container.address.value;
	}

	setNextToggle(state: boolean): void {
		this.valid = state;
	}

	// Установка стиля для активной кнопки оплаты
	setStyleBorder(paymentType: string): void {
		this._paymentTypes.forEach(button =>
			this.removeStyleClass(button, 'button_alt-active')
		);

		const selectedButton = this._paymentTypes.find(
			button => button.name === paymentType
		);
		if (selectedButton) {
			this.addStyleClass(selectedButton, 'button_alt-active');
		}
	}
}
