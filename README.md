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

Используется для управления представлением и поведением карточек товаров в веб-приложении. Он предоставляет методы для установки и обновления ключевых атрибутов карточки, таких как заголовок, изображение, цена, категория и описание, а также взаимодействует с событиями через объект events.

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

### AppState
Класс AppState реализует состояние приложения и управляет данными, такими как каталог товаров, корзина, ошибки формы, состояние оплаты и контактные данные. Он также отвечает за обновление представления через события.

Используется для управления состоянием каталога, корзины и данных заказа в приложении. Методы класса обеспечивают добавление и удаление товаров в корзину, проверку валидности данных заказа и контактов, а также обновление различных состояний через события.

```
constructor(protected events: IEvents)
```
#### Параметры

events: IEvents — объект для обработки и эмиссии событий.

Конструктор инициализирует основные свойства состояния, такие как каталог, корзина, ошибки формы, состояние оплаты и контактные данные, и позволяет взаимодействовать с представлением через события.

#### Методы
`setCatalog(items: ICatalogItem[]): void` - Устанавливает список товаров каталога и уведомляет об изменениях.

* items: ICatalogItem[] — массив товаров для каталога.
  `addItemCard(item: ICatalogItem): void` - Добавляет товар в корзину, если его там ещё нет, и уведомляет об изменении корзины.

* item: ICatalogItem — товар для добавления в корзину.
  `removeCardItem(item: ICardItem): void` - Удаляет товар из корзины и обновляет счётчик и общую стоимость.

* item: ICardItem — товар для удаления из корзины.
  `setCardPreview(): void` - Обновляет список товаров в корзине и уведомляет об изменении превью корзины.

`getTotal(): number` - Возвращает общую стоимость товаров в корзине.

`setAddress(address: string): void` - Устанавливает адрес для оплаты.
* address: string — адрес для доставки.
  `setPaymentType(paymentType: string): void` - Устанавливает тип оплаты.
* paymentType: string — тип оплаты (например, наличные или карта).
  `setPhone(phone: string): void` - Устанавливает телефон для контактов.
* phone: string — номер телефона.
  `setEmail(email: string): void` - Устанавливает email для контактов.
* email: string — адрес электронной почты.

`isOrderValid(): boolean` - Проверяет валидность заказа, проверяя наличие адреса и типа оплаты. Возвращает true, если данные валидны, иначе false.

`isContactsValid(): boolean` - Проверяет валидность контактных данных, проверяя наличие телефона и email. Возвращает true, если данные валидны, иначе false.

`clearAllItems(): void` - Очищает корзину, сбрасывает состояние оплаты и контактов, и уведомляет об изменении состояния.

### Contacts
Класс Contacts реализует компонент формы контактов и наследуется от класса Form. Он предоставляет интерфейс для работы с контактной формой, в частности для управления полями "телефон" и "email", а также для обработки ошибок валидации и изменения состояния кнопки отправки.

Этот класс используется для управления состоянием формы контактов в приложении. Он обрабатывает валидацию полей формы, активирует и деактивирует кнопку отправки в зависимости от валидности данных, а также отображает ошибки валидации через события.
```
constructor(
    container: HTMLFormElement,
    events: IEvents
)
```
#### Параметры
container: HTMLFormElement — контейнер формы контактов.

events: IEvents — объект для обработки и эмиссии событий.

Конструктор инициализирует обработку событий для отображения ошибок формы и управления кнопкой отправки. По умолчанию кнопка отправки (_submit) деактивирована.
#### Методы
`protected getFieldValue(fieldName: keyof TContactsForm): string` - Получает значение указанного поля формы.

* fieldName: keyof TContactsForm` — название поля формы.

`protected setFieldValue(fieldName: keyof TContactsForm, value: string): void` - Устанавливает значение указанного поля формы.

* fieldName: keyof TContactsForm` — название поля формы.
* value: string — значение для установки в поле.

`get phone(): string` - Возвращает текущее значение поля телефона.

`set phone(value: string): void` - Устанавливает значение телефона в поле формы.
* value: string — телефон для установки.

`get email(): string` - Возвращает текущее значение поля email.

`set email(value: string): void` - Устанавливает значение email в поле формы.

* value: string — email для установки.

