import { ReactElement, useEffect, useLayoutEffect, useRef } from "react";
import { Color, Curve, TubeGeometry, Vector3 } from "three";


const lines: { geometry: ReactElement<TubeGeometry>, dist: Vector3 }[] = [];


class LineCurve extends Curve<Vector3>{
    constructor(private target: Vector3) {
        super();
    }

    getPoint(t: number, optionalTarget = new Vector3()) {
        const point = this.target.clone().multiplyScalar(t).add(new Vector3());
        return optionalTarget.set(point.x, point.y, point.z);
    }
}


function StraightLine(props: { start: Vector3, end: Vector3, color?: Color, radius?: number }) {
    const color = props.color ? props.color : new Color(0x000000),
        radius = props.radius !== undefined ? props.radius : 0.1;
    const dist = props.end.clone().sub(props.start);

    const line = lines.find(line => line.dist.equals(dist));
    let geometry: ReactElement<TubeGeometry> | undefined = line?.geometry;
    if (!geometry) {
        const curve = new LineCurve(dist),
            geometry = <tubeGeometry args={[curve, 1, radius]} />
        lines.push({ geometry, dist });
    }

    return <mesh position={props.start}>
        {geometry}
        <meshStandardMaterial color={color} />
    </mesh>
}


export default StraightLine;