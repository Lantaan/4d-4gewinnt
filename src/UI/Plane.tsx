import {useEffect, useRef} from "react";
import {Color, DoubleSide, Euler, Mesh, Vector3, Vector4} from "three";
import Game from "../Logic/Game";
import {addPointerEnter, addPointerLeave} from "./Raycaster";
import Tile from "./Tile";

const outlineColor = new Color(0x000000);
const outlineWidth = 0.05

function Plane(props: {
    displayPos: Vector3;
    wPos: number;
    yPos: number;
    gameObject: Game;
}) {
    //feld mit 16 Elmenten
    //jedes Element gibt die position einer Zelle, relativ zur Ebene an
    //relative Anzeigeposition und relative Logikposition der Zelle sind identisch
    const relativePositionArray: Vector3[] = [];
    for (let x = 0; x < 4; x++) {
        for (let z = 0; z < 4; z++) {
            relativePositionArray.push(new Vector3(x, 0, z));
        }
    }

    //alle Objekt die man returnt wurden zum Zeitpunkt der Funktion noch nicht gerendert
    //Ref ermöglicht es auf ein Objekt, das man zurückgibt zuzugreifen (sobald es gerendert wurde)
    //sobald die Funktion das erste mal gelaufen ist (= alle Rückgabewerte gerendert wurden)
    //wird planeRef.current zum Objekt auf das man zugreifen will
    //das Objekt dem planeRef zugeordnet ist, wird im return angegeben
    //mit plane, ist die Ebene gemeint, die unter den Zellen ist (ich glaube sie ist magenta)
    const planeRef = useRef<Mesh>();
    const planeRotation = new Euler(Math.PI / 2);
    const planePosition = props.displayPos
        .clone()
        .add(new Vector3(1.5, -0.51, 1.5));

    //der code in useEffect wird ausgeführt, sobald die Funktion ein mal gelaufen ist
    //also kann man in useEffect auf planeRef.current zugreifen
    useEffect(() => {
        const mesh = planeRef.current;
        //nötig weil sich typescript sonst beschwert
        if (mesh) {
            //wenn Maus auf der magenta Ebene ist,
            //können keine Zellen hinter der Ebene angeclickt werden
            addPointerEnter(mesh.id, () => null);
            addPointerLeave(mesh.id, () => null);
        }
    }, []);

    return (
        <>
            {
                //für jedes element in relativePositionArray erzeuge eine neue "Tile" (= Zelle)
                relativePositionArray.map((pos, i) => {
                    //position der Zelle in props.gameObject
                    const gamePos = new Vector4(pos.x, props.yPos, pos.z, props.wPos),
                        //gibt an, ob ein Spieler auf die Zelle einen Marker plaziert hat
                        filling =
                            props.gameObject.board[gamePos.x][gamePos.y][gamePos.z][
                                gamePos.w
                                ],
                        //pos ist eine referenz zu einem Vector3. Wenn man .add() macht würde pos verändert werden,
                        //weil es nur eine referenz ist. Deshalb braucht man .clone(), damit pos gleich bleibt
                        displayPos = pos.clone().add(props.displayPos);

                    return (
                        <Tile
                            gameObject={props.gameObject}
                            gamePos={gamePos}
                            displayPos={displayPos}
                            filledBy={filling}
                            key={i}
                        />
                    );
                })
            }
            {/*die Zellen Außenlinien*/}
            {
                [0, 1, 2, 3, 4].map(i => {
                    return (
                        <mesh position={props.displayPos.clone().add(new Vector3(i-0.5, -0.5, 1.5))} key={i}>
                            <boxGeometry args={[outlineWidth, outlineWidth, 4]}/>
                            <meshBasicMaterial color={outlineColor}/>
                        </mesh>
                    )
                })
            }
            {
                [0, 1, 2, 3, 4].map(i => {
                    return (
                        <mesh position={props.displayPos.clone().add(new Vector3(1.5, -0.5, i-0.5))} key={i}>
                            <boxGeometry args={[4, outlineWidth, outlineWidth]}/>
                            <meshBasicMaterial color={outlineColor}/>
                        </mesh>
                    )
                })
            }
        </>
    );
}

export default Plane;
