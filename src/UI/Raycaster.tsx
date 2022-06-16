import { useFrame, useThree } from '@react-three/fiber';
import { useEffect } from 'react';
import { Camera, Object3D, Raycaster, Scene, Vector2 } from 'three';

const raycaster: Raycaster = new Raycaster(),
	pointer: Vector2 = new Vector2();

const onPointerEnterFunctions = new Map<number, () => void>(),
	onPointerLeaveFunctions = new Map<number, () => void>(),
	onClickFunctions = new Map<number, (e: MouseEvent) => void>();

let previousObjectId: number | null = null;

let listenerElement: HTMLElement | null = null;

function frame(camera: Camera, scene: Scene) {
	raycaster.setFromCamera(pointer, camera);
	const intersects = raycaster.intersectObjects(scene.children);

	intersects.some(intersect => {
		const object = intersect.object,
			id = object.id;

		let callbackForObjectExists: boolean = false;

		if (id !== previousObjectId) {
			if (previousObjectId !== null) {
				const leaveCallback = onPointerLeaveFunctions.get(previousObjectId);
				if (leaveCallback) leaveCallback();
			}

			const enterCallback = onPointerEnterFunctions.get(id);
			if (enterCallback) {
				callbackForObjectExists = true;
				enterCallback();
			}
			previousObjectId = id;
		}

		if (callbackForObjectExists) return true;
	});

	if (intersects.length === 0) {
		if (previousObjectId !== null) {
			const leaveCallback = onPointerLeaveFunctions.get(previousObjectId);
			if (leaveCallback) leaveCallback();
		}
		previousObjectId = null;
	}
}

function useMouseRaycaster() {
	listenerElement = useThree().gl.domElement;
	useFrame(({ camera, scene }) => {
		frame(camera, scene);
	});

	useEffect(() => {
		listenerElement!.addEventListener('pointermove', onPointerMove);
		function onPointerMove(e: PointerEvent) {
			//https://threejs.org/docs/#api/en/core/Raycaster
			pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
			pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
		}

		listenerElement!.addEventListener('mousedown', onMouseDown);
		function onMouseDown(e: MouseEvent) {
			if (previousObjectId !== null) {
				const clickCallback = onClickFunctions.get(previousObjectId);
				if (clickCallback) clickCallback(e);
			}
		}
	}, []);
}
function CustomRaycaster() {
	useMouseRaycaster();
	return <></>;
}

function addPointerEnter(objectId: number, callback: () => void) {
	onPointerEnterFunctions.set(objectId, callback);
}
function addPointerLeave(objectId: number, callback: () => void) {
	onPointerLeaveFunctions.set(objectId, callback);
}
function addMouseDown(objectId: number, callback: () => void) {
	onClickFunctions.set(objectId, callback);
}

export { CustomRaycaster, addPointerEnter, addPointerLeave, addMouseDown };
