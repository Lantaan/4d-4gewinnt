import { Color, Vector3 } from "three";
import Tile from "./Tile";

function Plane(props: {postion: Vector3}) {
    const positionArray: Vector3[] = [];
    for (let i = 0; i <= 4; i++) {
        for (let j = 0; j <= 4; j++) {
            positionArray.push(new Vector3(i, 0, j));
        }
    }

    return <>
        {positionArray.map((pos, i) => <Tile pos={pos.add(props.postion)} filledBy={"no marker"} key={i}/>)}
    </>
}


export default Plane;