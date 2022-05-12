import { Line, useHelper } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { Box3Helper, BoxGeometry, BoxHelper, BufferGeometry, Color, Mesh, SphereGeometry, Vector2, Vector3 } from "three";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial";
import { addMouseDown, addPointerEnter, addPointerLeave } from "./Raycaster";


const spheres: { geometry: ReactElement<SphereGeometry>, radius: number }[] = [],
    boxes: { geometry: ReactElement<BoxGeometry>, scale: Vector3 }[] = [];


function Box(props: {
    pos: Vector3, color: Color, scale?: Vector3,
    outline?: boolean, transparent?: boolean,
    onMouseDown?: () => void, onMouseEnter?: () => void, onMouseLeave?: () => void
}) {
    const scale = props.scale === undefined ? new Vector3(1, 1, 1) : props.scale,
        outlineColor = new Color(0x000fff),
        outlineRadius = 0.002;

    const meshRef = useRef<Mesh>();

    const boxHelperRef = useHelper(meshRef, BoxHelper, outlineColor);
    let outlineGeometry: BufferGeometry | undefined = undefined;
    useEffect(() => {
        const boxHelper = boxHelperRef.current as BoxHelper;
        if (boxHelper) {
            outlineGeometry = boxHelper.geometry;
        }
    }, []);

    useEffect(() => {
        const mesh = meshRef.current;
        if (mesh) {
            if (props.onMouseEnter) addPointerEnter(mesh.id, props.onMouseEnter);
            if (props.onMouseLeave) addPointerLeave(mesh.id, props.onMouseLeave);
            if (props.onMouseDown) addMouseDown(mesh.id, props.onMouseDown);
        }
    }, []);
    const [a] = useState(Math.random())
    const { scene } = useThree();
    useEffect(() => {
        if (outlineGeometry) {
            const vertices: number[] = Array.from(outlineGeometry.attributes.position.array),
                verticesVector = vertices.map((v, i) => new Vector3(v, vertices[i + 1], vertices[i + 2]));

            verticesVector.forEach((vertex1, i) => {
                verticesVector.slice(i + 1).forEach((vertex2) => {
                    if (vertex1.distanceTo(vertex2) === 1) {
                        const positions = [vertex1.x, vertex1.y, vertex1.z, vertex2.x, vertex2.y, vertex2.z];

                        const lineGeometry: LineGeometry = new LineGeometry().setPositions(positions),
                            lineMaterial = new LineMaterial({
                                color: outlineColor.getHex(),
                                linewidth: outlineRadius
                            })
                        scene.add(new Line2(lineGeometry, lineMaterial));
                    }
                })
            });
        }
    }, []);

    const box = boxes.find(box => box.scale.equals(scale));
    let boxGeometry: ReactElement<BoxGeometry> | undefined = box?.geometry;
    if (!boxGeometry) {
        boxGeometry = <boxGeometry args={[1 * scale.x, 1 * scale.y, 1 * scale.z]} />
        boxes.push({ geometry: boxGeometry, scale });
    }

    return <>
        <mesh position={props.pos} ref={meshRef}>
            {boxGeometry}
            <meshStandardMaterial color={props.color} transparent={props.transparent} opacity={props.transparent ? 0 : 1} />
        </mesh>
    </>

}


export default Box;