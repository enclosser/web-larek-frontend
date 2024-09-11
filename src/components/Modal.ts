import { Component } from "./base/Component";
import { ensureElement } from "../utils/utils";
import { IEvents } from "./base/events";

interface IModalData {
	content: HTMLElement;
}

export class Modal extends Component<IModalData> {
	private _closeButton: HTMLButtonElement;
	private _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		// Using arrow functions to maintain the correct `this` context
		this._closeButton.addEventListener('click', () => this.close());
		this.container.addEventListener('click', () => this.close());
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement | null) {
		if (value) {
			this._content.replaceChildren(value);
		} else {
			this._content.innerHTML = ''; // Clear content if null
		}
	}

	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}

	close() {
		this.container.classList.remove('modal_active');
		this.content = null; // Ensure content is cleared
		this.events.emit('modal:close');
	}

	render(data: IModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
