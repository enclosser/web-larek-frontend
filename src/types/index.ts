export type Url = {
    images: string;
    items: string;
};

export type ApiPostMethods = 'POST' | 'PUT';
export type ApiListResponse<Type> = {
    total: number;
    items: Type[];
};

export interface ICatalogItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}

export interface ICardItem {
    id: string;
    title: string;
    price: number | null;
}

// StoreAPI
export type TOrderResult = {
    id: string;
    total: number;
};

// Model
// AppData types
export type TOrder = {
    items: string[];
    total: number;
} & TOrderForm &
    TContactsForm;

export type TFormErrors = Partial<Record<keyof TOrder, string>>;

export type TPaymentState = {
    payment: null | string;
    address: null | string;
};

export type TContactsState = {
    email: null | string;
    phone: null | string;
};

export interface IAppState {
    cardItems: ICardItem[];
    cardState: Set<string>;
    paymentState: TPaymentState;
    contactsState: TContactsState;
    setCatalog(items: ICatalogItem[]): void;
    setAddress(address: string): void;
    setPaymentType(paymentType: string): void;
    setPhone(phone: string): void;
    setEmail(email: string): void;
    isOrderValid(): boolean;
    isContactsValid(): boolean;
}

export interface IOrderView {
    getAddress(): string;
}

export type TOrderForm = {
    address: string;
    payment: string | null;
};

export type TOrderActions = {
    onClickPayment: (event: Event) => void;
};

// Contacts View
export interface IContactsFormView {
    email: string;
    phone: string;
}

export type TContactsForm = {
    email: string;
    phone: string;
};

export type TContactsActions = {
    onClick: () => void;
};

// Card View
export type TCard = {
    title: string;
    image?: string;
    price: number | null;
    category?: string;
    description?: string;
    button: HTMLButtonElement;
    statusBtn: boolean;
};

export interface ICardView {
    title: string;
    image?: string;
    price: string;
    category?: string;
    description?: string;
}

export const TDictCategoryCard: Map<string, string> = new Map([
    ['софт-скил', 'card__category_soft'],
    ['другое', 'card__category_hard'],
    ['дополнительное', 'card__category_button'],
    ['кнопка', 'card__category_other'],
    ['хард-скил', 'card__category_additional'],
]);

// ShoppingCard View
export type TShoppingCard = {
    list: HTMLElement[];
};

export type TShopCardActions = {
    onClick: (event: MouseEvent) => void;
};

export interface IShoppingCardView {}

// Page View
export type TPage = {
    catalog: HTMLElement[];
    locked: boolean;
    cardCounter: TUpdateCounter;
};

export type TUpdateCounter = {
    count: number;
};

export type TPageActions = {
    onClick: (event: MouseEvent) => void;
};

export interface IPageView {}

// Modal View
export type TModalData = {
    content: HTMLElement;
};

export interface IModalView {
    content: HTMLElement;
    open(): void;
    close(): void;
    render(data: TModalData): HTMLElement;
}

// Form View
export type TFormState = {
    valid: boolean;
    errors: string[];
};

export interface IFormView<T> {
    render(state: Partial<T> & TFormState): HTMLFormElement;
}

// Success View
export type TSuccessForm = {
    totalPrice: number;
};

export type TSuccessActions = {
    onClick: () => void;
};

export interface ISuccessView {
    totalPrice: number;
}

export interface IPaymentTypeEvent {
    paymentType: string;
}

export interface IOrderPriceEvent {
    price: number;
}

export interface IToggleCardButtonEvent {
    id: string;
    disabled: boolean
}