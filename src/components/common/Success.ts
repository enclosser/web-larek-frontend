import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface ISuccess {
    total: number;
}

interface ISuccessActions {
    onClick: () => void;
}

export class Success extends Component<ISuccess> {
    private _close: HTMLElement;
    private _total: number;

    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);

        // Используем ensureElement для поиска элемента, который закроет окно
        this._close = ensureElement<HTMLElement>('.state__action', this.container);

        // Добавляем обработчик события, если он был передан
        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }

    set total(value: number) {
        this._total = value;
        this.updateTotalDisplay();
    }

    private updateTotalDisplay() {
        const totalElement = ensureElement<HTMLElement>('.state__total', this.container);
        this.setText(totalElement, this._total);
    }
}
