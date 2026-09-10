import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';

export const RobotCustomModel3D = ({
  scale = 1.25,
  position = [0, -0.15, 0],
  interactive = true,
  targetRotation = { x: 0, y: 0 },
}) => {
  const robotRef = useRef();

  // Load STL geometry and authentic PBR texture maps
  const geometry = useLoader(STLLoader, '/models/robot/Robot.stl');
  const [baseColorMap, normalMap, roughnessMap, metalnessMap] = useLoader(THREE.TextureLoader, [
    '/models/robot/textures/Robot_DefaultMaterial_BaseColor.png',
    '/models/robot/textures/Robot_DefaultMaterial_Normal.png',
    '/models/robot/textures/Robot_DefaultMaterial_Roughness.png',
    '/models/robot/textures/Robot_DefaultMaterial_Metalness.png',
  ]);

  // Configure texture properties for accurate PBR rendering
  useMemo(() => {
    if (baseColorMap) {
      baseColorMap.colorSpace = THREE.SRGBColorSpace;
      baseColorMap.wrapS = THREE.RepeatWrapping;
      baseColorMap.wrapT = THREE.RepeatWrapping;
    }
    if (normalMap) {
      normalMap.wrapS = THREE.RepeatWrapping;
      normalMap.wrapT = THREE.RepeatWrapping;
    }
    if (roughnessMap) {
      roughnessMap.wrapS = THREE.RepeatWrapping;
      roughnessMap.wrapT = THREE.RepeatWrapping;
    }
    if (metalnessMap) {
      metalnessMap.wrapS = THREE.RepeatWrapping;
      metalnessMap.wrapT = THREE.RepeatWrapping;
    }
  }, [baseColorMap, normalMap, roughnessMap, metalnessMap]);

  // Center geometry & generate smooth UV coordinates for 3D body texture mapping
  const processedGeometry = useMemo(() => {
    const geom = geometry.clone();
    geom.center();
    geom.computeVertexNormals();

    const pos = geom.attributes.position;
    const count = pos.count;
    geom.computeBoundingBox();
    const { min, max } = geom.boundingBox;
    const height = max.y - min.y || 1;

    const uvs = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      // Cylindrical UV projection for 3D hardware body
      const u = 0.5 + Math.atan2(z, x) / (2 * Math.PI);
      const v = (y - min.y) / height;

      uvs[i * 2] = u;
      uvs[i * 2 + 1] = v;
    }
    geom.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    return geom;
  }, [geometry]);

  useFrame(() => {
    if (!robotRef.current) return;

    // Smooth subtle mouse-look rotation tracking
    if (interactive && targetRotation) {
      robotRef.current.rotation.y = THREE.MathUtils.lerp(
        robotRef.current.rotation.y,
        targetRotation.y * 0.4,
        0.06
      );
      robotRef.current.rotation.x = THREE.MathUtils.lerp(
        robotRef.current.rotation.x,
        targetRotation.x * 0.2,
        0.06
      );
    }
  });

  return (
    <group ref={robotRef} position={position} scale={scale}>
      {/* 3D STL Custom Robot Mesh with Authentic PBR Textures */}
      <mesh
        geometry={processedGeometry}
        castShadow
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial
          color="#FFFFFF"
          map={baseColorMap}
          normalMap={normalMap}
          normalScale={new THREE.Vector2(1, 1)}
          roughnessMap={roughnessMap}
          roughness={1}
          metalnessMap={metalnessMap}
          metalness={1}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Subtle Floating Reflection Shadow Disk */}
      <mesh position={[0, -1.25, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.8, 32]} />
        <meshBasicMaterial color="#94A3B8" opacity={0.2} transparent />
      </mesh>
    </group>
  );
};

export default RobotCustomModel3D;
