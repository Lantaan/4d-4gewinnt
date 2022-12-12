import {Vector3, Vector4} from "three";
import {planeChange, towerChange, towerStartingPos} from "./consts";

export function gameToUICoordinates(gameCoords: Vector4){
    return new Vector3(
        gameCoords.x + gameCoords.w * towerChange.x + towerStartingPos.x,
        gameCoords.y * planeChange.y + towerStartingPos.y,
        gameCoords.z
    )
}