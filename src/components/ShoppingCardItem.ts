import {Card} from './Card';
import {TCardActions, ICardView, TCard, ICatalogItem, ICardItem} from '../types';
import {IEvents} from "./base/events";

export class ShoppingCardItem extends Card<TCard> implements ICardView {
	constructor(
		item:  ICardItem,
		container: HTMLElement,
		events: IEvents,
	) {
		super(container, events);

		if (this._button) {
			this._button.addEventListener('click',
				() => {
					events.emit('card:remove', item)
				});
		}
	}
}
