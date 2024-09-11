import { IAppState, IProductItem, IOrder, IBasket, PaymentType, FormErrors } from '../types';
import { Model } from './base/Model';

class ProductItem implements IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | string;

	constructor({ id, description, image, title, category, price }: IProductItem) {
		this.id = id;
		this.description = description;
		this.image = image;
		this.title = title;
		this.category = category;
		this.price = price;
	}
}

export class AppState extends Model<IAppState> {
	basket: IBasket[] = [];
	products: IProductItem[] = [];
	order: IOrder = {
		phone: '',
		email: '',
		paymentType: PaymentType.Online,
		items: [],
	};
	formErrors: FormErrors = {};

	// @ts-ignore
	constructor(data: Partial<IAppState>, events) {
		super(data, events);
	}
}
