import React, { ReactElement, useEffect, useRef, useState } from "react";
import { BoxGeometry, Color, Mesh, SphereGeometry, Vector3 } from "three";
import StraightLine from "./Line";
import { addMouseDown, addPointerEnter, addPointerLeave } from "./Raycaster";


const spheres: { geometry: ReactElement<SphereGeometry>, radius: number }[] = [],
    boxes: { geometry: ReactElement<BoxGeometry>, scale: Vector3 }[] = [];


function Box(props: {
    pos: Vector3, color: Color, scale?: Vector3,
    outline?: boolean, transparent?: boolean,
    onMouseDown?: () => void, onMouseEnter?: () => void, onMouseLeave?: () => void
}) {
    const meshRef = useRef<Mesh>();

    const [outline, setOutline] = useState<{ start: Vector3, end: Vector3 }[] | null>(null),
        [edges, setEdges] = useState<Vector3[] | null>(null);

    useEffect(() => {
        if (!outline && meshRef.current) {
            const geometry = meshRef.current.geometry;
            const verticesCoordinates: number[] = Array.from(geometry.attributes.position.array),
                vertices: Vector3[] = [];

            verticesCoordinates.forEach((vertex, i) =>
                i % 3 === 0 ?
                    vertices.push(new Vector3(
                        verticesCoordinates[i], verticesCoordinates[i + 1], verticesCoordinates[i + 2]
                    )) : undefined
            );

            const worldVertices: Vector3[] = vertices.map(vertex => vertex.clone().add(props.pos));
            setEdges(worldVertices);


            const linesBetweenVerticesEnds: { start: Vector3, end: Vector3 }[] = [];

            worldVertices.forEach((start, i) => {
                const uncheckedVertices = worldVertices.slice(i, -1);

                uncheckedVertices.forEach((end) => {
                    if (end) {
                        //not a diagonal connection if 2 coordinates are identical
                        let identicalCoordinates = Number(start.x === end.x) + Number(start.y === end.y) + Number(start.z === end.z);
                        if (identicalCoordinates >= 2) linesBetweenVerticesEnds.push({ start, end });
                    }
                })
            });


            setOutline(linesBetweenVerticesEnds)
        }
    })


    const scale = props.scale === undefined ? new Vector3(1, 1, 1) : props.scale,
        outlineColor = new Color(0x000fff),
        outlineRadius = .025;


    useEffect(() => {
        const mesh = meshRef.current;

        if (mesh) {
            if (props.onMouseEnter) addPointerEnter(mesh.id, props.onMouseEnter);
            if (props.onMouseLeave) addPointerLeave(mesh.id, props.onMouseLeave);
            if (props.onMouseDown) addMouseDown(mesh.id, props.onMouseDown);
        }
        console.log(mesh?.id)
    }, [])

    const sphere = spheres.find(sphere => sphere.radius === outlineRadius)
    let sphereGeometry: ReactElement<SphereGeometry> | undefined = sphere?.geometry;
    if (!sphereGeometry) {
        sphereGeometry = <sphereGeometry args={[outlineRadius]} />
        spheres.push({ geometry: sphereGeometry, radius: outlineRadius });
    }

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

        {outline?.map((startEnd, i) =>
            <StraightLine start={startEnd.start} end={startEnd.end} color={outlineColor} radius={outlineRadius} key={i} />
        )}
        {edges?.map((edge, i) =>
            <mesh position={edge} key={i}>
                {sphereGeometry}
                <meshStandardMaterial color={outlineColor} />
            </mesh>
        )}
    </>

}


export default Box;