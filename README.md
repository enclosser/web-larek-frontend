# Проектная работа "Веб-ларек"

Реализация интернет-магазин с товарами для веб-разработчика

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Внешний вид:

Основное окно

[![2024-09-14-15-54-28.png](https://i.postimg.cc/VkDP9h21/2024-09-14-15-54-28.png)](https://postimg.cc/WdFyT52f)

Корзина

[![image.png](https://i.postimg.cc/rprgy01b/image.png)](https://postimg.cc/JyRjPhdc)

Окно оформления заказа

[![image.png](https://i.postimg.cc/tJ2Nvhb1/image.png)](https://postimg.cc/PvvDPvPh)


Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

- `src/types/index.ts` — файл экспортируемых типов

- `.env` — файл окружения с адресом до API

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


