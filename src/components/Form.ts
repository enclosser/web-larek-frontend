import { Component } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement } from '../utils/utils';
import { IFormView, TFormState } from '../types';

export class Form<T> extends Component<TFormState> implements IFormView<T> {
    protected _submit: HTMLButtonElement;
    protected _errors: HTMLElement;

    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);

        this._submit = ensureElement<HTMLButtonElement>(
            'button[type=submit]',
            this.container
        );
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        // Добавляем обработчики событий для input и submit
        this.addEventListeners();
    }

    // Универсальный метод для добавления всех обработчиков событий
    private addEventListeners() {
        this.container.addEventListener('input', this.handleInputChange.bind(this));
        this.container.addEventListener('submit', this.handleSubmit.bind(this));
    }

    // Обработка изменения input
    private handleInputChange(e: Event) {
        const target = e.target as HTMLInputElement;
        if (!target.name) return; // Предотвращение ошибок для элементов без имени

        const field = target.name as keyof T;
        const value = target.value;
        this.onInputChange(field, value);
    }

    // Обработка отправки формы
    private handleSubmit(e: Event) {
        e.preventDefault();
        this.events.emit(`${this.container.name}:submit`);
    }

    // Вызов события изменения input
    protected onInputChange(field: keyof T, value: string) {
        this.events.emit(`${this.container.name}.${String(field)}:change`, {
            field,
            value,
        });
    }

    // Установка валидности формы
    set valid(value: boolean) {
        this._submit.disabled = !value;
    }

    // Установка ошибок формы
    set errors(value: string) {
        this.setText(this._errors, value);
    }

    // Рендеринг состояния формы
    render(state: Partial<T> & TFormState) {
        const { valid, errors, ...inputs } = state;
        super.render({ valid, errors });
        Object.assign(this, inputs); // Присваивание дополнительных полей состояния
        return this.container;
    }
}
