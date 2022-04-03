import { useEffect, useLayoutEffect, useRef } from "react";
import { BufferGeometry, Color, Curve, Vector3 } from "three";


class LineCurve extends Curve<Vector3>{
    dirVector: Vector3;

    constructor(private start: Vector3, private end: Vector3) {
        super();
        this.dirVector = end.clone().sub(start);
    }

    getPoint(t: number, optionalTarget = new Vector3()) {
        const point = this.dirVector.clone().multiplyScalar(t).add(this.start);
        return optionalTarget.set(point.x, point.y, point.z);
    }
}


function StraightLine(props: { start: Vector3, end: Vector3, color?: Color, radius?: number }) {
    const color = props.color ? props.color : new Color(0x000000),
        radius = props.radius !== undefined ? props.radius : 0.1;
    const curve = new LineCurve(props.start, props.end);

    return <mesh>
        <tubeGeometry args={[curve, 64, radius, 32]} />
        <meshStandardMaterial color={color} />
    </mesh>
}


export default StraightLine;