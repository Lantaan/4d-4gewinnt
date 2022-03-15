import { useRef, useState } from "react"
import { Mesh } from "three"

function Tile(props: {
    meshProps: JSX.IntrinsicElements["mesh"],
    filledBy: "a" | "b" | null
}) {
    const ref = useRef<Mesh>(null!);
    const [hovered, hover] = useState(false);

    let color;
    if (props.filledBy === "a") color = "red"
    else if (props.filledBy === "b") color = "green"
    else if (!props.filledBy) color = "black"

    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(event) => 0}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color}
                wireframe={!!props.filledBy}
                transparent={!!props.filledBy} />
        </mesh>
    )
}


export default Tile;