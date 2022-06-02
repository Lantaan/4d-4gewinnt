import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import { CustomRaycaster } from "./Raycaster";
import Game from "../Logic/Game";
import Tower from "./Tower";
import { OrbitControls } from "@react-three/drei";
import { PopupComponent } from "./Popup";

const gameObject = new Game();
const towerStartingPos = new Vector3(-8, -2, 0),
  towerChange = new Vector3(8, 0, 0);

function App() {
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas>
          <CustomRaycaster />
          <OrbitControls makeDefault />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />

          <Tower
            gameObject={gameObject}
            displayPos={towerStartingPos.clone()}
            wPos={0}
          />
          <Tower
            gameObject={gameObject}
            displayPos={towerStartingPos.clone().add(towerChange.clone())}
            wPos={0}
          />
          <Tower
            gameObject={gameObject}
            displayPos={towerStartingPos.clone().add(
              towerChange.clone().multiplyScalar(2)
            )}
            wPos={0}
          />
          <Tower
            gameObject={gameObject}
            displayPos={towerStartingPos.clone().add(
              towerChange.clone().multiplyScalar(3)
            )}
            wPos={0}
          />
        </Canvas>
      </div>
      <PopupComponent />
    </>
  );
}

export default App;
