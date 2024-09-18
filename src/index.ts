import './assets/scss/styles.scss';
import {EventEmitter} from './components/base/events';
import {StoreAPI} from './components/StoreAPI';
import {AppState} from './components/AppData';
import {Page} from './components/Page';
import {Card as CatalogItem, Card as CartItem} from './components/Card';
import {Modal} from './components/Modal';
import {ShoppingCart} from './components/ShoppingCart';
import {Order} from './components/Order';
import {Contacts} from './components/Contacts';
import {Success} from './components/Success';
import {API_URL as items, CDN_URL as images} from './utils/constants';
import {ensureElement, cloneTemplate} from './utils/utils';
import {ICatalogItem, ICartItem, TUpdateCounter, ICardView, IShoppingCartView} from './types';

// templates
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cartTemplate = ensureElement<HTMLTemplateElement>('#basket');
const itemCartTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const events = new EventEmitter();
const api = new StoreAPI({items, images});
const appData = new AppState(events);
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const success = new Success(cloneTemplate(successTemplate), events);
const shoppingCart = new ShoppingCart(cloneTemplate(cartTemplate), events);


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

// show cart
events.on('card:click', () => {
    modal.render({content: shoppingCart.render()});
})

// show items on main page
events.on('items:changed', () => {
    page.catalog = appData.catalog.map((item) => {
        const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit('preview:changed', item),
        });
        card.setCategoryCard(item.category);
        return card.render({
            title: item.title,
            image: item.image,
            price: item.price,
            category: item.category,
        });
    });
});

// show item when selected
events.on('preview:changed', (item: ICatalogItem) => {
    const card = new CatalogItem(cloneTemplate(cardPreviewTemplate), {
        onClick: () => events.emit('cart:changed', item),
    });

    const isItemAdd = appData.cartState.has(item.id);

    // Теперь напрямую обращаемся к свойству _button
    if (card._button) {
        card._button.disabled = isItemAdd;
    }

    card.setCategoryCard(item.category);
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

// show cart
// events.on('cart:open', () => {
//     modal.render({content: shoppingCart.render()});
// });

// show cart item in shopping cart
events.on('cart:preview', () => {
    shoppingCart.items = appData.cartItems.map((item) => {
        const cartItem = new CartItem(cloneTemplate(itemCartTemplate), {
            onClick: () => events.emit('card:remove', item),
        });
        return cartItem.render({
            title: item.title,
            price: item.price,
        });
    });
});

// add item to cart
events.on('cart:changed', (item: ICatalogItem) => {
    appData.addItemCart(item);
    appData.setCartPreview();
    shoppingCart.price = appData.getTotal();
});

// remove item from cart
events.on('card:remove', (item: ICartItem) => {
    appData.removeCartItem(item);
    appData.setCartPreview();
    shoppingCart.price = appData.getTotal();
});

// picking payment type when making order
const order = new Order(cloneTemplate(orderTemplate), events, {
    onClickPayment: (event: Event) => {
        const paymentType = (event.target as HTMLElement).getAttribute('name');
        appData.setPaymentType(paymentType);
        order.setStyleBorder(paymentType);
        order.setNextToggle(appData.isOrderValid());
    },
});

// when order input changes
events.on('order.address:change', () => {
    appData.setAddress(order.getAddress()); // Используем метод getAddress
    order.setNextToggle(appData.isOrderValid());
});

// when errors validation occurs
events.on('orderErrors:change', (errors: Record<string, string>) => {
    if (errors) order.errors = `${errors.payment || ''} ${errors.address || ''}`;
    else order.errors = '';
});

events.on('contactsErrors:change', (errors: Record<string, string>) => {
    if (errors) contacts.errors = `${errors.email || ''} ${errors.phone || ''}`;
    else order.errors = '';
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

// placing an order
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

events.on('contacts:submit', () => {
    api.orderItems({
        ...appData.contactsState,
        ...appData.paymentState,
        total: appData.getTotal(),
        items: appData.cartItems
            .filter(cardItem => cardItem.price && cardItem.price > 0)
            .map(cardItem => cardItem.id)
    })
        .then((response) => {
            console.log(response);
            events.emit('success');
            appData.clearAllItems();
            appData.setCartPreview();
            shoppingCart.price = appData.getTotal();
        })
        .catch((error) => {
            events.emit('cart:open');
            console.error(error);
        });
});

events.on(/^contacts\..*:change/, () => {
    appData.setPhone(contacts.phone);
    appData.setEmail(contacts.email);
    contacts.setNextToggle(appData.isContactsValid());
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

// open close modal window
events.on('modal:open', () => (page.locked = true));
events.on('modal:close', () => (page.locked = false));

// updating cart counter in header on main
events.on('cart:updateCounter', (count: TUpdateCounter) => {
    page.cartCounter = count;
});

// fetch items
api
    .getCatalogList()
    .then(appData.setCatalog.bind(appData))
    .catch((error) => console.log(error));
