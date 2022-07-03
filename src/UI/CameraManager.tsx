import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Vector2, Vector3 } from "three";

//gibt an wie schnell man hoch/runter "scrollen" kann
const ySensitivity = 1 / 2;
let currentCenter = new Vector3();

//nimmt ein Feld an Rotationszentren als Argument
//dann kann man  mit der Maus um das Zentrum mit index props.currentCenterIndex rotieren
//props.radius gibt an, wie weit die Camera vom Rotationszentrum ist
//solange ctrl gedrückt ist, ist man rausgezoomt = der radius ist sechs mal props.radius
export default function CameraManager(props: {
  cameraCenters: Vector3[];
  currentCenterIndex: number;
  radius: number;
}) {
  //krieg das camera Objekt, das von der Library automatisch erschaffen wird
  const { camera } = useThree();
  //mit .clone() wird ein neues Objekt erzeugt, anstatt pass by references
  currentCenter = props.cameraCenters[props.currentCenterIndex].clone();

  //2 Winkel die die Camera position bestimmen
  let alpha = 0,
    beta = Math.PI / 2;
  //aktuelle entfernung der Kamera vom aktuellen Rotationszentrum
  //kann anders sein als props.radius
  let radius = props.radius;

  //updateCameraPosition muss jedes mal aufgerufen werden, wenn alpha,beta oder radius verändert werden,
  //um die veränderungen der Variablen in die Kamera Positon zu übertragen
  updateCameraPosition();
  //https://math.stackexchange.com/questions/1881758/find-point-on-a-sphere-given-two-angles
  function updateCameraPosition() {
    //x, y und z sind Koordinaten der Kamera relativ zum Rotationszentrum
    const x = Math.sin(beta) * Math.sin(alpha) * radius,
      y = Math.cos(beta) * radius,
      z = Math.cos(alpha) * Math.sin(beta) * radius;
    camera.position.set(x, y, z).add(currentCenter);
    camera.lookAt(currentCenter);
  }

  let mousedown = false;
  //speichert vorherige Mausposition um Veränderungen wahrzunehmen
  let previousMousePos = new Vector2();
  useEffect(() => {
    //wenn mausrad benutzt wird, soll den Camera Fokus man hoch/runter bewegen können
    //also verschiebt man das Rotationszentrum hoch/runter
    document.addEventListener(
      "wheel",
      (
        e
      ) /*e ist das Event, es speicher z.B. in welche Richtung gescrollt wird*/ => {
        //unterschiedliche Browser handlen das Mausrad unterschiedlich
        //deshalb nimmt man Math.sign(e.deltaY) um die Richtung vom Mausrad zu bestimmen
        //nicht den wert von e.deltaY
        const delta = Math.sign(e.deltaY);
        currentCenter.y += delta * ySensitivity;
        updateCameraPosition();
      }
    );

    document.addEventListener("mousedown", (e) => (mousedown = true));
    document.addEventListener("mouseup", (e) => (mousedown = false));
    document.addEventListener("mousemove", (e) => {
      if (mousedown) {
        const newMousePos = new Vector2(e.clientX, e.clientY);
        //Veränderung der Mausposition seit letztem mosemove Event
        const delta = newMousePos.clone().sub(previousMousePos);
        alpha -= delta.x * 0.01;
        beta -= delta.y * 0.01;
        previousMousePos = newMousePos;
        updateCameraPosition();
      } else {
        previousMousePos.set(e.clientX, e.clientY);
      }
    });

    //zoom raus wenn ctrl gedrückt wird
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey) {
        radius = props.radius * 6;
        updateCameraPosition();
      }
    });
    //wenn ctrl losgelassen wird, setze zoom zurück
    document.addEventListener("keyup", (e) => {
      if (!e.ctrlKey) {
        radius = props.radius;
        updateCameraPosition();
      }
    });
  }, []);

  return <></>;
}
