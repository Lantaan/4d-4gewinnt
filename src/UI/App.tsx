import './App.css';
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh, Vector2, Vector3 } from 'three';
import Tile from './Tile';


function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Tile pos={new Vector3(-1.2, 0, 0)} filledBy={"no marker"} />
      <Tile pos={new Vector3(1.2, 0, 0)} filledBy={"player1"} />
    </Canvas>
  );
}

export default App;
