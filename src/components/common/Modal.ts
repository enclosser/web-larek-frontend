import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

interface IModalData {
    content: HTMLElement;
}

export class Modal extends Component<IModalData> {
    private _closeButton: HTMLButtonElement;
    private _content: HTMLElement;

    constructor(container: HTMLElement, private events: IEvents) {
        super(container);

        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);

        // Используем один обработчик для закрытия модального окна
        this._closeButton.addEventListener('click', this._onClose.bind(this));
        this.container.addEventListener('click', this._onClose.bind(this));

        // Останавливаем распространение кликов внутри контента
        this._content.addEventListener('click', (event) => event.stopPropagation());
    }

    set content(value: HTMLElement) {
        if (value) {
            this._content.replaceChildren(value);
        }
    }

    open() {
        this._toggleModal(true);
        this.events.emit('modal:open');
    }

    close() {
        this._toggleModal(false);
        this.content = null;
        this.events.emit('modal:close');
    }

    // Вынесена логика для открытия/закрытия в отдельный метод
    private _toggleModal(isActive: boolean) {
        this.container.classList.toggle('modal_active', isActive);
    }

    private _onClose() {
        this.close();
    }

    render(data: IModalData): HTMLElement {
        super.render(data);
        this.open();
        return this.container;
    }
}
