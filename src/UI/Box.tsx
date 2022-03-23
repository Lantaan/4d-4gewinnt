import { Color, Vector3 } from "three";

function Box(props: {
    pos: Vector3, color: Color, scale: number,
    outline?: boolean, transparent?: boolean
}) {

    let scale = props.scale
    if(scale === undefined) scale = 1;

    <mesh
        position={props.pos}>
        <boxGeometry args={[1*scale, 1*scale, 1*scale]} />
        <meshStandardMaterial color={props.color}
            transparent={!props.transparent} />
    </mesh>
}


export default Box;