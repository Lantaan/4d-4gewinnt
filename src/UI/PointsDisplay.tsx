import {useState} from 'react';
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
                    left: '5vw',
                    fontSize: '50px',
                    zIndex: '2',
                    backgroundColor: 'transparent',
                    userSelect: 'none',
                    color: "red",
                    textShadow: "0 0 3px black"
                }}>
                red: {pointsP1}
            </div>
            <div
                style={{
                    position: 'absolute',
                    top: '0',
                    right: '5vw',
                    fontSize: '50px',
                    zIndex: '2',
                    backgroundColor: 'transparent',
                    userSelect: 'none',
                    color: "blue",
                    textShadow: "0 0 3px black"
                }}>
                blue: {pointsP2}
            </div>
        </>
    );
}
