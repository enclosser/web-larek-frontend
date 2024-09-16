import {
	ICatalogItem,
	ICartItem,
	TPaymentState,
	TContactsState,
	TOrder,
	TFormErrors,
	IAppState,
} from '../types';
import { Model } from './base/Model';
import { IEvents } from './base/events';

export class AppState implements IAppState {
	catalog: ICatalogItem[] = [];
	cartItems: ICartItem[] = [];
	total = 0;
	order: TOrder = {
		payment: null,
		email: '',
		phone: '',
		address: '',
		total: 0,
		items: [],
	};
	formErrors: TFormErrors = {};
	cartState = new Set<string>();
	paymentState: TPaymentState = { payment: null, address: null };
	contactsState: TContactsState = { email: null, phone: null };

	constructor(protected events: IEvents) {}

	setCatalog(items: ICatalogItem[]): void {
		this.catalog = items.map(item => ({
			...item,
			status: false,
		}));
		this.events.emit('items:changed', { catalog: this.catalog });
	}

	addItemCart(item: ICatalogItem): void {
		if (this.cartState.has(item.id)) {
			console.error('Your item is already in the cart');
			return;
		}
		this.cartState.add(item.id);
		item.status = true;
		this.updateCartState(item);
	}

	setCartPreview(): void {
		this.cartItems = this.catalog.filter(item => this.cartState.has(item.id));
		this.getTotal();
		this.events.emit('cart:preview', { count: this.cartState.size });
	}

	getTotal(): number {
		this.total = this.cartItems.reduce((acc, next) => acc + (next.price ?? 0), 0);
		return this.total;
	}

	removeCartItem(item: ICartItem): void {
		this.cartState.delete(item.id);
		item.status = false;
		this.updateCartState();
	}

	updateCartState(item?: ICatalogItem): void {
		this.getTotal();
		this.events.emit('cart:open');
		this.events.emit('cart:updateCounter', {
			count: this.cartState.size,
		});
		if (item) {
			this.events.emit('preview:changed', item);
		}
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

	getPricelessItems(): Set<string> {
		return new Set(this.catalog.filter(item => item.price === null).map(item => item.id));
	}

	clearAllItems(): void {
		this.cartItems.forEach(item => (item.status = false));
		this.cartState.clear();
		this.events.emit('cart:updateCounter', {
			count: this.cartState.size,
		});
		this.events.emit('items:changed');
	}

	createOrder(): void {
		const setPriceless = this.getPricelessItems();
		this.order.items = Array.from(this.cartState).filter(id => !setPriceless.has(id));
		this.order = {
			...this.order,
			email: this.contactsState.email,
			phone: this.contactsState.phone,
			payment: this.paymentState.payment,
			address: this.paymentState.address,
			total: this.getTotal(),
		};
	}
}
