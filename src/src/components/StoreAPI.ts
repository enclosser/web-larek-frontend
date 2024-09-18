import {
	ICatalogItem,
	ApiPostMethods,
	ApiListResponse,
	Url,
	TOrder,
	TOrderResult,
} from '../types';

interface IStoreAPI {
	url: Url;
	options: RequestInit;
	handleResponse: <T>(response: Response) => Promise<T>;
	get: <T>(uri: string) => Promise<T>;
	post: <T>(uri: string, data: object, method?: ApiPostMethods) => Promise<T>;
	getCatalogList: () => Promise<ICatalogItem[]>;
	orderItems: (order: TOrder) => Promise<TOrderResult>;
}

export class StoreAPI implements IStoreAPI {
	readonly url: Url;
	options: RequestInit;

	constructor(url: Url, options: RequestInit = {}) {
		this.url = url;
		this.options = {
			headers: {
				'Content-Type': 'application/json',
				...options.headers,
			},
		};
	}

	// Обработчик ответа сервера
	handleResponse<T>(response: Response): Promise<T> {
		return response.ok
			? (response.json() as Promise<T>)  // Преобразование к обобщённому типу T
			: response.json().then((data) => Promise.reject(data.error ?? response.statusText));
	}

	// Вспомогательный метод для создания полного URL
	private getFullUrl(uri: string): string {
		return `${this.url.items}${uri}`;
	}

	// GET-запрос
	get<T>(uri: string): Promise<T> {
		return fetch(this.getFullUrl(uri), {
			...this.options,
			method: 'GET',
		}).then(response => this.handleResponse<T>(response));
	}

	// POST-запрос (или другой метод, например, PUT)
	post<T>(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<T> {
		return fetch(this.getFullUrl(uri), {
			...this.options,
			method,
			body: JSON.stringify(data),
		}).then(response => this.handleResponse<T>(response));
	}

	// Получение списка товаров каталога
	getCatalogList(): Promise<ICatalogItem[]> {
		return this.get<ApiListResponse<ICatalogItem>>('/product/').then((data) =>
			data.items.map((item) => ({
				...item,
				image: `${this.url.images}${item.image}`,
			}))
		);
	}

	// Оформление заказа
	orderItems(order: TOrder): Promise<TOrderResult> {
		return this.post<TOrderResult>('/order', order);
	}
}
