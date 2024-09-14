import { IOrderView, TOrderActions, TOrderForm } from '../types';
import { Form } from './Form';
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
		this._cash = this.ensureElement<HTMLButtonElement>('[name="cash"]', container);
		this._card = this.ensureElement<HTMLButtonElement>('[name="card"]', container);
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

	get address(): string {
		return this.container.address.value;
	}

	set address(value: string) {
		this.container.address.value = value;
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

	// Метод для безопасного поиска элемента в DOM
	private ensureElement<T extends HTMLElement>(selector: string, container: HTMLElement): T {
		const element = container.querySelector<T>(selector);
		if (!element) {
			throw new Error(`Element with selector "${selector}" not found.`);
		}
		return element;
	}
}
