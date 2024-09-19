import {
	ICatalogItem,
	ICardItem,
	TPaymentState,
	TContactsState,
	TFormErrors,
	IAppState,
} from '../types';
import { IEvents } from './base/events';

export class AppState implements IAppState {
	catalog: ICatalogItem[] = [];
	cartItems: ICardItem[] = [];
	formErrors: TFormErrors = {};
	cartState = new Set<string>();
	paymentState: TPaymentState = { payment: null, address: null };
	contactsState: TContactsState = { email: null, phone: null };

	constructor(protected events: IEvents) {}

	setCatalog(items: ICatalogItem[]): void {
		this.catalog = items.map(item => ({
			...item,
		}));
		this.events.emit('items:changed', { catalog: this.catalog });
	}

	addItemCard(item: ICatalogItem): void {
		if (this.cartState.has(item.id)) return; // Возвращаем сразу, если товар уже в корзине

		this.cartState.add(item.id);
		this.events.emit('preview:changed', item);
		this.events.emit('card:updateCounter', {
			count: this.cartState.size,
		});
	}

	removeCardItem(item: ICardItem): void {
		this.cartState.delete(item.id);
		this.events.emit('card:updateCounter', {
			count: this.cartState.size,
		});
		this.events.emit('card:updatePrice', { total: this.getTotal() });
	}

	setCardPreview(): void {
		this.cartItems = this.catalog.filter(item => this.cartState.has(item.id));
		this.events.emit('card:preview', { count: this.cartState.size });
	}

	getTotal(): number {
		return this.cartItems.reduce((acc, next) => acc + (next.price ?? 0), 0);
	}

	setAddress(address: string): void {
		this.paymentState.address = address;
	}

	setPaymentType(paymentType: string): void {
		this.paymentState.payment = paymentType;
	}

	setPhone(phone: string): void {
		this.contactsState.phone = phone;
	}

	setEmail(email: string): void {
		this.contactsState.email = email;
	}

	isOrderValid(): boolean {
		this.formErrors = {};
		if (!this.paymentState.address) {
			this.formErrors.address = 'Необходимо указать адрес';
		}
		if (!this.paymentState.payment) {
			this.formErrors.payment = 'Необходимо указать тип оплаты';
		}
		this.events.emit('orderErrors:change', this.formErrors);
		return !Object.keys(this.formErrors).length;
	}

	isContactsValid(): boolean {
		this.formErrors = {};
		if (!this.contactsState.email) {
			this.formErrors.email = 'Необходимо указать почту';
		}
		if (!this.contactsState.phone) {
			this.formErrors.phone = 'Необходимо указать телефон';
		}
		this.events.emit('contactsErrors:change', this.formErrors);
		return !Object.keys(this.formErrors).length;
	}

	clearAllItems(): void {
		this.cartState.clear();
		this.cartItems = [];
		this.paymentState = { payment: null, address: null };
		this.contactsState = { email: null, phone: null };
		this.formErrors = {};
		this.events.emit('card:updateCounter', {
			count: this.cartState.size,
		});
		this.events.emit('items:changed');
	}
}
