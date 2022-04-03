import React, { useEffect, useRef, useState } from "react";
import { BoxGeometry, Color, Mesh, Vector3 } from "three";
import StraightLine from "./Line";


function Box(props: {
    pos: Vector3, color: Color, scale?: Vector3,
    outline?: boolean, transparent?: boolean
}) {

    const gometryRef = useRef<BoxGeometry>();

    const [outline, setOutline] = useState<{ start: Vector3, end: Vector3 }[] | null>(null),
        [edges, setEdges] = useState<Vector3[] | null>(null);
    console.log(performance.now())
    useEffect(() => {
        if (!outline && gometryRef.current) {
            const verticesCoordinates: number[] = Array.from(gometryRef.current.attributes.position.array),
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
        outlineRadius = .05;


    return <>
        <mesh position={props.pos}>
            <boxGeometry args={[1 * scale.x, 1 * scale.y, 1 * scale.z]} ref={gometryRef} />
            <meshStandardMaterial color={props.color} transparent={props.transparent} />
        </mesh>

        {outline?.map((startEnd, i) =>
            <StraightLine start={startEnd.start} end={startEnd.end} color={outlineColor} radius={outlineRadius} key={i} />
        )}
        {edges?.map((edge, i) =>
            <mesh position={edge} key={i}>
                <sphereGeometry args={[outlineRadius]} />
                <meshStandardMaterial color={outlineColor} />
            </mesh>
        )}
    </>

}


export default Box;