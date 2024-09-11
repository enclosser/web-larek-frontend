import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { ensureElement } from "../../utils/utils";

interface IFormState {
    valid: boolean;
    errors: string[];
}

export class Form<T> extends Component<IFormState> {
    private _submit: HTMLButtonElement;
    private _errors: HTMLElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        this.attachEventListeners();
    }

    // Установка слушателей событий
    private attachEventListeners() {
        this.container.addEventListener('input', this.handleInputChange.bind(this));
        this.container.addEventListener('submit', this.handleSubmit.bind(this));
    }

    // Обработчик изменения инпутов
    private handleInputChange(e: Event) {
        const target = e.target as HTMLInputElement;
        const field = target.name as keyof T;
        this.onInputChange(field, target.value);
    }

    // Обработчик события отправки формы
    private handleSubmit(e: Event) {
        e.preventDefault();
        this.events.emit(`${this.container.name}:submit`);
    }

    // Логика обработки изменения инпута
    protected onInputChange(field: keyof T, value: string) {
        this.events.emit(`${this.container.name}.${String(field)}:change`, { field, value });
    }

    set valid(value: boolean) {
        this._submit.disabled = !value;
    }

    set errors(value: string) {
        this.setText(this._errors, value);
    }

    render(state: Partial<T> & IFormState) {
        const { valid, errors, ...inputs } = state;
        super.render({ valid, errors });
        Object.assign(this, inputs);
        return this.container;
    }
}
