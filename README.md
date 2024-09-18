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

## Испльзуемые Типы и Интерфейсы

Типы используемые в реализации API

```
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
	status: boolean;
}

export interface ICartItem {
	id: string;
	title: string;
	price: number | null;
	status: boolean;
}

// StoreAPI
export type TOrderResult = {
	id: string;
	total: number;
};

```

Типы используемые в реализации Модели Данных

```
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
	cartItems: ICartItem[];
	cartState: Set<string>;
	paymentState: TPaymentState;
	contactsState: TContactsState;
	setCatalog(items: ICatalogItem[]): void;
	setAddress(address: string): void;
	setPaymentType(paymentType: string): void;
	setPhone(phone: string): void;
	setEmail(email: string): void;
	isOrderValid(): boolean;
	isContactsValid(): boolean;
	createOrder(): void;
}
```

Типы используемые в реализации Представления

```
// Order View
export interface IOrderView {
	address: string;
	setNextToggle(state: boolean): void;
	setStyleBorder(paymentType: string): void;
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
	setNextToggle(state: boolean): void;
}

export type TContactsForm = {
	email: string;
	phone: string;
};

export type TContactsActions = {
	onClick: () => void;
};

// Card View
export type TCardActions = {
	onClick: (event: MouseEvent) => void;
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
	button: HTMLButtonElement;
	statusBtn: boolean;
	setCategoryCard(value: string): void;
}

export const TDictCategoryCard: Map<string, string> = new Map([
	['софт-скил', 'card__category_soft'],
	['другое', 'card__category_hard'],
	['дополнительное', 'card__category_button'],
	['кнопка', 'card__category_other'],
	['хард-скил', 'card__category_additional'],
]);

// ShoppingCart View
export type TShoppingCart = {
	items: HTMLElement[];
	price: number;
	list: HTMLElement[];
};

export type TShopCartActions = {
	onClick: (event: MouseEvent) => void;
};

export interface IShoppingCartView {
	items: HTMLElement[];
	price: number;
	setOrderButton(value: number): void;
	setOrderIndex(): void;
}

// Page View
export type TPage = {
	catalog: HTMLElement[];
	locked: boolean;
	cartCounter: TUpdateCounter;
};

export type TUpdateCounter = {
	count: number;
};

export type TPageActions = {
	onClick: (event: MouseEvent) => void;
};

export interface IPageView {
	catalog: HTMLElement[];
	cartCounter: TUpdateCounter;
	locked: boolean;
}

// Modal View
export type TModalData = {
	content: HTMLElement;
};

export interface IModalView {
	content: HTMLElement;
	open(): void;
	close(): void;
	toggleCartBtn(state: boolean): void;
	render(data: TModalData): HTMLElement;
}

// Form View
export type TFormState = {
	valid: boolean;
	errors: string[];
};

export interface IFormView<T> {
	valid: boolean;
	errors: string;
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

```

## Архитектура

В проекте реализуется архитектура потока данных MVP вместе с паттерном "Наблюдатель". В данном подходе слой модели и слой отображения могут взаимодействовать друг с другом исключительно в слое презентере(Presenter). Таким образом, ни слой данных(Model), ни слой представления(View) о друг друге не знают. Это помогает делить приложение на зоны ответственности. В паре с ивент-брокером(EventEmitter), который является дополненым паттерном проектирования, возможна гибкая настройка сценариев работы приложения.

### Модель

---

Class `AppData` реализует работу с моделью приложения. Его задача, заключается в том, чтобы хранить информацию обо всем приложении, его состояниях и производить вычисления данных внутри.

В конструкторе класс принимает 1 аргумент `events` типа `IEvents` для возможности создать ивенты брокера.

Класс реализует методы:  
`setCatalog` - получает аргументом массив объектов айтемов, устанавливает свойство `catalog` присваивая новый массив, добавляя свойство `status` обозначения наличия айтема в корзине. Возвращает экземпляр `CatalogItem`. Создает ивент `'items:changed'` передовая объект с массивом айтемов `catalog`.

`addItemCart` - получает аргументом карточку, добавляет ее `id` в сет `cartState`, меняя статус айтема на `true` обозначая, что айтем был добавлен в корзину. Эмитит два ивента: `'preview:changed'` обновляя отображение выбранной карты и `'cart:updateCounter'` обновляя счетчик корзины на главной странице.

`setCartPreview` - метод реализует отображение корзины при открытии или удалении айтемы из корзины. Осуществляет подсчет итоговой цены используя метод `getTotal`. Эмитит ивент `cart:preview` передовая размер корзины для установки нумерации в слое отображения.

