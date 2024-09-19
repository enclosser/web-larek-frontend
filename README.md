# Проектная работа "Веб-ларек"

Реализация интернет-магазин с товарами для веб-разработчика

### Стек

HTML, SCSS, TS, Webpack

### Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

### Внешний вид

_Основное окно_

[![2024-09-14-15-54-28.png](https://i.postimg.cc/VkDP9h21/2024-09-14-15-54-28.png)](https://postimg.cc/WdFyT52f)

_Корзина_

[![image.png](https://i.postimg.cc/bYZ1Xj2d/image.png)](https://postimg.cc/LhMJfwDM)

_Окно оформления заказа_

[![image.png](https://i.postimg.cc/s2nG8njp/image.png)](https://postimg.cc/947fwYqM)

_Заказ оформлен_

[![image.png](https://i.postimg.cc/m2xz01s6/image.png)](https://postimg.cc/jCXSf5Cz)

### Важные файлы

- `src/pages/index.html` — HTML-файл главной страницы
- `src/types/index.ts` — файл с типами
- `src/index.ts` — точка входа приложения
- `src/assets/scss/styles.scss` — корневой файл стилей
- `src/utils/constants.ts` — файл с константами
- `src/utils/utils.ts` — файл с утилитами
- `.env` — файл окружения с адресом до API

## Установка и запуск

Для установки и запуска проекта необходимо добавить адрес сервера в .env и выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Используемые типы и интерфейсы

### Типы, используемые в реализации API

Url:
Описывает пути для API-запросов, связанные с изображениями и айтемами.
```
export type Url = {
    images: string;
    items: string;
};
```
ApiPostMethods:
Тип для методов HTTP-запросов, ограниченный значениями 'POST' и 'PUT'.
```
export type ApiPostMethods = 'POST' | 'PUT';
```
ApiListResponse<Type>:
Обобщенный тип ответа API, содержащий общее количество и массив элементов определённого типа.
```
export type ApiListResponse<Type> = {
    total: number;
    items: Type[];
};
```
TOrderResult:
Тип для результата заказа, содержащий идентификатор заказа и общую сумму.
```
export type TOrderResult = {
    id: string;
    total: number;
};
```
### Типы, используемые в реализации Модели Данных
ICatalogItem:
Интерфейс для элемента каталога, включающий идентификатор, описание, изображение, заголовок, категорию и цену.
```
export interface ICatalogItem {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}
```
ICardItem:
Интерфейс для элементов корзины, включает идентификатор, заголовок и цену.
```
export interface ICardItem {
    id: string;
    title: string;
    price: number | null;
}
```
TOrder:
Тип для представления заказа, включающий элементы заказа, общую сумму и форму заказа с контактами.
```
export type TOrder = {
    items: string[];
    total: number;
} & TOrderForm & TContactsForm;
```
TFormErrors:
Тип для хранения ошибок формы, сопоставляющий поля заказа с их ошибками.
```
export type TFormErrors = Partial<Record<keyof TOrder, string>>;
```
TPaymentState:
Тип состояния платежа, включающий информацию о способе оплаты и адресе.
```
export type TPaymentState = {
    payment: null | string;
    address: null | string;
};
```
TContactsState:
Тип состояния контактной информации, включающий телефон и email.
```
export type TContactsState = {
email: null | string;
phone: null | string;
};
```
IAppState:
Интерфейс состояния приложения, включает элементы корзины, её состояние, методы для установки каталога, адреса, типа оплаты, телефона, email, а также методы для валидации заказа и контактов.
```
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
```
### Типы, используемые в реализации Представления
```
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

export type TShoppingCard = {
    list: HTMLElement[];
};

export type TShopCardActions = {
    onClick: (event: MouseEvent) => void;
};

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

export type TModalData = {
    content: HTMLElement;
};

export interface IModalView {
    content: HTMLElement;
    open(): void;
    close(): void;
    render(data: TModalData): HTMLElement;
}

export interface IFormView<T> {
    render(state: Partial<T> & TFormState): HTMLFormElement;
}

export type TFormState = {
    valid: boolean;
    errors: string[];
};

export type TSuccessForm = {
    totalPrice: number;
};

export interface ISuccessView {
    totalPrice: number;
}

export interface IPaymentTypeEvent {
    paymentType: string;
}
```
 ## Описание классов

### Card

Класс Card реализует компонент карточки товара, который отображается на странице. Он наследуется от базового класса Component и реализует интерфейс ICardView. Класс управляет отображением таких элементов карточки, как заголовок, изображение, цена, категория, описание и кнопка.

Класс Card используется для управления представлением и поведением карточек товаров в веб-приложении. Он предоставляет методы для установки и обновления ключевых атрибутов карточки, таких как заголовок, изображение, цена, категория и описание, а также взаимодействует с событиями через объект events.

```
constructor(
    container: HTMLElement,
    events: IEvents,
    protected blockName: string = 'card'
)
```
#### Параметры:

container: HTMLElement — контейнер для карточки, в котором будут находиться её элементы.
events: IEvents — объект для обработки событий.
blockName: string — CSS-класс блока для использования в элементах (по умолчанию 'card').

Конструктор инициализирует основные элементы карточки (заголовок, изображение, цена, категория, описание, кнопка) и устанавливает ссылки на них.

#### Методы

`set title(value: string): void` -  Устанавливает текст заголовка карточки. 
* value: string — текст заголовка.

`set image(value: string): void` - Устанавливает изображение карточки.
* value: string — URL изображения.

`set price(value: string): void` - Устанавливает цену карточки. Если цена равна null, выводится текст "Бесценно".
* value: string — цена товара.

`set category(value: string): void` - Устанавливает категорию товара.
* value: string — название категории.

`set description(value: string): void` - Устанавливает описание товара.
* value: string — текст описания.

`protected setImage(element: HTMLImageElement, src: string, alt?: string): void` - Устанавливает источник и альтернативный текст для изображения.
* element: HTMLImageElement — элемент изображения.
* src: string — URL изображения.
* alt?: string — альтернативный текст для изображения (необязательный параметр).

`protected setCategoryCard(value: string): void` - Устанавливает CSS-класс для категории карточки на основе значения.
* value: string — название категории.

#### Защищённые свойства

* `_title`: HTMLElement — элемент заголовка карточки.
* `_image?`: HTMLImageElement — элемент изображения карточки.
* `_price`: HTMLSpanElement — элемент цены карточки.
* `_category?`: HTMLSpanElement — элемент категории карточки.
* `_description?`: HTMLParagraphElement — элемент описания карточки.
* `_button?`: HTMLButtonElement — элемент кнопки карточки.
* `_statusBtn`: boolean — статус кнопки (активна или нет).
