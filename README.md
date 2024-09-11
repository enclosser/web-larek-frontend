# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

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
## Документация
IProductItem

Интерфейс IProductItem описывает структуру объекта, представляющего продукт в системе.

Свойства:

    id: string - Уникальный идентификатор продукта.
    description: string - Описание продукта.
    image: string - URL изображения продукта.
    title: string - Название продукта.
    category: string - Категория продукта.
    price: number | string - Стоимость продукта. Может быть числом или строкой.

IBasket

Интерфейс IBasket описывает структуру корзины и предоставляет методы для управления товарами в корзине.

Свойства:

    items: IProductItem[] - Массив товаров в корзине.
    totalPrice: number - Общая стоимость товаров в корзине.

Методы:

    addItem(item: IProductItem): void - Добавляет товар в корзину.
    removeItem(itemId: string): void - Удаляет товар из корзины по его идентификатору.
    calculateTotalPrice(): number - Вычисляет общую стоимость товаров в корзине.

PaymentType

Перечисление PaymentType определяет доступные типы оплаты.

Значения:

    Online = 'Онлайн' - Оплата онлайн.
    OnDelivery = 'При получении' - Оплата при получении.

IOrder

Интерфейс IOrder описывает структуру заказа.

Свойства:

    phone: string - Номер телефона покупателя.
    email: string - Электронная почта покупателя.
    paymentType: PaymentType - Тип оплаты.
    items: IProductItem[] - Массив товаров в заказе.

IAppState

Интерфейс IAppState описывает состояние приложения.

Свойства:

    products: IProductItem[] - Массив товаров.
    basket: IBasket - Объект корзины.
    order: IOrder | null - Объект заказа или null, если заказ отсутствует.
    formErrors: FormErrors - Ошибки формы.

IOrderStatus

Интерфейс IOrderStatus описывает статус заказа.

Свойства:

    status: string - Статус заказа.
    totalPrice: number - Общая стоимость заказа.

FormErrors

Тип FormErrors представляет ошибки формы как частичный рекорд полей заказа и строк с ошибками.

typescript

export type FormErrors = Partial<Record<keyof IOrder, string>>;

IModal

Интерфейс IModal описывает структуру модального окна.

Свойства:

    content: HTMLElement - Контент модального окна.

IModalData

Интерфейс IModalData аналогичен IModal и используется для передачи данных модального окна.

Свойства:

    content: HTMLElement - Контент модального окна.

LarekAPI

Класс LarekAPI расширяет класс Api и реализует интерфейс ILarekAPI, предоставляя методы для взаимодействия с сервером.

Методы:

    getProductList(): Promise<IProductItem[]> - Выполняет GET-запрос для получения списка продуктов. Возвращает промис с массивом объектов IProductItem.

    getProduct(id: string): Promise<IProductItem> - Выполняет GET-запрос для получения информации о продукте по идентификатору id. Возвращает промис с объектом IProductItem.

    placeOrder(order: IOrder): Promise<IOrderStatus> - Выполняет POST-запрос для размещения заказа. Принимает объект IOrder и возвращает промис с объектом IOrderStatus.

Примечания:

    Методы используют асинхронные операции для взаимодействия с сервером.
    URL для запросов определяются в модуле apiEndpoints.

ProductItem

Класс ProductItem реализует интерфейс IProductItem и представляет собой модель продукта.

Свойства:

    id: string - Уникальный идентификатор продукта.
    description: string - Описание продукта.
    image: string - URL изображения продукта.
    title: string - Название продукта.
    category: string - Категория продукта.
    price: number | string - Стоимость продукта.

Конструктор:

typescript

constructor(id: string, description: string, image: string, title: string, category: string, price: number | string)
