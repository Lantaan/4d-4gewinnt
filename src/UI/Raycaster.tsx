import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Camera, Raycaster, Scene, Vector2 } from "three";

//react-three-fiber (eine library die wir benutzen) hat als eigebaute Funktionalität,
//dass Funktionen ausgeführt werden können wenn man mit der Maus über ein 3d-Objekt kommt
//oder ein 3d-Objekt verlässt oder eins anclickt
//ABER es gibt keine eingebaute Möglichkeit es so zumachen, dass Objekte,
//die hinter anderen 3d-Objekten versteckt sind, nicht auch als angeclickt zählen
//deshalb muss man hier das rad neuerfinden, damit man nicht mit einem Click
//eine ganze Reihe an Feldern füllt
//Three.js hat einen Raycaster, mit dem man Objekte finden kann die durch einen Strahl geschnitten werden
const raycaster: Raycaster = new Raycaster(),
  //pointer gibt die Mausposition an. Warum habe ich in anderen Dateien as mousePosition genannt,
  //aber hier pointer? Weil die docs es pointer genannt haben, und es für die anderen Sachen keine docs gab
  pointer: Vector2 = new Vector2();

//3d-Objekt (fast) das gleiche wie mesh, aber ich kann sie nicht außerinanderhalten und sie sind fast identisch
//deshalb benutze ich die zwei begriffe als synonyme

//hashmaps, die eine Mesh id zu einer Funktion mappen
//wenn man mit Maus auf ein mesh kommt / ein mesh verlässt / auf ein mesh clickt
//wird die entsprechende Funktion ausgeführt
//andere meshes die in den hashmaps sind, können meshes hinter ihnen verdecken
//wenn man einfach so ein mesh hat, dessen id aber in keiner map ist,
//werden pointer events für andere Objekte hinter dem mesh trotzdem ausgelöst
//das muss so sein, weil in Box.tsx ein (fast) unsichtbarer BoxHelper benutzt wird
//und er würde dann pointer evevnts blocken, die er nicht blocken sollte
const onPointerEnterFunctions = new Map<number, () => void>(),
  onPointerLeaveFunctions = new Map<number, () => void>(),
  onClickFunctions = new Map<number, (e: MouseEvent) => void>();

//speichert die id des letzten meshes, das über dem die Maus war, als sie zuletzt bewegt wurde
//bzw. ob die Maus über keinem mesh war (null)
let previousObjectId: number | null = null;

let listenerElement: HTMLElement | null = null;

//wird jedes frame wiederhohlt
//jeden frame will man einen ray aus der Maus casten, und schauen was er trifft
//glücklicher Weise gibt es in den three.js docs, eine page dazu, wie man einen ray as der Maus castet
//https://threejs.org/docs/#api/en/core/Raycaster
function frame(camera: Camera, scene: Scene) {
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  //.some ist wie .forEach, nur dass man es frühzeitig beenden kann, wenn man true returnt
  //also werden alle sachen die vom ray getroffen werden durchgegangen, bis man true return,
  //oder es keine weiteren intersect gibt
  intersects.some((intersect) => {
    const object = intersect.object,
      id = object.id;

    let callbackForObjectExists: boolean = false;

    //wenn es die Maus nicht immernoch auf dem gleichen Objekt ist
    if (id !== previousObjectId) {
      //soll die pointerLeave funktion vom verlassenen Objekt ausgeführt werden
      //(wenn es diese Funktion gibt)
      if (previousObjectId !== null) {
        const leaveCallback = onPointerLeaveFunctions.get(previousObjectId);
        if (leaveCallback) leaveCallback();
      }

      //wenn das neue Objekt eine pointerEnter funktion hat, soll diese ausgeführt werden
      const enterCallback = onPointerEnterFunctions.get(id);
      if (enterCallback) {
        callbackForObjectExists = true;
        enterCallback();
      }
      previousObjectId = id;
    }

    //beende den .some loop, wenn callbackForObjectExists true ist
    return callbackForObjectExists;
  });

  //wenn die Maus auf garkein Objekt zeigt, sollen trotzdem pointerLeave funktionen aufgerufen werden
  if (intersects.length === 0) {
    if (previousObjectId !== null) {
      const leaveCallback = onPointerLeaveFunctions.get(previousObjectId);
      if (leaveCallback) leaveCallback();
    }
    previousObjectId = null;
  }
}

//setzt den Raycaster, vor allem eventListener, auf. Wird im RaycasterComponent aufgerufen
function useMouseRaycaster() {
  //der canvas, auf dem die ganzen 3d Sachen als 2d gezeichnet werden
  listenerElement = useThree().gl.domElement;
  useFrame(({ camera, scene }) => {
    frame(camera, scene);
  });

  useEffect(() => {
    //ausrufezeichen nach listenerElement weil Typescript faxen macht
    listenerElement!.addEventListener("pointermove", onPointerMove);
    function onPointerMove(e: PointerEvent) {
      //https://threejs.org/docs/#api/en/core/Raycaster
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    listenerElement!.addEventListener("mousedown", onMouseDown);
    function onMouseDown(e: MouseEvent) {
      if (previousObjectId !== null) {
        const clickCallback = onClickFunctions.get(previousObjectId);
        if (clickCallback) clickCallback(e);
      }
    }
  }, []);
}
//ist ein ReactComponent, existiert nur um useMouseRaycaster aufzurufen
function CustomRaycaster() {
  useMouseRaycaster();
  return <></>;
}

//wenn man diese Funktionen in einer anderen Datei importiert, kann man die hashmaps manipulieren
//also kann man einem 3d-Objekt entsprechende pointer funktionen zuordnen
function addPointerEnter(objectId: number, callback: () => void) {
  onPointerEnterFunctions.set(objectId, callback);
}
function addPointerLeave(objectId: number, callback: () => void) {
  onPointerLeaveFunctions.set(objectId, callback);
}
function addMouseDown(objectId: number, callback: () => void) {
  onClickFunctions.set(objectId, callback);
}

export { CustomRaycaster, addPointerEnter, addPointerLeave, addMouseDown };
