import './App.css';
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh } from 'three';
import Tile from './Tile';


function App() {
  return (
        <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Tile meshProps={{position: [-1.2, 0, 0]}} filledBy={null}/>
      <Tile meshProps={{position: [1.2, 0, 0]}} filledBy={"a"}/>
    </Canvas>
  );
}

export default App;
