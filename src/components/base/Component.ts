export abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) {
		// Код в конструкторе исполняется до всех объявлений в дочернем классе
	}

	// Переключение класса
	toggleClass(element: HTMLElement, className: string, force?: boolean) {
		element?.classList.toggle(className, force);
	}

	// Установка текстового содержимого
	protected setText(element: HTMLElement, value: unknown) {
		if (element) element.textContent = String(value);
	}

	// Смена статуса блокировки
	setDisabled(element: HTMLElement, state: boolean) {
		element?.toggleAttribute('disabled', state);
	}

	// Скрыть элемент
	protected setHidden(element: HTMLElement) {
		element.style.display = 'none';
	}

	// Показать элемент
	protected setVisible(element: HTMLElement) {
		element.style.display = '';
	}

	// Установить изображение с альтернативным текстом
	protected setImage(element: HTMLImageElement, src: string, alt = '') {
		if (element) {
			element.src = src;
			element.alt = alt;
		}
	}

	// Вернуть корневой DOM-элемент и обновить данные
	render(data?: Partial<T>): HTMLElement {
		Object.assign(this, data);
		return this.container;
	}
}
