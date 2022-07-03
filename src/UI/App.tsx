import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import { CustomRaycaster } from "./Raycaster";
import Game from "../Logic/Game";
import Tower from "./Tower";
import { PopupComponent } from "./Popup";
import CameraManager from "./CameraManager";
import { useState } from "react";

//handlet die Logik hinter dem Spiel. Pauls verantwortung
//der boolean im Argument gibt an ob eine einzige Reihe reicht um zu gewinnen,
//oder es mit Punkten ist
const game = new Game(true);
//das Spielfeld besteht aus 4 Türmen
//untere linke vordere Ecke vom Turm 1 ist bei towerStartingPos
//alle weiteren Türme werden um towerChange verschoben
const towerStartingPos = new Vector3(-8, -2, 0),
  towerChange = new Vector3(8, 0, 0);
//Mitten der Türme (nur auf x und z achsen)
//Kamera kann mit linksklick halten, um Turmmitten rotiert werden
//y vom Zentrum der Kamerarotation kann mit mausrad verändert werden,
//deshalb ist y hier nicht angegeben
const towerCenters = [
  towerStartingPos.clone().add(new Vector3(1.5, 0, 1.5)),
  towerStartingPos.clone().add(towerChange).add(new Vector3(1.5, 0, 1.5)),
  towerStartingPos
    .clone()
    .add(towerChange.clone().multiplyScalar(2))
    .add(new Vector3(1.5, 0, 1.5)),
  towerStartingPos
    .clone()
    .add(towerChange.clone().multiplyScalar(3))
    .add(new Vector3(1.5, 0, 1.5)),
];

//quasi main Funktion der App
//bestimmt was angezeigt wird
function App() {
  //App() wird rerendert wenn setCurrentTower() benutzt wird
  //currentTower kann nur über setCurrentTower() verändert werden
  //gibt den Index des aktuellen Turms an (= w Koordinate des aktuellen Turms)
  const [currentTower, setCurrentTower] = useState(0);

  //return bestimmt was auf dem Bildschirm erscheint
  return (
    <>
      {/*html-ähnliche Schreibweise.*/}
      <div style={{ width: "100vw", height: "100vh" }}>
        {/*Pfeil-buttons links und rechts*/}
        <button
          onClick={() => {
            //wenn durch Veränderung nicht index out of bounds, geh zum Turm rechts
            if (currentTower < 3) setCurrentTower(currentTower + 1);
          }}
          style={{
            position: "absolute",
            zIndex: 1000,
            right: 0,
            height: "100vh",
            fontSize: "5vw",
            //halbdurchsichtig, wenn man wegen index out of bounds nicht benutzen kann
            opacity: currentTower === 3 ? 0.5 : 1,
            pointerEvents: currentTower === 3 ? "none" : "auto",
          }}
        >
          {">"}
        </button>
        <button
          onClick={() => {
            //wenn durch Veränderung nicht index out of bounds, geh zum Turm links
            if (currentTower > 0) setCurrentTower(currentTower - 1);
          }}
          style={{
            position: "absolute",
            zIndex: 1000,
            left: 0,
            height: "100vh",
            fontSize: "5vw",
            //halbdurchsichtig, wenn man wegen index out of bounds nicht benutzen kann
            opacity: currentTower === 0 ? 0.5 : 1,
            pointerEvents: currentTower === 0 ? "none" : "auto",
          }}
        >
          {"<"}
        </button>
        {/*THREE.js Canvas. Dadrin können 3d Objekte angezeigt werden*/}
        <Canvas>
          {/*keine html componente, sondern eigene
					andere Schreibweise um CustomRaycaster() aufzurufen
					CustomRaycaster wird benutzt um aus der 2d Mausposition
					zu bestimmen auf welches 3d Objekt gezeigt wird
					ermöglicht auch Funktionen aufzurufen wenn maus auf ein Objekt zeigt/drückt*/}
          <CustomRaycaster />
          {/*ruft CameraManager(props) auf, mit: 
					props.cameraCenters = townCenters
					props.currentCenterIndex = currentTower...
					Wenn irgendeins der props sich verändert, wird CameraManager rerendert
					CameraManager ermöglicht die Rotation der Camera*/}
          <CameraManager
            cameraCenters={towerCenters}
            currentCenterIndex={currentTower}
            radius={5}
          />

          {/*Beleuchtung von allen Seiten*/}
          <ambientLight intensity={1} />

          {/*Spielfeld*/}
          <Tower
            gameObject={game}
            displayPos={towerStartingPos.clone()}
            wPos={0}
          />
          <Tower
            gameObject={game}
            displayPos={towerStartingPos.clone().add(towerChange.clone())}
            wPos={1}
          />
          <Tower
            gameObject={game}
            displayPos={towerStartingPos
              .clone()
              .add(towerChange.clone().multiplyScalar(2))}
            wPos={2}
          />
          <Tower
            gameObject={game}
            displayPos={towerStartingPos
              .clone()
              .add(towerChange.clone().multiplyScalar(3))}
            wPos={3}
          />
        </Canvas>
      </div>
      {/*content wird verändert um unterschiedliche Popups zu erzeugen*/}
      <PopupComponent />
    </>
  );
}

export default App;
