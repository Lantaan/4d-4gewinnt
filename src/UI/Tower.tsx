import { Vector3 } from "three";
import Game from "../Logic/Game";
import Plane from "./Plane";

function Tower(props: { displayPos: Vector3; wPos: number; gameObject: Game }) {
  const relativePositionArray: { game: Vector3; display: Vector3 }[] = [];
  for (let y = 0; y < 4; y++) {
    relativePositionArray.push({
      game: new Vector3(0, y, 0),
      display: new Vector3(0, y*3, 0).add(props.displayPos),
    });
  }

  return (
    <>
      {relativePositionArray.map((pos, i) => (
        <Plane
          displayPos={pos.display.clone()}
          yPos={pos.game.y}
          wPos={props.wPos}
          gameObject={props.gameObject}
          key={i}
        />
      ))}
    </>
  );
}

export default Tower;