`getTotal` - осуществляет подсчет цены всех товаров в корзине, возвращает число.

`removeCartItem` - принимает аргументом `id` айтема, который требуется удалить из стэйта корзины.

`setAddress`, `setPaymentType`, `setEmail`, `setPhone` - принимает аргументом строку, которую добавляет в стейты отображений.

`isOrderValid`, `isContactsValid` - методы валидируют поля формы, возвращают логическое да/нет, эмитится ивент `*Errors:change` передовая объект с ошибками валидации.

`getPricelessItems` - метод возвращает сет с номером `id` айтемов без цены.

`clearAllItems` - метод очищения стейта корзины, обнуления статусов айтемов для корректного отображения наличия в корзине. Эмитит ивенты `cart:updateCounter`, `items:changed` для обнуления счетчика и обновления главной страницы.

`createOrder` - метод устанавливает в свойства объекта заказа значения из соответствующих стэйтов и очищает корзину.

`class CartList`, `class CatalogItem` расширяют абстрактный класс дженерик `Model<T>`, в конструкторе которого присваиваются все его свойства полученными данными с помощью метода `Object.assign()`.

### Представление

---

#### Класс `Page`

Class `Page` расширяет Базовый Class `Component<T>`
и реализует отображение главной страницы.
В конструкторе класс принимает 2 аргумента:

1. `container` - аргумент обязателен для класса родителя и принимает DOM-объект, узел тега `<body>`, использует классом родителем при рендере узла, также может изспользоваться для быстрого поиска элементов внутри узла-контейнера. Имеет тип `HTMLElement`
1. `actions` - используется для передачи обработчиков для клика по корзине главной страницы, на которую установлен слушатель в `index.ts`. Имеет тип `IPageActions`

В классе используются сеттеры:

1. `catalog` - принимает массив узлов типа HTMLElement и присваивает их главному узлу на странице для отображения списка полученных айтемов, используя встроенный метод API браузера `replaceChildren`.
2. `cartCounter` - принимает объект с типом `TUpdateCounter` для установки кол-ва добавленных айтемов в корзину пользователем.
3. `locked` - принимает true/false и необходим для вкл/выкл прокрутки страницы при открытии модального окна(корзины).

#### Класс `Card`

Class `Card` расширяет Базовый Class `Component<T>`
и реализует отображение компонента одной карты/айтема.
В конструкторе класс принимает 3 аргумента:

1. `container` - аргумент обязательный для класса родителя, который принимает DOM-объект, как узел тега с разметкой карты, получаемой из темплейта при помощи функции утилиты `cloneTemplate` из `utils.ts`. Используется для динамического поиска элементов внутри узла-контейнера и также классом родителем при рендере узла. Имеет тип `HTMLElement`.

2. `actions` - используется для передачи обработчиков в зависимости от сценария, как по клику по контейнеру карты с главной страницы при создании экземпляров карт, так при добавлении айтема в корзину и удаления айтема из корзины. Имеет тип `ICardActions`

3. `blockName` - используется со значением по умолчанию, для динамического представления в шаблон для поиска элемента внтури контейнера. Это значит, что если значение не передано будет подставлено значение из класса.

В классе используются геттеры/сеттеры для установки значений элементов карты.

Геттеры:
`title`, `price`, `category`, `description` возвращают текстовое значения карты одноименных элементов используя `.textContent`. Например `return this._title.textContent || '';` - возвращает пустую строку, если текстовое значение элемента был не установлено.

`button` - возвращает HTMLElement, давая доступ к изменению значения активности кнопки.

Сеттеры:  
`title` - при вызове метода родителя `setText`, устанавливает текст заголовка.

`image` - при вызове метода родителя `setImage`, устанавливает изображение.

`price` - при вызове метода родителя `setPrice`, устанавливает цену айтема, добавляя кастомный текст и условия, для значений цены равной `null`.

`category` - при вызове метода родителя `setCategory`, устанавливает текст соответствующий категории айтема.

`description` - при вызове метода родителя `setDescription`, устанавливает текст описания айтема.

Класс реализует методы:  
`setImage` - метод помогает установить изображение установив значения атрибутов src/alt для айтема компонента. Принимает `HTMLImageElement`и строки для src/alt. Работает в связке с сеттером класса.

`setPrice` - метод помогает установить цену для айтема компонента. Принимает `HTMLSpanElement`и значение типа `unknown`. Работает в связке с сеттером класса.

