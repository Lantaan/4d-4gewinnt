import { Color, Vector3, Vector4 } from "three";
import Game from "../Logic/Game";
import { useMouseRaycaster } from "./Raycaster";
import Tile from "./Tile";


function Plane(props: {
    displayPos: Vector3,
    wPos: number, yPos: number,
    gameObject: Game,
}) {

    useMouseRaycaster();

    const relativePositionArray: Vector3[] = [];
    for (let x = 0; x < 4; x++) {
        for (let z = 0; z < 4; z++) {
            relativePositionArray.push(new Vector3(x, 0, z));
        }
    }

    return <>{
        relativePositionArray.map((pos, i) => {
            const gamePos = new Vector4(pos.x, props.yPos, pos.z, props.wPos),
                filling = props.gameObject.board[gamePos.x][gamePos.y][gamePos.z][gamePos.w];

            return <Tile
                gameObject={props.gameObject}
                gamePos={gamePos}
                displayPos={pos.add(props.displayPos)}
                filledBy={filling}
                key={i}
            />
        })
    }</>
}


export default Plane;