import { IEvents } from "./events";

// Гарда для проверки, является ли объект моделью
export const isModel = (obj: unknown): obj is Model<any> => obj instanceof Model;

/**
 * Базовая модель для отличия от простых объектов с данными
 */
export abstract class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}

	// Сообщить о изменениях модели
	emitChanges(event: string, payload: object = {}) {
		this.events.emit(event, payload);
	}

	// Здесь можно добавить общие методы для моделей
}
