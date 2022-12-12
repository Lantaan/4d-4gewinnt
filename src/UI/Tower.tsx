import {Material, Mesh, Vector3, Vector4} from "three";
import Game from "../Logic/Game";
import Plane from "./Plane";
import {Ref} from "react";
import {planeChange} from "../utils/consts";
import {gameToUICoordinates} from "../utils/gameToUICoordinates";

//props.displayPos, props.wPos und props.gameObject können in der Funktion aufgerufen werden
//props.displayPos und props.wPos sind 3d Vektoren
//props.gameObject ist eine Instanz von Game (in ../Logic/)
function Tower(props: { displayPos: Vector3; wPos: number; gameObject: Game }) {
    //Feld, in dem jedes element, ein objekt ist,
    //und die attribute game, und display als 3d Vektoren hat
    //speichert die positionen der einzelnen Ebenen in einem Turm
    //Koordinaten werden relativ zu Turm Koordinaten angegeben
    //relativePositionArray[0].game gibt die position der Ebene im props.gameObject (Logik-Teil) an
    //relativePositionArray[0].display gibt die vordere linke Ecke
    //der angezeigten Ebene an (relativ zu props.displayPos)
    const relativePositionArray: { game: Vector3; display: Vector3 }[] = [];
    //füllt das Feld
    for (let y = 0; y < 4; y++) {
        //Feld.push hängt element ganz hinten an
        relativePositionArray.push({
            game: new Vector3(0, y, 0),
            //in y-Richtung gestreckt, damit man auch die inneren Zellen anclicken kann
            display: gameToUICoordinates(new Vector4(0, y, 0, props.wPos)),
        });
    }

    return (
        <>
            {//für jedes element in relativePositionsArray
                //erzeuge eine Ebene (bzw. führe Plane() aus)
                relativePositionArray.map((pos, i) => (
                    <Plane
                        displayPos={pos.display.clone()}
                        yPos={pos.game.y}
                        wPos={props.wPos}
                        gameObject={props.gameObject}
                        //key wird von React benutzt für interne Optimierung aka schwarze Magie
                        key={i}
                    />
                ))}
        </>
    );
}

export default Tower;