`setCategory`- метод помогает добавить название категории компонента. Принимает `HTMLSpanElement`и значение типа `unknown`. Работает в связке с сеттером класса.

`setDescription` - метод помогает добавить описание компоненту. Принимает `HTMLSpanElement`и значение типа `unknown`. Работает в связке с сеттером класса.

`setCategoryCard` - метод принимает строковое значение названия категории карты/айтема, используя унаследованный метод `addStyleClass`, добавляет указанному элементу соответсвующий класс стиля, взятый из ассоциативного массива.

#### Класс `ShoppingCart`

Class `ShoppingCart` расширяет Базовый Class `Component<T>`
и реализует отображение корзины.
В конструкторе класс принимает 2 аргумента:

1. `container` - аргумент обязательный для класса родителя, который принимает DOM-объект, как узел тега с разметкой корзины, получаемой из темплейта при помощи функции утилиты `cloneTemplate` из `utils.ts`. Используется для динамического поиска элементов внутри узла-контейнера и также классом родителем при рендере узла. Имеет тип `HTMLElement`.

2. `actions` - используется для передачи обработчиков для клика по кнопке "оформить" в корзине. Имеет тип `IShopCartActions`

В классе используeтся сеттеры:  
`items` - вычисляемое свойство c условием наличия айтемов в корзине. Реализует замену узлов. Аргументом является коллекция отрендеренных айтемов типа `HTMLElement[]`, если коллекция пришла пустой, то создается с помощью метода-утилиты `createElement` тег-параграф с оповещением.

`price` - сеттер устанавливает актуальную цену суммы всех товаром находящихся в корзине используя метод класса родителя `setText`.

Класс реализует методы:
`setOrderIndex` - осуществляет нумерацию списка айтемов корзины
`setOrderButton` - метод реализует поведение кнопки "Оформить" в корзине при наличие/отсутствии добавленных в корзину айтемов. Использует метод класса родителя для добавления атрибута в разметке.

#### Класс `Modal`

Class `Modal` расширяет Базовый Class `Component<T>`
и реализует отображение модального окна, служит контейнером для корзины, превью одной карточки/айтема, формой оформления заказа и уведомлением об успешном оформлении товара.

В конструкторе класс принимает 3 аргумента:

1. `container` - аргумент обязательный для класса родителя, который принимает DOM-объект как узел тега с разметкой модального окна, получаемой из темплейта при помощи функции утилиты `cloneTemplate` из `utils.ts`. Используется как для динамического поиска элементов внутри узла-контейнера, так и для установки WebAPI слушателя 'click' и также классом при рендере узла. Имеет тип `HTMLElement`.

2. `events` - аргумент экзмепляра класса брокера событий `EventEmitter`. Имеет тип `IEvents`.

В классе используется сеттер `content` внутри которого используется встроенный метод API браузера `replaceChildren`, для создания коллекции узлов, для последующего их рендера

Класс реализует методы:

`close`, `open` - методы используются для закрытия/открытия модального окна.

Метод `open` вызывается внутри переопределенного метода `render` родителя, который служит "оберткой".
Метод `close` удаляет имеющиеся узлы переменной, вызывается при необходимости закрыть модальное окно.
Оба метода создают одноименные ивенты и используют методы родителя для изменения стилей.

