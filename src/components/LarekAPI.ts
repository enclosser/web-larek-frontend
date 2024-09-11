import { IProductItem, ILarekAPI, IOrder, IOrderStatus } from '../types';
import { PRODUCT_LIST_ENDPOINT, SINGLE_PRODUCT_ENDPOINT, ORDER_ENDPOINT } from '../types/constants';
import { Api } from "./base/api";

export class LarekAPI extends Api implements ILarekAPI {

	async getProductList(): Promise<IProductItem[]> {
		try {
			const response = await this.get(PRODUCT_LIST_ENDPOINT);
			return response as IProductItem[];
		} catch (error) {
			console.error('Failed to fetch product list:', error);
			throw error; // Rethrow or handle error as needed
		}
	}

	async getProduct(id: number): Promise<IProductItem> {
		try {
			const response = await this.get(SINGLE_PRODUCT_ENDPOINT(id.toString()));
			return response as IProductItem;
		} catch (error) {
			console.error(`Failed to fetch product with id ${id}:`, error);
			throw error; // Rethrow or handle error as needed
		}
	}

	async placeOrder(order: IOrder): Promise<IOrderStatus> {
		try {
			const response = await this.post(ORDER_ENDPOINT, order);
			return response as IOrderStatus;
		} catch (error) {
			console.error('Failed to place order:', error);
			throw error; // Rethrow or handle error as needed
		}
	}
}
