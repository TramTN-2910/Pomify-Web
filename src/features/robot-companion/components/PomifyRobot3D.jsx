import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import useRobotStore from '../store/robotStore';
import RobotExpressions from './RobotExpressions';

export const PomifyRobot3D = ({ scale = 1, position = [0, -0.2, 0], interactive = true }) => {
  const robotGroupRef = useRef();
  const headGroupRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();

  const { emotion, targetRotation, isHovered } = useRobotStore();

  useFrame((state, delta) => {
    if (!robotGroupRef.current) return;

    // 1. Floating Animation (Bobbing up and down)
    const time = state.clock.getElapsedTime();
    robotGroupRef.current.position.y = position[1] + Math.sin(time * 2) * 0.08;

    // 2. Smooth Mouse Look / Rotation interpolation
    if (headGroupRef.current && interactive) {
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        targetRotation.y * 0.6,
        0.08
      );
      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        targetRotation.x * 0.4,
        0.08
      );

      // Whole body subtle sway
      robotGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        robotGroupRef.current.rotation.y,
        targetRotation.y * 0.25,
        0.05
      );
    }

    // 3. Arm sway animation
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(time * 2.5) * 0.1 - 0.2;
      rightArmRef.current.rotation.z = -Math.sin(time * 2.5) * 0.1 + 0.2;

      if (emotion === 'happy' || isHovered) {
        leftArmRef.current.rotation.z = Math.sin(time * 6) * 0.25 - 0.4;
        rightArmRef.current.rotation.z = -Math.sin(time * 6) * 0.25 + 0.4;
      }
    }
  });

  return (
    <group ref={robotGroupRef} position={position} scale={scale}>
      
      {/* --- HEAD GROUP --- */}
      <group ref={headGroupRef} position={[0, 0.95, 0]}>
        
        {/* Outer White Head Shell (Cute rounded egg shape) */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.85, 64, 64]} />
          <meshStandardMaterial
            color="#FFFFFF"
            roughness={0.15}
            metalness={0.1}
          />
        </mesh>

        {/* Head Side Accents (Pastel Purple Ear Caps) */}
        <mesh position={[-0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.1, 32]} />
          <meshStandardMaterial color="#C4B5FD" roughness={0.3} />
        </mesh>
        <mesh position={[0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.18, 0.18, 0.1, 32]} />
          <meshStandardMaterial color="#C4B5FD" roughness={0.3} />
        </mesh>

        {/* Top Antenna */}
        <mesh position={[0, 0.88, 0]}>
          <cylinderGeometry args={[0.025, 0.025, 0.22, 16]} />
          <meshStandardMaterial color="#A78BFA" />
        </mesh>
        <mesh position={[0, 1.02, 0]}>
          <sphereGeometry args={[0.08, 32, 32]} />
          <meshStandardMaterial color="#FBCFE8" emissive="#FBCFE8" emissiveIntensity={0.6} />
        </mesh>

        {/* Face Screen Bezel (Sleek Glass Inset) */}
        <mesh position={[0, 0.04, 0.72]}>
          <boxGeometry args={[0.88, 0.58, 0.08]} />
          <meshStandardMaterial color="#1E1B4B" roughness={0.1} />
        </mesh>

        {/* HTML/SVG Face Overlay mapped onto 3D screen */}
        <Html
          transform
          position={[0, 0.04, 0.77]}
          distanceFactor={1.45}
          style={{
            width: '160px',
            height: '110px',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <RobotExpressions emotion={emotion} />
        </Html>
      </group>

      {/* --- NECK CONNECTOR --- */}
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.22, 0.28, 0.15, 32]} />
        <meshStandardMaterial color="#93C5FD" roughness={0.4} />
      </mesh>

      {/* --- BODY GROUP --- */}
      <group position={[0, -0.6, 0]}>
        {/* Main Torso */}
        <mesh castShadow receiveShadow>
          <capsuleGeometry args={[0.52, 0.48, 32, 32]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
        </mesh>

        {/* Chest Heart/Logo Emblem */}
        <mesh position={[0, 0.1, 0.49]} rotation={[0.1, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.05, 32]} />
          <meshStandardMaterial color="#A78BFA" emissive="#A78BFA" emissiveIntensity={0.5} />
        </mesh>

        {/* Left Arm */}
        <group ref={leftArmRef} position={[-0.64, 0.12, 0]}>
          <mesh castShadow position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.1, 0.32, 16, 16]} />
            <meshStandardMaterial color="#C4B5FD" roughness={0.3} />
          </mesh>
        </group>

        {/* Right Arm */}
        <group ref={rightArmRef} position={[0.64, 0.12, 0]}>
          <mesh castShadow position={[0, -0.22, 0]}>
            <capsuleGeometry args={[0.1, 0.32, 16, 16]} />
            <meshStandardMaterial color="#C4B5FD" roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* --- FLOATING GLOW DISK / SHADOW --- */}
      <mesh position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.75, 32]} />
        <meshBasicMaterial color="#A78BFA" opacity={0.25} transparent />
      </mesh>

    </group>
  );
};

export default PomifyRobot3D;