`toggleCartBtn` - метод для блокировки кнопки при добавлении айтема из корзины. Принимает значение true/false`. Использует метод родителя для изменения атрибута элемента отображения.

`render` - метод который переопределяет метод родителя с целью изменения логики - вызовом открытия модального окна после рендера элементов. Возвращает полученный аргументом `container` типа `HTMLElement`.

#### Класс `Success`

Class `Success` расширяет Базовый Class `Component<T>`
и реализует отображение компонента успешного оформления заказа.
В конструкторе класс принимает 2 аргумента:

1. `container` - аргумент обязательный для класса родителя, который принимает DOM-объект окна подтверждения заказа получаемой из темплейта при помощи функции утилиты `cloneTemplate` из `utils.ts`. Используется при рендере узла. Имеет тип `HTMLElement`.

2. `actions` - используется для передачи обработчиков для клика по кнопке "За новыми покупками" после оформления заказа, также передает в колбэк вызов закрытия модального окна. Имеет тип `TSuccessActions`.

В классе используется сеттер `totalPrice` для установки итоговой цены оформленных товаров. Используя метод класса родителя, сеттер присвоением устанавливает цену в элемент DOM.

#### Класс `Form<T>`

Class `Form<T>` дженерик, расширяет базовый Class `Component<K>`,
является родителем классов `Order` и `Contacts`, в связке с которыми реализует отображение компонента оформления заказа.

В конструкторе класс принимает 2 аргумента:

1. `container` - аргумент обязательный для класса родителя, который принимает DOM-объект как узел тега с разметкой формы из классов наследников и передает в `super`. при помощи функции утилиты `cloneTemplate` из `utils.ts`. Используется как для динамического поиска элементов внутри узла-контейнера, так и для установки WebAPI слушателя 'click' и также классом при рендере узла. Имеет тип `HTMLElement`.

2. `events` - аргумент экзмепляра класса брокера событий `EventEmitter`. Имеет тип `IEvents`.

В классе используeтся сеттеры:
`valid` - устанавливает полученное логическое значение для кнопки сабмит формы, используется классами наследниками.
`errors` - устанавливает полученное текстовое значение полю ошибок при заполнении формы.

Класс реализует методы:
`onInputChange` - защищенный метод, для вызова внутри класса или его наследников, эмитит кастомный эвент из переданных в шаблон строк с названием переданного дженерика ключами и значением. Работает в связке с ивентом WebAPI для `input` внутри анонимного колбэка. Колбэк вызывается на каждое изменение поля формы.
`render` - ключевой метод для рендера формы. Метод оборачивает метод `render` родителя, передавая в него общие данные для всех форм наследников `valid`, `errors`. Принимает утилитный тип `Partial<T>` c переменным передаваемым типом в класс Form, который делает все свойства объекта переданного необязательными, добавляя свойства типа из дженерика. Возвращает HTMLElement.

#### Класс `Order`

Class `Order` расширяет Class `Form<T>`, и реализует отображение компонента формы заказа заполнения поля адреса и указания типа оплаты.
В конструкторе класс принимает 3 аргумента:

1. `container` - аргумент обязательный для класса родителя, который принимает DOM-объект как узел тега с разметкой формы и передает в `super`, используя функцию утилиту `cloneTemplate` из `utils.ts`. Используется для доступа элементов внутри узла-контейнера по атрибуту `name` и базовым классом при рендере узла. Имеет тип `HTMLElement`.

2. `events` - аргумент экзмепляра класса брокера событий `EventEmitter`. Имеет тип `IEvents`. В данном классе используется для вызова `super` классом родителем.

3. `actions` - используется для передачи обработчиков для клика по кнопкам выбора оплаты, имеет тип `TOrderActionss`.

В классе используeтся сеттер/геттер:  
`address` - принимает аргументом строку, реализует установку значения поля/возвращает текстовое значение формы поля адреса.

Класс реализует методы:  
`setNextToggle` - принимает аргумент булевое значение, используя сеттер родителя, переключает состояние кнопки.

`setStyleBorder` - принимает строку из имени в разметке. При вызове метод очищает стили с обоих кнопок, согласно принятой строке добавляет стиль обводки кнопки.

#### Класс `Contacts`

Class `Contacts` расширяет Class `Form<T>`, и реализует отображение компонента формы заказа заполнения контактов пользователя.
В конструкторе класс принимает 3 аргумента:

1. `container` - аргумент обязательный для класса родителя, который принимает DOM-объект как узел тега с разметкой формы и передает в `super`, используя функцию утилиту `cloneTemplate` из `utils.ts`. Используется для доступа элементов внутри узла-контейнера по атрибуту `name` и базовым классом при рендере узла. Имеет тип `HTMLElement`.

2. `events` - аргумент экзмепляра класса брокера событий `EventEmitter`. Имеет тип `IEvents`. В данном классе используется для вызова `super` классом родителем.

3. `actions` - используется для передачи обработчиков для клика кнопки "Оплатить" после заполнения полей контактов, имеет тип `TContactsActions`.

В классе используeтся сеттеры/геттеры:  
`phone` - принимает аргументом строку, реализует установку значения поля/возвращает текстовое значение формы поля телфона.  
`email` - принимает аргументом строку, реализует установку значения поля/возвращает текстовое значение формы поля почты.

Класс реализует метод `setNextToggle`, который принимает аргументом булевое значение, используя сеттер родителя, перключает состояние кнопки.

#### Класс `Component<T>`

Абстрактный базовый класс дженерик, который помогает определить основные методы/характеристики для классов наследников и помогает в создании компонентов отображения, и последующего их рендера. Конструктор класса принимает один аргумент `container` типа `HTMLElement`
Данный класс расширяют следующие классы приложения:

- `Page`
- `Cart`
- `ShoppingCart`
- `Modal`
- `Success`
- `Form`
- `Order`

Класс реализует методы помогающие решить задачу отображения для классов наследников:
`setText` - метод помогает добавить название категории компонента. Принимает `HTMLElement`и значение типа `unknown`. Работает в связке с сеттером класса-наследника.

`setDisabled` - метод помогает установить атрибут `disabled` для элементов. Принимает любой `HTMLElement` и булевое значение `true/false`. Например используется для кнопки при добавлении айтема в корзину, сигнализируя пользователю, что айтем уже в корзине.

`addStyleClass` - метод добавляет стиль тэгам карточек, также используется при открытии модального окна. Реализует это добавлением класса стиля, название которого передано вторым аргументом. Первым аргументом метод принимает целевой элемент для добавления стиля.

`removeStyleClass` - метод удаляет стиль при закрытии модального окна. Реализует это удалением класса стиля, название которого передано вторым аргументом. Первым аргументом метод принимает целевой элемент для добавления стиля.

`render`- главный метод класса, на вход принимает объект переданного дженерик типа, сам тип имеет использует утилитный тип `Partial`, который делает все свойства объекта переданного типа необязательными, возвращет HTML элемент.

### АПИ

---

#### Класс `StoreAPI`

Class `StoreAPI` и реализует работу с API, отправление fetch запросов методами get/post, получением айтемов с сервера и офомрлением покупки.

В конструкторе класс принимает 2 аргумента:

1. `url` - аргумент принимает собранныe адреса из файла `constants.ts` для получение с сервера данных JSON айтемов и изображений. Имеет тип `Url`.

2. `options` - аргумент объект, реализующий интерфейс RequestInit.

Класс реализует методы:

`handleResponse` - метод обработчик ответа сервера, возвращает JSON объект, или отклоняет возвращает ошибку.
`get` / `post` - используется методы для отправки фетч запроса на сервер двумя одноименными методами.

`getCatalogList`метод отправки кастомного GET-запроса

`orderItems` - метод отправки кастомного POST-запрос

### Презентер

---

Слой `перезентер` MVP
Презентер отвечает за обработку последовательности и за логику выполнения сценариев. Подпись и прослушка данных событий происходит именно в этом слое, в файле `index.ts`. Данный слой связывает слой данных(model) и слой представления(view).

Список событий для работы приложения:

`items:changed` - событие вызванное в результате получения данных API, по появлению выполнит рендер каждого айтемы для отображения из на главной странице.

`preview:changed` - вешается на клик по карточке на главной странице, при срабатывании происходит рендер модального окна с контентом карты, при вызове также вешает эмитит `cart:changed` на клик добавления айтема в корзину;

`cart:open` - ивент вешается на клик по корзине в хедере, при работе рендерит модальное окно с корзиной, также срабатывает при удалении айтема из карзины.

`order:open` - ивент вешается на клик кнопки внутри модального окна с карточкой для оформления заказа.

`order:submit` - создается динамически классом формы, при срабатывании отрисовывает отображение формы контактов.

`success` - создается при успешном ответе сервера после оформления заказа, при срабатывании отрисовывает отображение окна успешного оформления заказа.

`cart:preview` - ивент эмитится при при открытии корзины, рендерит строку как айтем в корзине, вешает на клик trashbin удаления строки-айтема, эмитит ивент `card:remove`

`card:remove` - ивент вешается на клик кнопки внутри айтема для удаления из корзины при нажатии кнопки.

`cart:changed` - весит на кнопке добавления в корзину в превью карты,меняет статус карты при добавлении в корзину, блокирует кнопку добавления.

`cart:updateCounter` - ивент эмитится при добавлении карты, удаление карты, очистки корзины для обновления счетчика корзины в хедере на главнйо странице.

`order.address:change`, `/^contacts..\*:change/` - ивенты слушают изменения полей инпутов формы оформления заказа и контактов. Внутри передают данные инпутов в стейт приложения, валидируют поля.

`modal:open`, `modal:close` - ивенты эмитятся при открытии и закрытии модального окна с целью блокировки прокрутки страницы.

Для событийной работы используется класс `EventEmitter`, благодаря ему в проекте поверх MVP модели реализуется паттерн "Наблюдатель", который позволяет создать и слушать созданные события.

Класс реализует методы: `on` `emit` `onAll` `of` `offAll` и другие.
В проекте использовались `on` и `emit` для реализации логики работы и `onAll` для отладки при написании кода.

