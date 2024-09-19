import './assets/scss/styles.scss';
import {EventEmitter} from './components/base/events';
import {StoreAPI} from './components/StoreAPI';
import {AppState} from './components/AppData';
import {Page} from './components/Page';
import {ShoppingCardItem} from './components/ShoppingCardItem';
import {CatalogPreviewItem} from './components/CatalogPreviewItem';
import {CatalogItem} from './components/CatalogItem';
import {Modal} from './components/Modal';
import {ShoppingCard} from './components/ShoppingCard';
import {Order} from './components/Order';
import {Contacts} from './components/Contacts';
import {Success} from './components/Success';
import {API_URL as items, CDN_URL as images} from './utils/constants';
import {ensureElement, cloneTemplate} from './utils/utils';
import {ICatalogItem, ICardItem, IPaymentTypeEvent} from './types';

// templates
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardTemplate = ensureElement<HTMLTemplateElement>('#basket');
const itemCardTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const events = new EventEmitter();
const api = new StoreAPI({items, images});
const appData = new AppState(events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const success = new Success(cloneTemplate(successTemplate), events);
const shoppingCard = new ShoppingCard(cloneTemplate(cardTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

events.on('shoppingcard:click', () => {
    modal.render({
        content: order.render({
            address: '',
            valid: appData.isOrderValid(),
            errors: [],
        }),
    });
})

events.on('success:close', () => {
    events.emit('items:changed');
    modal.close();
})

// show card
events.on('card:click', () => {
    modal.render({content: shoppingCard.render()});
})

// show items on main page
events.on('items:changed', () => {
    const catalog = appData.catalog.map((item) => {
        const card = new CatalogItem(item, cloneTemplate(cardCatalogTemplate), events);

        return card.render({
            title: item.title,
            image: item.image,
            price: item.price,
            category: item.category,
        });
    });

    events.emit('catalog:update', catalog)
});

// show item when selected
events.on('preview:changed', (item: ICatalogItem) => {
    const card = new CatalogPreviewItem(item, cloneTemplate(cardPreviewTemplate), events);

    const isItemAdd = appData.cardState.has(item.id);

    events.emit('catalog:preview:item:toggle:button', {
        id: item.id,
        disabled: isItemAdd
    })

    modal.render({
        content: card.render({
            title: item.title,
            image: item.image,
            category: item.category,
            price: item.price,
            description: item.description,
            statusBtn: isItemAdd,
        }),
    });
});

// show card item in shopping card
events.on('card:preview', () => {
    const shoppingCardItems = appData.cardItems.map((item) => {
        const cardItem = new ShoppingCardItem(item, cloneTemplate(itemCardTemplate), events);

        return cardItem.render({
            title: item.title,
            price: item.price,
        });
    });

    events.emit('shoppingcard:items:update', shoppingCardItems);
    events.emit('shoppingcard:price:update', {price: appData.getTotal()});
});

// add item to card
events.on('card:changed', (item: ICatalogItem) => {
    appData.addItemCard(item);
    appData.setCardPreview();
    events.emit('shoppingcard:price:update', {price: appData.getTotal()});
});

// remove item from card
events.on('card:remove', (item: ICardItem) => {
    appData.removeCardItem(item);
    appData.setCardPreview();
    events.emit('shoppingcard:price:update', {price: appData.getTotal()});
});

events.on('payment:method:selected', (payload: IPaymentTypeEvent) => {
    appData.setPaymentType(payload.paymentType);
    events.emit('order:submit:toggle', {valid: appData.isOrderValid()});
});
// when order input changes
events.on('order.address:change', () => {
    appData.setAddress(order.getAddress()); // Используем метод getAddress
    events.emit('order:submit:toggle', {valid: appData.isOrderValid()});
});

// clicking submit order
events.on('order:submit', () => {
    modal.render({
        content: contacts.render({
            email: '',
            phone: '',
            valid: appData.isContactsValid(),
            errors: [],
        }),
    });
});

events.on('contacts:submit', () => {
    api.orderItems({
        ...appData.contactsState,
        ...appData.paymentState,
        total: appData.getTotal(),
        items: appData.cardItems
            .filter(cardItem => cardItem.price && cardItem.price > 0)
            .map(cardItem => cardItem.id)
    })
        .then((response) => {
            console.log(response);
            events.emit('success');
            events.emit('order:reset');
            appData.clearAllItems();
            appData.setCardPreview();
            events.emit('shoppingcard:price:update', {price: appData.getTotal()});
        })
        .catch((error) => {
            events.emit('card:open');
            console.error(error);
        });
});

events.on(/^contacts\..*:change/, () => {
    appData.setPhone(contacts.phone);
    appData.setEmail(contacts.email);
    events.emit('contacts:submit:toggle', {valid: appData.isOrderValid()});
    appData.isContactsValid();
});

// listening for successful server response
events.on('success', () => {
    modal.render({
        content: success.render({
            totalPrice: appData.getTotal(),
        }),
    });
});

// fetch items
api.getCatalogList()
    .then(appData.setCatalog.bind(appData))
    .catch((error) => console.log(error));
