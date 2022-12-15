import {Vector4} from "three";
import {Dispatch, SetStateAction} from "react";

const highlightDispatchByPos: Dispatch<SetStateAction<boolean>>[][][][] = [];

export function setToHighlightMap(gamePos: Vector4, dispatch: Dispatch<SetStateAction<boolean>>) {
    const argsX = highlightDispatchByPos[gamePos.x];
    if (argsX === undefined) {
        highlightDispatchByPos[gamePos.x] = [];
    }
    const argsY = highlightDispatchByPos[gamePos.x][gamePos.y];
    if (argsY === undefined) {
        highlightDispatchByPos[gamePos.x][gamePos.y] = [];
    }
    const argsZ = highlightDispatchByPos[gamePos.x][gamePos.y][gamePos.z];
    if (argsZ === undefined) {
        highlightDispatchByPos[gamePos.x][gamePos.y][gamePos.z] = [];
    }

    highlightDispatchByPos[gamePos.x][gamePos.y][gamePos.z][gamePos.w] = dispatch;
}

export function setHighlightTileWithGamePos(gamePos: Vector4, setTo: boolean) {
    try {
        const dispatch = highlightDispatchByPos[gamePos.x][gamePos.y][gamePos.z][gamePos.w];
        if (dispatch) {
            dispatch(setTo);
        }
    } catch (e) {}
}