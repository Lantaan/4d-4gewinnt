import { Vector3 } from "three";
import Game from "../Logic/Game";
import Plane from "./Plane";

function Tower(props: {displayPos: Vector3, wPos: number, gameObject: Game}) {
    const relativePositionArray: Vector3[] = [];
    for(let y=0; y<4; y++){
        relativePositionArray.push(new Vector3(0, y, 0));
    }

    return<>{
        relativePositionArray.map((pos, i) => <Plane
            displayPos={pos.add(props.displayPos)}
            yPos={pos.y}
            wPos={props.wPos}
            gameObject={props.gameObject}
            key={i}
        />)
    }</>
}


export default Tower;