#### События
`contactsErrors:change` — обрабатывает изменение ошибок валидации полей контактов. Если есть ошибки, они отображаются в специальной зоне ошибок.

`contacts:submit:toggle` — включает или отключает кнопку отправки формы в зависимости от валидности введённых данных.

#### Защищённые свойства
`_close: HTMLElement` — элемент для закрытия формы (не используется напрямую, но может быть расширен для логики закрытия).
`_submit: HTMLButtonElement` — кнопка отправки формы (наследуется от класса Form).

### Form
Класс Form реализует базовый компонент формы и управляет её поведением и состоянием. Он наследуется от класса Component и реализует интерфейс IFormView, предоставляя универсальный механизм для обработки полей формы, отправки данных и отображения ошибок.

Этот класс используется для управления любой формой в приложении, включая валидацию и отправку. Он автоматически обрабатывает события изменения значений полей формы и отправки данных, а также позволяет рендерить состояние формы с учетом ошибок и валидности.
```
constructor(
    container: HTMLFormElement,
    events: IEvents
)
```
#### Параметры:
container: HTMLFormElement — контейнер для формы.

events: IEvents — объект для обработки и эмиссии событий.

Конструктор инициализирует основные элементы формы, такие как кнопка отправки и блок для отображения ошибок, а также добавляет обработчики событий для изменения полей и отправки формы.

#### Методы
`private addEventListeners(): void` - Добавляет обработчики событий для полей ввода и отправки формы.

`private handleInputChange(e: Event): void` - Обрабатывает событие изменения поля ввода.

* e: Event — событие изменения ввода.

`private handleSubmit(e: Event): void` - Обрабатывает событие отправки формы. Предотвращает стандартное поведение и эмитирует событие отправки.

* e: Event — событие отправки формы.

`protected onInputChange(field: keyof T, value: string): void` - Обрабатывает изменение значения поля формы и эмитирует событие.

* field: keyof T — название измененного поля.
* value: string — новое значение поля.

`render(state: Partial<T> & TFormState): HTMLFormElement` - Рендерит состояние формы, обновляет значения полей и отображает ошибки, если они есть.

* state: Partial<T> & TFormState — состояние формы, включая валидность и ошибки.
#### События
`input` — обрабатывается через handleInputChange, эмитируется событие изменения поля.
`submit` — обрабатывается через handleSubmit, эмитируется событие отправки формы.
#### Защищённые свойства
`_submit`: HTMLButtonElement — кнопка отправки формы, найденная внутри контейнера.
`_errors`: HTMLElement — элемент для отображения ошибок, найденный внутри контейнера.

### Modal

Класс Modal реализует представление модального окна и наследуется от базового класса Component, а также реализует интерфейс IModalView. Он предназначен для управления отображением модальных окон, их открытием, закрытием и рендерингом содержимого. Модальное окно автоматически добавляет обработчики событий для закрытия и предотвращения случайного закрытия при клике на контенте.
```
constructor(
    container: HTMLElement,
    events: IEvents
)
```
#### Параметры:
container: HTMLElement — контейнер, в котором будет отображаться модальное окно.

events: IEvents — объект для управления событиями.

Конструктор инициализирует кнопки для закрытия модального окна и контейнер для контента, а также добавляет обработчики событий для закрытия окна.

#### Методы
`private addEventListeners(): void` - Добавляет обработчики событий для закрытия модального окна.

* Кнопка закрытия окна и контейнер вызывают метод close() при клике.

* Событие на контенте предотвращает закрытие окна при клике внутри содержимого.

`set content(value: HTMLElement | null): void` - Устанавливает или очищает содержимое модального окна.

* value: HTMLElement | null — новый контент для модального окна. Если null, окно очищается.

`open(): void` - Открывает модальное окно, добавляя ему активный CSS-класс и эмитирует событие modal:open.

`close(): void` - Закрывает модальное окно, удаляя активный CSS-класс и очищая контент. Также эмитирует событие modal:close.

`render(data: TModalData): HTMLElement` - Рендерит переданные данные в модальное окно и автоматически его открывает.

