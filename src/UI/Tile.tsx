import { useEffect, useRef, useState } from "react"
import { Color, Mesh, Vector3 } from "three"
import Box from "./Box";

function Tile(props: {
    pos: Vector3,
    filledBy: "no marker" | "player1" | "player2"
}) {
    const ref = useRef<Mesh>(null!);
    const [hovered, hover] = useState(false);

    const filled = props.filledBy !== "no marker";

    let color: Color = new Color(0x000000);
    if (props.filledBy === "player1") color = new Color(0xff0000);
    else if (props.filledBy === "player2") color = new Color(0x00ff00);
    else if (!props.filledBy) color = new Color(0x000000);

    return (<>
        <Box pos={props.pos} color={color} transparent={filled} />
    </>)
}


export default Tile;