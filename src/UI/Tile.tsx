import { useEffect, useRef, useState } from 'react';
import { Color, Mesh, Vector3, Vector4 } from 'three';
import Game from '../Logic/Game';
import Box from './Box';
import { Popup } from './Popup';

function Tile(props: {
	displayPos: Vector3;
	gamePos: Vector4;
	gameObject: Game;
	filledBy: 'no marker' | 'player1' | 'player2';
}) {
	const [hover, setHover] = useState(false),
		[filledBy, setFilledBy] = useState<'no marker' | 'player1' | 'player2'>(props.filledBy);

	const transparent = filledBy === 'no marker' && !hover;

	let color: Color = new Color(0x000000);
	if (filledBy === 'player1') color = new Color(0xff0000);
	else if (filledBy === 'player2') color = new Color(0x00ff00);
	else if (!filledBy) color = new Color(0x000000);

	return (
		<>
			<Box
				pos={props.displayPos.clone()}
				color={color}
				transparent={transparent}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				onMouseDown={() => {
					const gamePos = props.gamePos,
						turnResult = props.gameObject.turn(props.gamePos);

					let turnMessage: string, messageColor: string;
					if (!turnResult.winner && turnResult.turn) {
						turnMessage = `It's your turn ${turnResult.turn}`;
						messageColor = 'black';
					} else if (turnResult.winner) {
						turnMessage = `${turnResult.winner} won!`;
						messageColor = 'green';
					} else {
						turnMessage = `This is not a valid placement`;
						messageColor = 'red';
					}console.log(turnResult);

					const popup = new Popup(
						(
							<>
								<h1 style={{ paddingLeft: '20px', paddingRight: '20px', color: messageColor }}>{turnMessage}</h1>
								<div style={{ justifyContent: 'center', display: 'flex' }}>
									<button onClick={() => popup.close()} style={{fontSize: "20px", width: "60px"}}>
										OK
									</button>
								</div>
							</>
						)
					);
					popup.show();

					setFilledBy(props.gameObject.board[gamePos.x][gamePos.y][gamePos.z][gamePos.w]);
				}}
			/>
		</>
	);
}

export default Tile;
