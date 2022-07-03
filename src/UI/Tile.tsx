import { useState } from "react";
import { Color, Vector3, Vector4 } from "three";
import Game from "../Logic/Game";
import Box from "./Box";
import { Popup } from "./Popup";

function Tile(props: {
  displayPos: Vector3;
  gamePos: Vector4;
  gameObject: Game;
  filledBy: "no marker" | "player1" | "player2";
}) {
  //wenn setHover oder setFilledBy aufgerufen wird, wird Tile rerendert
  const [hover, setHover] = useState(false),
    [filledBy, setFilledBy] = useState<"no marker" | "player1" | "player2">(
      props.filledBy
    );

  //wenn man über den Würfel hovert, soll es gefüllt werden,
  //also nicht durchsichtig sein
  const transparent = filledBy === "no marker" && !hover;

  //füllfarbe vom Würfel
  //wenn Würfel gefüllt ist, ist entweder rot oder grün
  //wenn würfel nicht gefüllt ist, spielt color nur eine Rolle,
  //wenn man drüberhovert und dann soll der Würfel mit schwarz gefüllt sein
  let color: Color = new Color(0x000000);
  if (filledBy === "player1") color = new Color(0xff0000);
  else if (filledBy === "player2") color = new Color(0x00ff00);
  else color = new Color(0x000000);

  return (
    <>
      <Box
        //.clone() notwendig, damit pos nicht passed by reference wird
        pos={props.displayPos.clone()}
        color={color}
        transparent={transparent}
        //wenn Maus über dem Würfel ist, ist hover true, sonst false
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        //wenn auf Würfel draufgeclickt wird, soll:
        //ein Zug gemacht werden
        //ein Popup mit infos zum Zug angezeigt werden
        //wenn ein Zug nicht gemacht werden kann (z.B. weil der Würfel schon gefüllt ist),
        //handelt diese Situation trotzdem die turn methode
        onMouseDown={() => {console.log(props.gamePos)
          const gamePos = props.gamePos,
            turnResult = props.gameObject.turn(props.gamePos);

          //turnMessage und messageColor werden im Popup benutzt
          let turnMessage: string, messageColor: string;
          //wenn es keinen Sieger gibt, aber ein Zug gemacht werden konnte,
          if (!turnResult.winner && turnResult.turn) {
            //string interpolation ist fancy für:
            //turnMessage = "It's your turn" + turnResult.turn.toString();
            turnMessage = `It's your turn ${turnResult.turn}`;
            messageColor = "black";
          } else if (turnResult.winner) {
            turnMessage = `${turnResult.winner} won!`;
            messageColor = "green";
          } else {
            //wenn ein Zug nicht gemacht werden konnte
            turnMessage = `This is not a valid placement`;
            messageColor = "red";
          }

          const popup = new Popup(
            (
              <>
                <h1
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    color: messageColor,
                  }}
                >
                  {turnMessage}
                </h1>
                <div style={{ justifyContent: "center", display: "flex" }}>
                  <button
                    onClick={() => popup.close()}
                    style={{ fontSize: "20px", width: "60px" }}
                  >
                    OK
                  </button>
                </div>
              </>
            )
          );
          popup.show();
		  console.log(gamePos)
          //updatet Anzeigefarbe von Würfel
          setFilledBy(
            props.gameObject.board[gamePos.x][gamePos.y][gamePos.z][gamePos.w]
          );
        }}
      />
    </>
  );
}

export default Tile;
