import { useHelper } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { BoxHelper, Color, Mesh, Vector3 } from "three";
import { addMouseDown, addPointerEnter, addPointerLeave } from "./Raycaster";

//man hat sehr viele Boxen. Man kann für alle gleichen Boxen die selbe geometry benutzen
//das sollte man auch machen, weil es das Programm deutlich schneller laufen lässt
const boxGeometry = <boxGeometry args={[1, 1, 1] /*breite, höhe, tiefe*/} />;

function Box(props: {
  pos: Vector3;
  color: Color;
  outline?: boolean;
  transparent?: boolean;
  onMouseDown?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const outlineColor = new Color(0x000fff),
    outlineRadius = 0.002;

  //siehe Plane.tsx für eine genaue Beschreibung von useRef()
  const meshRef = useRef<Mesh>();

  //useHelper ist eine Abstraction von "Drei" library
  //ein BoxHelper ist ein Mesh, das einen Rahmen um ein anderes Mesh herum darstellt
  //useHelper erzeugt so einen BoxHelper mit der Farbe "outlineColor",
  //um den Mesh von meshRef drumrum
  useHelper(meshRef, BoxHelper, outlineColor);

  //man muss auf meshRef.current zugreifen
  //aber meshRef.current existiert beim ersten render nicht
  //deshalb benutzt man useEffect um direkt nach dem ersten Render was zu machen
  //genauso wie bei Plane.tsx
  useEffect(() => {
    const mesh = meshRef.current;
    if (mesh) {
      //funktionen für Raycaster. Siehe Raycaster.tsx
      //basically macht es so, dass wenn über die Box gehovert/geclickt wird,
      //die entsprechenden Funktionen die über props übergeben wurden, aufgerufen werden
      if (props.onMouseEnter) addPointerEnter(mesh.id, props.onMouseEnter);
      if (props.onMouseLeave) addPointerLeave(mesh.id, props.onMouseLeave);
      if (props.onMouseDown) addMouseDown(mesh.id, props.onMouseDown);
    }
  }, []);

  return (
    <>
      <mesh position={props.pos} ref={meshRef}>
        {boxGeometry}
        <meshStandardMaterial
          color={props.color}
          transparent={props.transparent}
          //wenn es transparent sein, soll setze die Farbintensität auf 0
          opacity={props.transparent ? 0 : 1}
        />
      </mesh>
    </>
  );
}

export default Box;
