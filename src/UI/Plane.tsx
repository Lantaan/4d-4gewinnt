import { useEffect, useRef } from 'react';
import { Color, DoubleSide, Euler, Mesh, Vector3, Vector4 } from 'three';
import Game from '../Logic/Game';
import { addPointerEnter, addPointerLeave } from './Raycaster';
import Tile from './Tile';

function Plane(props: { displayPos: Vector3; wPos: number; yPos: number; gameObject: Game }) {
	const relativePositionArray: Vector3[] = [];
	for (let x = 0; x < 4; x++) {
		for (let z = 0; z < 4; z++) {
			relativePositionArray.push(new Vector3(x, 0, z));
		}
	}

	const planeRef = useRef<Mesh>();
	const planeRotation = new Euler(Math.PI / 2);
	const planePosition = props.displayPos.clone().add(new Vector3(1.5, -0.51, 1.5));

	useEffect(() => {
		const mesh = planeRef.current;
		if (mesh) {
			//make the plane block pointer events for tiles behind it
			addPointerEnter(mesh.id, () => null);
			addPointerLeave(mesh.id, () => null);
		}
	}, []);

	return (
		<>
			{relativePositionArray.map((pos, i) => {
				const gamePos = new Vector4(pos.x, props.yPos, pos.z, props.wPos),
					filling = props.gameObject.board[gamePos.x][gamePos.y][gamePos.z][gamePos.w],
					displayPos = pos.clone().add(props.displayPos);

				return (
					<Tile gameObject={props.gameObject} gamePos={gamePos} displayPos={displayPos} filledBy={filling} key={i} />
				);
			})}
			<mesh position={planePosition} rotation={planeRotation} ref={planeRef}>
				<planeGeometry args={[4, 4]} />
				<meshBasicMaterial color={new Color(0xff00ff)} side={DoubleSide} />
			</mesh>
		</>
	);
}

export default Plane;
