import {Card} from './Card';
import {ICardView, ICatalogItem, TCard} from '../types';
import {IEvents} from "./base/events";

export class CatalogItem extends Card<TCard> implements ICardView {
    constructor(
        item: ICatalogItem,
        container: HTMLElement,
        events: IEvents,
    ) {
        super(container, events);

        (this._button || container).addEventListener('click',
            () => {
                events.emit('preview:changed', item)
            });

        this.setCategoryCard(item.category);
    }
}
