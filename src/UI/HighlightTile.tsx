import {Color, Mesh, Vector3} from "three";
import {useEffect, useRef} from "react";
import {ignoreObj} from "./Raycaster";

const sizeIncrease = 0.1;
const highlightColor = new Color(0xff9900);
const boxGeometry = <boxGeometry
    args={[1 + sizeIncrease, 1 + sizeIncrease, 1 + sizeIncrease] /*breite, höhe, tiefe*/}/>;

export function HighlightTile(props: { pos: Vector3, transparent: boolean }) {
    const displayPos = props.pos.clone().add(new Vector3(sizeIncrease, sizeIncrease, sizeIncrease).multiplyScalar(0));
    const meshRef = useRef<Mesh>();

    useEffect(()=>ignoreObj(meshRef.current!.id), [])

    return (
        <>
            <mesh position={displayPos} ref={meshRef}>
                {boxGeometry}
                <meshStandardMaterial
                    color={highlightColor}
                    transparent={props.transparent}
                    //wenn es transparent sein, soll setze die Farbintensität auf 0
                    opacity={props.transparent ? 0 : 1}
                />
            </mesh>
        </>
    );
}