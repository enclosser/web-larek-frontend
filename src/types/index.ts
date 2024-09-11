
export interface IProductItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | string;
}

export interface IBasket {
    items: IProductItem[];
    totalPrice: number;
    addItem(item: IProductItem): void;
    removeItem(itemId: IProductItem): void;
    calculateTotalPrice(): number;
}

export enum PaymentType {
    Online = 'Онлайн',
    OnDelivery = 'При получении'
}

export interface IOrder {
    phone: string,
    email: string,
    paymentType: PaymentType,
    items: IProductItem[],
}


interface Basket {
    items: IProductItem[];
    totalPrice: number;
    addItem(product: IProductItem): void;
    removeItem(itemId: string): void;
    calculateTotalPrice(): number;
}

export interface ILarekAPI {
    // Получить список товаров
    getProductList(): Promise<IProductItem[]>;
    // Получить товар по идентификатору
    getProduct(id: number): Promise<IProductItem>;
    // Отправить заказ
    placeOrder(order: IOrder): Promise<IOrderStatus>;
}

export interface IAppState {
    products: IProductItem[];
    basket: string[];
    order: IOrder | null;
    formErrors: FormErrors[];
}

export interface IOrderStatus { // отвечает за успешность заказа
    status: string;
    totalPrice: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

interface IModal {
    content: HTMLElement;
}


interface IModalData {
    content: HTMLElement;
}