/*class Popup {
	constructor(private content: HTMLElement | string) {}
	show() {
		const container = document.createElement('div');
		container.classList.add('popup-container');

		if (this.content instanceof HTMLElement) container.appendChild(this.content);
        else container.innerHTML = this.content;

		document.body.appendChild(container);
	}
}*/

import { ReactElement, useState } from 'react';

let popupContent: ReactElement | null = null,
	setPopupContent: React.Dispatch<React.SetStateAction<ReactElement|null>>|undefined;

function PopupComponent(props: {}) {
	[popupContent, setPopupContent] = useState<ReactElement|null>(null);
	return <div className={popupContent ? 'popup-container' : ''}>{popupContent}</div>;
}

class Popup {
	constructor(private content: ReactElement) {}
	show() {
		if (setPopupContent) setPopupContent(this.content);
	}
	close() {
		if (setPopupContent) setPopupContent(null);
	}
}

export { PopupComponent, Popup };
