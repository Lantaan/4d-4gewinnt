import './App.css';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color, Mesh, Vector2, Vector3 } from 'three';
import Tile from './Tile';
import Plane from './Plane';
import { CustomRaycaster } from './Raycaster';
import Game from '../Logic/Game';
import Tower from './Tower';
import Box from './Box';
import { OrbitControls } from '@react-three/drei';
import { PopupComponent } from './Popup';

const gameObject = new Game();
gameObject.test();
function App() {
	return (
		<>
			<div style={{ width: '100vw', height: '100vh' }}>
				<Canvas>
          <CustomRaycaster />
					<OrbitControls makeDefault />
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					{<Tower gameObject={gameObject} displayPos={new Vector3(0, 0, 0)} wPos={0} />}
				</Canvas>
			</div>
			<PopupComponent />
		</>
	);
	
}

export default App;
