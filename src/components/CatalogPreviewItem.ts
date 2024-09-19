import {Card} from './Card';
import {TCardActions, ICardView, TCard, ICatalogItem, IToggleCardButtonEvent} from '../types';
import {IEvents} from "./base/events";

export class CatalogPreviewItem extends Card<TCard> implements ICardView {
    constructor(
        item: ICatalogItem,
        container: HTMLElement,
        events: IEvents,
    ) {
        super(container, events);

        if (this._button) {
            this._button.addEventListener('click',
                () => {
                    events.emit('card:changed', item)
                });
        }

        this.setCategoryCard(item.category);

        events.on('catalog:preview:item:toggle:button', (payload: IToggleCardButtonEvent) => {
                if (payload.id === item.id && this._button) {
                    this._button.disabled = payload.disabled;
                }
            }
        )
    }
}
