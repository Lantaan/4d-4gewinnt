import { ReactElement, useState } from 'react';

let popupContent: ReactElement | null = null,
	setPopupContent: React.Dispatch<React.SetStateAction<ReactElement | null>> | undefined;

function PopupComponent(props: {}) {
	[popupContent, setPopupContent] = useState<ReactElement | null>(null);

	if (popupContent) {
		return (
			<>
				<div className='popup-bg' onClick={()=>openPopup?.close()}></div>
				<div className='popup-container'>{popupContent}</div>
			</>
		);
	}

	return <></>;
}

let openPopup: Popup|null = null;
class Popup {
	constructor(private content: ReactElement) {}
	show() {
		if (setPopupContent) {
			setPopupContent(this.content);
			openPopup = this;
		}
	}
	close() {
		if (setPopupContent) {
			setPopupContent(null);
			openPopup = null;
		}
	}
}

export { PopupComponent, Popup };
