import { ReactElement, useState } from "react";

//ein PopupComponent muss als React Element (also als <PopupComponent />) in App.tsx zurückgegeben werden
//danach kann man ein Popup Objekt erzeugen mit new Popup
//diese Popup ist aber erstmal nur ein JavaSccript Objekt, und wird nicht angezeigt
//mit popup.show() bzw. popup.close() kann man festlegen ob ein Popup offen ist
//wenn popupContent nicht null ist, wird ein Popup angezeigt
//popupContent muss ein React State sein, damit PopupComponent rerendert wenn popupContent verändert wird
//sonst würde eine Veränderung von popupContent nicht dargestellt werden
//aber useState() kann man nur in einer Funktion benutzen,
//und popupContent muss global veränderbar sein können, damit man es in popup.show() festlegen kann
//deshalb sind popupContentund setPopupContent globale variablen
//diese werden dann in PopupComponent erst zu einem State
let popupContent: ReactElement | null = null,
  setPopupContent:
    | React.Dispatch<React.SetStateAction<ReactElement | null>>
    | undefined;

//aktuell offenes Popup
let openPopup: Popup | null = null;

function PopupComponent(props: {}) {
  //mach den State global zugreifbar
  [popupContent, setPopupContent] = useState<ReactElement | null>(null);

  if (popupContent) {
    return (
      <>
        <div
          className="popup-bg"
          onClick={() => openPopup?.close() /*man kann das Popup wegclicken*/}
        ></div>
        <div className="popup-container">{popupContent}</div>
      </>
    );
  }

  return <></>;
}

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
