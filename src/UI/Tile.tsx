import { useEffect, useRef, useState } from "react"
import { Color, Mesh, Vector3 } from "three"

function Tile(props: {
    pos: Vector3,
    filledBy: "a" | "b" | null
}) {
    const ref = useRef<Mesh>(null!);
    const [hovered, hover] = useState(false);

    let color;
    if (props.filledBy === "a") color = new Color(0xff0000);
    else if (props.filledBy === "b") color = new Color(0x00ff00);
    else if (!props.filledBy) color = new Color(0x000000);

    return (<>
        
    </>)
}


export default Tile;