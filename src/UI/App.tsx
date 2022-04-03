import './App.css';
import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Mesh, Vector2, Vector3 } from 'three';
import Tile from './Tile';
import Plane from './Plane';


function App() {
  return (
    <div style={{width: "100vw", height: "100vh"}}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Plane postion={new Vector3(-2,-2,0)}/>
      </Canvas>
    </div>
  );
}

export default App;