* data: TModalData` — данные для отображения в модальном окне.
#### События
`click` на кнопке закрытия и контейнере вызывает метод close().
`click` на контенте останавливает распространение события, предотвращая закрытие окна.
#### Защищённые свойства
`_closeButton: HTMLButtonElement` — кнопка для закрытия модального окна.

`_content: HTMLElement` — элемент, в который вставляется контент модального окна.

### Order
Класс Order реализует представление формы заказа и наследуется от класса Form<TOrderForm>, реализуя интерфейс IOrderView. Класс используется для обработки и отображения формы заказа, управления выбором типа оплаты и валидации полей формы.
```
constructor(
    container: HTMLFormElement,
    events: IEvents
)
```
#### Параметры:
container: HTMLFormElement — контейнер, в котором находится форма заказа.

events: IEvents — объект для управления событиями.

#### Методы
`private setStyleBorder(paymentType: string): void` - Устанавливает активный стиль для выбранной кнопки типа оплаты и сбрасывает стиль для остальных кнопок.

`paymentType: string` — тип оплаты (наличные или карта).

`getAddress(): string` - Возвращает введённый в форму адрес доставки.

#### Обработчики событий
При клике на кнопки выбора типа оплаты эмитируется событие payment:method:selected, в которое передаётся выбранный тип оплаты. Активный стиль применяется к выбранной кнопке через метод setStyleBorder().

Событие `order:reset` сбрасывает форму заказа, очищая поле адреса и сбрасывая активный стиль кнопок выбора оплаты.

Событие `orderErrors:change` выводит ошибки, связанные с оплатой или адресом, если они присутствуют.

Событие `order:submit:toggle` активирует или деактивирует кнопку отправки формы в зависимости от валидности данных формы.

#### События
Клик по кнопкам выбора типа оплаты вызывает изменение их стилей и эмитирует событие payment:method:selected.

Событие `order:reset` сбрасывает стиль кнопок и очищает адрес в форме.

Событие `orderErrors:change` выводит или очищает ошибки формы.

Событие `order:submit:toggle` управляет активностью кнопки отправки формы в зависимости от валидности формы.
#### Защищённые свойства
`_cash: HTMLButtonElement` — кнопка для выбора оплаты наличными.

`_card: HTMLButtonElement` — кнопка для выбора оплаты картой.

`_paymentTypes: HTMLButtonElement[]` — массив кнопок, представляющих способы оплаты.

### Page
Класс Page реализует представление главной страницы и наследуется от класса Component<TPage>, реализуя интерфейс IPageView. Класс используется для отображения каталога товаров, управления корзиной и блокировки страницы при открытии модальных окон.
```
constructor(container: HTMLElement, events: IEvents)
```
#### Параметры:
* container: HTMLElement — основной контейнер страницы.
* events: IEvents — объект для управления событиями.

#### Методы
Собственные методы отсутствуют, все ключевые действия происходят через события.

#### Обработчики событий
При клике на элемент корзины эмитируется событие `card:click`, которое инициирует открытие корзины.

Событие `catalog:update` обновляет содержимое каталога товаров. Список товаров передаётся в виде массива элементов HTMLElement[].

Событие `card:updateCounter` обновляет счётчик товаров в корзине, устанавливая его значение на основе переданного payload.

Событие `modal:open` блокирует прокрутку страницы, добавляя класс page__wrapper_locked к обёртке страницы.

Событие `modal:close` снимает блокировку прокрутки страницы, удаляя класс page__wrapper_locked.

#### События
Клик на корзину — вызывает событие `card:click` для управления отображением корзины.

Обновление каталога — при получении события `catalog:update` происходит обновление каталога товаров на странице.

Обновление счётчика корзины — событие `card:updateCounter` обновляет счётчик товаров на основе количества элементов в корзине.

Открытие модального окна — событие `modal:open` блокирует прокрутку страницы.

Закрытие модального окна — событие `modal:close` разблокирует прокрутку страницы.

#### Защищённые свойства
* `_catalog: HTMLElement` — элемент, содержащий список товаров на странице (каталог).
* `_wrapper: HTMLElement` — обёртка страницы, используемая для блокировки прокрутки при открытии модальных окон.
* `_card: HTMLElement` — элемент корзины.
* `_cardCounter: HTMLElement` — элемент, отображающий количество товаров в корзине.

