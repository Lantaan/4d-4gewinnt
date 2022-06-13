import './App.css';
import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import { CustomRaycaster } from './Raycaster';
import Game from '../Logic/Game';
import Tower from './Tower';
import { OrbitControls } from '@react-three/drei';
import { PopupComponent } from './Popup';
import CameraManager from './CameraManager';
import { useRef, useState } from 'react';

const gameObject = new Game();
const towerStartingPos = new Vector3(-8, -2, 0),
	towerChange = new Vector3(8, 0, 0);

const towerCenters = [
	towerStartingPos.clone().add(new Vector3(1.5, 0, 1.5)),
	towerStartingPos.clone().add(towerChange).add(new Vector3(1.5, 0, 1.5)),
	towerStartingPos.clone().add(towerChange.clone().multiplyScalar(2)).add(new Vector3(1.5, 0, 1.5)),
	towerStartingPos.clone().add(towerChange.clone().multiplyScalar(3)).add(new Vector3(1.5, 0, 1.5))
];

function App() {
	const [currentTower, setCurrentTower] = useState(0);

	return (
		<>
			<div style={{ width: '100vw', height: '100vh' }}>
				<button
					onClick={() => {
						if (currentTower < 3) setCurrentTower(currentTower + 1);
					}}
					style={{
						position: 'absolute',
						zIndex: 1000,
						right: 0,
						height: '100vh',
						fontSize: '5vw',
						opacity: currentTower === 3 ? 0.5 : 1,
						pointerEvents: currentTower === 3 ? 'none' : 'auto'
					}}>
					{'>'}
				</button>
				<button
					onClick={() => {
						if (currentTower > 0) setCurrentTower(currentTower - 1);
					}}
					style={{
						position: 'absolute',
						zIndex: 1000,
						left: 0,
						height: '100vh',
						fontSize: '5vw',
						opacity: currentTower === 0 ? 0.5 : 1,
						pointerEvents: currentTower === 0 ? 'none' : 'auto'
					}}>
					{'<'}
				</button>
				<Canvas>
					<CustomRaycaster />
					<CameraManager cameraCenters={towerCenters} currentCenterIndex={currentTower} radius={5} />
					<ambientLight />
					<pointLight position={[10, 10, 10]} />

					<Tower gameObject={gameObject} displayPos={towerStartingPos.clone()} wPos={0} />
					<Tower gameObject={gameObject} displayPos={towerStartingPos.clone().add(towerChange.clone())} wPos={0} />
					<Tower
						gameObject={gameObject}
						displayPos={towerStartingPos.clone().add(towerChange.clone().multiplyScalar(2))}
						wPos={0}
					/>
					<Tower
						gameObject={gameObject}
						displayPos={towerStartingPos.clone().add(towerChange.clone().multiplyScalar(3))}
						wPos={0}
					/>
				</Canvas>
			</div>
			<PopupComponent />
		</>
	);
}

export default App;
