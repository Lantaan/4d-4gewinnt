import { useEffect, useRef, useState } from "react"
import { Color, Mesh, Vector3, Vector4 } from "three"
import Game from "../Logic/Game";
import Box from "./Box";

function Tile(props: {
    displayPos: Vector3, gamePos: Vector4, gameObject: Game,
    filledBy: "no marker" | "player1" | "player2"
}) {
    const [hover, setHover] = useState(false),
        [filledBy, setFilledBy] = useState<"no marker" | "player1" | "player2">(props.filledBy);

    const transparent = filledBy === "no marker" && !hover;

    let color: Color = new Color(0x000000);
    if (filledBy === "player1") color = new Color(0xff0000);
    else if (filledBy === "player2") color = new Color(0x00ff00);
    else if (!filledBy) color = new Color(0x000000);

    return (<>
        <Box pos={props.displayPos} color={color} transparent={transparent}
        scale={new Vector3(1, 1, 1)}
            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
            onMouseDown={() => {
                const gamePos = props.gamePos,
                    turnMessage = props.gameObject.turn(props.gamePos)
                //alert(turnMessage);
                setFilledBy(props.gameObject.board[gamePos.x][gamePos.y][gamePos.z][gamePos.w]);
            }} />
    </>)
}


export default Tile;