import React, { useEffect, useRef, useState } from "react";
import { BoxGeometry, Color, Mesh, Vector3 } from "three";
import StraightLine from "./Line";


function Box(props: {
    pos: Vector3, color: Color, scale?: Vector3,
    outline?: boolean, transparent?: boolean
}) {

    const gometryRef = useRef<BoxGeometry>();
    const [outline, setOutline] = useState<{ start: Vector3, end: Vector3 }[] | null>(null);
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


            const linesBetweenVerticesEnds: { start: Vector3, end: Vector3 }[] = [];

            vertices.forEach((vertex, i) => {
                const start = vertices[i],
                    end = vertices[i + 1];

                //not a diagonal connection if 2 coordinates are identical
                let identicalCoordinates = start.x === end.x + start.y === end.y
                if(start.distanceTo(end) <= scale) linesBetweenVerticesEnds.push({ start, end })
            });


            setOutline(linesBetweenVerticesEnds)
        }
    })


    const scale = props.scale === undefined ? new Vector3(1, 1, 1) : props.scale;


    return <>
        <mesh position={props.pos}>
            <boxGeometry args={[1 * scale.x, 1 * scale.y, 1 * scale.z]} ref={gometryRef} />
            <meshStandardMaterial color={props.color}
                transparent={props.transparent} wireframe={props.outline} />
        </mesh>

        {outline?.map(startEnd => <StraightLine start={startEnd.start} end={startEnd.end} />)}
    </>

}


export default Box;