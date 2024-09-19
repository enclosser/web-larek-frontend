import {IContactsFormView, TContactsForm, TFormState} from '../types';
import { IEvents } from './base/events';
import { Form } from './Form';

export class Contacts extends Form<TContactsForm> implements IContactsFormView {
	protected _close: HTMLElement;

	constructor(
		container: HTMLFormElement,
		events: IEvents,
	) {
		super(container, events);

		events.on('contactsErrors:change', (errors: Record<string, string>) => {
			if (errors) {
				this.setText(this._errors, `${errors.email || ''} ${errors.phone || ''}`)
			} else {
				this.setText(this._errors, '')
			}
		});

		events.on('contacts:submit:toggle', (payload: TFormState) => {
			this._submit.disabled = !payload.valid;
		});

		this._submit.disabled = true;
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
}