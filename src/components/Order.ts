import {IOrderView, TFormState, TOrderActions, TOrderForm} from '../types';
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
	) {
		super(container, events);

		// Получение элементов с обязательной проверкой наличия
		this._cash = ensureElement<HTMLButtonElement>('[name="cash"]', container);
		this._card = ensureElement<HTMLButtonElement>('[name="card"]', container);
		this._paymentTypes = [this._cash, this._card];

		this._paymentTypes.forEach(button =>
			button.addEventListener('click', () => {
				const paymentType = button.getAttribute('name');
				this.setStyleBorder(paymentType);
				events.emit('payment:method:selected', {paymentType: paymentType});
			})
		);

		events.on('order:set:nexttoggle', (payload:TFormState) => {
			this.setNextToggle(payload.valid);
		});

		// Инициализация обработчиков событий
		// this.initializeEventListeners(actions);
		this.valid = false;
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
