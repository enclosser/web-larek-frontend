import { IContactsFormView, TContactsActions, TContactsForm } from '../types';
import { IEvents } from './base/events';
import { Form } from './Form';

export class Contacts extends Form<TContactsForm> implements IContactsFormView {
	protected _close: HTMLElement;

	constructor(
		container: HTMLFormElement,
		events: IEvents,
	) {
		super(container, events);

		// Инициализируем valid как false
		this.valid = false;
	}

	// Универсальный метод для получения и установки значений полей формы
	protected getFieldValue(fieldName: keyof TContactsForm): string {
		return (this.container[fieldName] as HTMLInputElement)?.value || '';
	}

	protected setFieldValue(fieldName: keyof TContactsForm, value: string): void {
		const field = this.container[fieldName] as HTMLInputElement;
		if (field) field.value = value;
	}

	get phone() {
		return this.getFieldValue('phone');
	}

	set phone(value: string) {
		this.setFieldValue('phone', value);
	}

	get email() {
		return this.getFieldValue('email');
	}

	set email(value: string) {
		this.setFieldValue('email', value);
	}

	setNextToggle(state: boolean) {
		this.valid = state;
	}
}