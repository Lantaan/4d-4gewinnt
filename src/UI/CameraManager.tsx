import { useFrame, useThree } from '@react-three/fiber';
import { RefObject, useEffect, useRef } from 'react';
import { Euler, MOUSE, Vector2, Vector3 } from 'three';
import { OrbitControls } from '@react-three/drei';

const ySensitivity = 1 / 2;
let currentCenter = new Vector3();

export default function OrbitControlsExtender(props: {
	cameraCenters: Vector3[];
	currentCenterIndex: number;
	radius: number;
}) {
	const { camera } = useThree();
	currentCenter = props.cameraCenters[props.currentCenterIndex].clone()

	let alpha = 0,
		beta = Math.PI / 2;
	let radius = props.radius;

	updateCameraPosition();
	//https://math.stackexchange.com/questions/1881758/find-point-on-a-sphere-given-two-angles
	function updateCameraPosition() {
		const x = Math.sin(beta) * Math.sin(alpha) * radius,
			y = Math.cos(beta) * radius,
			z = Math.cos(alpha) * Math.sin(beta) * radius;
		camera.position.set(x, y, z).add(currentCenter);
		camera.lookAt(currentCenter);
	}

	let mousedown = false;
	const previousMousePos = new Vector2();
	useEffect(() => {
		document.addEventListener('wheel', e => {
			const delta = Math.sign(e.deltaY);
			currentCenter.y += delta * ySensitivity;
			updateCameraPosition();
		});

		document.addEventListener('mousedown', e => (mousedown = true));
		document.addEventListener('mouseup', e => (mousedown = false));
		document.addEventListener('mousemove', e => {
			if (mousedown) {
				const newMousePos = new Vector2(e.clientX, e.clientY);
				const delta = newMousePos.clone().sub(previousMousePos);
				alpha -= delta.x * 0.01;
				beta -= delta.y * 0.01;
				previousMousePos.copy(newMousePos);
				updateCameraPosition();
			} else {
				previousMousePos.set(e.clientX, e.clientY);
			}
		});

		document.addEventListener('keydown', e => {
			if (e.ctrlKey) {
				radius = props.radius * 6;
				updateCameraPosition();
			}
		});
		document.addEventListener('keyup', e => {
			if (!e.ctrlKey) {
				radius = props.radius;
				updateCameraPosition();
			}
		});
	}, []);

	return <></>;
}
