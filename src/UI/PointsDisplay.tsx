import { useState } from 'react';
import Game from '../Logic/Game';

export default function PointsDisplay(props: { gameObject: Game }) {
	//die functionen um den state zu updaten werden an das gameObject übergeben,
	//damit wenn die Punkte geupdatet werden, auch das Display angepasst wird
	const [pointsP1, setPointsP1] = useState(props.gameObject.p1);
	props.gameObject.updateDisplayPointsP1 = setPointsP1;
	const [pointsP2, setPointsP2] = useState(props.gameObject.p2);
	props.gameObject.updateDisplayPointsP2 = setPointsP2;
	return (
		<>
			<div
				style={{
					position: 'absolute',
					top: '0',
					left: '0',
					fontSize: '50px',
					zIndex: '2',
					backgroundColor: 'white',
					userSelect: 'none'
				}}>
				Player 1 score: <div style={{ fontSize: '100px' }}>{pointsP1}</div>
			</div>
			<div
				style={{
					position: 'absolute',
					top: '0',
					right: '0',
					fontSize: '50px',
					zIndex: '2',
					backgroundColor: 'white',
					userSelect: 'none'
				}}>
				Player 2 score: <div style={{ fontSize: '100px', textAlign: 'end' }}>{pointsP2}</div>
			</div>
		</>
	);
}
