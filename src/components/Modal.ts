import {Component} from './base/Component';
import {ensureElement} from '../utils/utils';
import {IEvents} from './base/events';
import {IModalView, TModalData} from '../types';

export class Modal extends Component<TModalData> implements IModalView {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;
	protected _nextButton?: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		this.addEventListeners();
	}

	// Метод для добавления всех необходимых обработчиков событий
	private addEventListeners(): void {
		this._closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	// Установка контента в модальном окне
	set content(value: HTMLElement | null) {
		this._content.replaceChildren(value || document.createTextNode(''));
	}

	// Открытие модального окна
	open(): void {
		this.addStyleClass(this.container, 'modal_active');
		this.events.emit('modal:open');
	}

	// Закрытие модального окна
	close(): void {
		this.removeStyleClass(this.container, 'modal_active');
		this.content = null;
		this.events.emit('modal:close');
	}

	// Переключение состояния кнопки (вкл./выкл.)
	toggleCartBtn(state: boolean): void {
		if (this._nextButton) {
			this.setDisabled(this._nextButton, state);
		}
	}

	// Рендер данных и открытие модального окна
	render(data: TModalData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
