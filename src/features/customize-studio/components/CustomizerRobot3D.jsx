import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import useCustomizerStore from '../store/customizerStore';
import RobotExpressions from '../../robot-companion/components/RobotExpressions';

export const CustomizerRobot3D = ({ isBouncing = false }) => {
  const robotGroupRef = useRef();
  const headGroupRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();

  const { color, finish, expression, accessories } = useCustomizerStore();

  const hasCatEars = accessories.some((a) => a.id === 'catEars');
  const hasHalo = accessories.some((a) => a.id === 'halo');
  const hasGlasses = accessories.some((a) => a.id === 'glasses');
  const hasBeanie = accessories.some((a) => a.id === 'beanie');
  const hasBowtie = accessories.some((a) => a.id === 'bowtie');
  const hasCrown = accessories.some((a) => a.id === 'crown');

  useFrame((state) => {
    if (!robotGroupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Idle breathing & bounce on save
    if (isBouncing) {
      robotGroupRef.current.position.y = -0.2 + Math.abs(Math.sin(time * 12)) * 0.35;
      robotGroupRef.current.rotation.y += 0.04;
    } else {
      robotGroupRef.current.position.y = -0.2 + Math.sin(time * 2.2) * 0.07;
    }

    // Arm idle sway
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.rotation.z = Math.sin(time * 2.5) * 0.12 - 0.2;
      rightArmRef.current.rotation.z = -Math.sin(time * 2.5) * 0.12 + 0.2;
    }
  });

  return (
    <>
      <OrbitControls
        enablePan={false}
        minDistance={3.5}
        maxDistance={7}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate={false}
      />

      <group ref={robotGroupRef} position={[0, -0.2, 0]}>
        
        {/* --- HEAD GROUP --- */}
        <group ref={headGroupRef} position={[0, 0.95, 0]}>
          
          {/* Main Head Outer Shell */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.85, 64, 64]} />
            <meshStandardMaterial
              color={color.bodyColor}
              roughness={finish.roughness}
              metalness={finish.metalness}
            />
          </mesh>

          {/* Ear Caps */}
          <mesh position={[-0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.18, 0.18, 0.1, 32]} />
            <meshStandardMaterial color={color.accentColor} roughness={0.3} />
          </mesh>
          <mesh position={[0.82, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.18, 0.18, 0.1, 32]} />
            <meshStandardMaterial color={color.accentColor} roughness={0.3} />
          </mesh>

          {/* Antenna */}
          {!hasBeanie && !hasCrown && (
            <>
              <mesh position={[0, 0.88, 0]}>
                <cylinderGeometry args={[0.025, 0.025, 0.22, 16]} />
                <meshStandardMaterial color={color.accentColor} />
              </mesh>
              <mesh position={[0, 1.02, 0]}>
                <sphereGeometry args={[0.08, 32, 32]} />
                <meshStandardMaterial color="#FBCFE8" emissive="#FBCFE8" emissiveIntensity={0.8} />
              </mesh>
            </>
          )}

          {/* --- 3D ACCESSORIES ON HEAD --- */}

          {/* Cat Ears */}
          {hasCatEars && (
            <group position={[0, 0.75, 0]}>
              <mesh position={[-0.42, 0.25, 0]} rotation={[0, 0, 0.35]}>
                <coneGeometry args={[0.22, 0.45, 32]} />
                <meshStandardMaterial color={color.accentColor} roughness={0.3} />
              </mesh>
              <mesh position={[0.42, 0.25, 0]} rotation={[0, 0, -0.35]}>
                <coneGeometry args={[0.22, 0.45, 32]} />
                <meshStandardMaterial color={color.accentColor} roughness={0.3} />
              </mesh>
            </group>
          )}

          {/* Halo */}
          {hasHalo && (
            <mesh position={[0, 1.25, 0]} rotation={[Math.PI / 2.2, 0, 0]}>
              <torusGeometry args={[0.5, 0.04, 16, 64]} />
              <meshStandardMaterial color="#FDE047" emissive="#FDE047" emissiveIntensity={1} />
            </mesh>
          )}

          {/* Glasses */}
          {hasGlasses && (
            <group position={[0, 0.06, 0.75]}>
              {/* Left Lens */}
              <mesh position={[-0.26, 0, 0]} rotation={[0, 0, 0]}>
                <torusGeometry args={[0.22, 0.035, 16, 32]} />
                <meshStandardMaterial color="#1E1B4B" metalness={0.8} roughness={0.1} />
              </mesh>
              {/* Right Lens */}
              <mesh position={[0.26, 0, 0]} rotation={[0, 0, 0]}>
                <torusGeometry args={[0.22, 0.035, 16, 32]} />
                <meshStandardMaterial color="#1E1B4B" metalness={0.8} roughness={0.1} />
              </mesh>
              {/* Bridge */}
              <mesh position={[0, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.02, 0.02, 0.16, 16]} />
                <meshStandardMaterial color="#1E1B4B" />
              </mesh>
            </group>
          )}

          {/* Beanie */}
          {hasBeanie && (
            <group position={[0, 0.55, 0]}>
              <mesh position={[0, 0.25, 0]}>
                <sphereGeometry args={[0.87, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#3B82F6" roughness={0.9} />
              </mesh>
              {/* Pom-pom */}
              <mesh position={[0, 0.95, 0]}>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial color="#FBCFE8" roughness={1.0} />
              </mesh>
            </group>
          )}

          {/* Crown */}
          {hasCrown && (
            <group position={[0, 0.92, 0]}>
              <mesh>
                <cylinderGeometry args={[0.3, 0.24, 0.35, 8]} />
                <meshStandardMaterial color="#F59E0B" metalness={0.8} roughness={0.2} />
              </mesh>
              <mesh position={[0, 0.2, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial color="#EF4444" emissive="#EF4444" />
              </mesh>
            </group>
          )}

          {/* Screen Bezel & Expression */}
          <mesh position={[0, 0.04, 0.72]}>
            <boxGeometry args={[0.88, 0.58, 0.08]} />
            <meshStandardMaterial color="#1E1B4B" roughness={0.1} />
          </mesh>

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
            <RobotExpressions emotion={expression.id} />
          </Html>
        </group>

        {/* --- NECK --- */}
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.22, 0.28, 0.15, 32]} />
          <meshStandardMaterial color={color.accentColor} roughness={0.4} />
        </mesh>

        {/* --- BODY GROUP --- */}
        <group position={[0, -0.6, 0]}>
          <mesh castShadow receiveShadow>
            <capsuleGeometry args={[0.52, 0.48, 32, 32]} />
            <meshStandardMaterial
              color={color.bodyColor}
              roughness={finish.roughness}
              metalness={finish.metalness}
            />
          </mesh>

          {/* Chest Emblem */}
          <mesh position={[0, 0.1, 0.49]} rotation={[0.1, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.16, 0.05, 32]} />
            <meshStandardMaterial color={color.accentColor} emissive={color.accentColor} emissiveIntensity={0.5} />
          </mesh>

          {/* Bowtie Accessory */}
          {hasBowtie && (
            <group position={[0, 0.38, 0.52]}>
              <mesh position={[-0.12, 0, 0]} rotation={[0, 0, 0.3]}>
                <coneGeometry args={[0.1, 0.22, 3]} />
                <meshStandardMaterial color="#EF4444" />
              </mesh>
              <mesh position={[0.12, 0, 0]} rotation={[0, 0, -0.3]}>
                <coneGeometry args={[0.1, 0.22, 3]} />
                <meshStandardMaterial color="#EF4444" />
              </mesh>
              <mesh>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial color="#B91C1C" />
              </mesh>
            </group>
          )}

          {/* Arms */}
          <group ref={leftArmRef} position={[-0.64, 0.12, 0]}>
            <mesh castShadow position={[0, -0.22, 0]}>
              <capsuleGeometry args={[0.1, 0.32, 16, 16]} />
              <meshStandardMaterial color={color.accentColor} roughness={0.3} />
            </mesh>
          </group>

          <group ref={rightArmRef} position={[0.64, 0.12, 0]}>
            <mesh castShadow position={[0, -0.22, 0]}>
              <capsuleGeometry args={[0.1, 0.32, 16, 16]} />
              <meshStandardMaterial color={color.accentColor} roughness={0.3} />
            </mesh>
          </group>
        </group>

        {/* Glow Disk Base */}
        <mesh position={[0, -1.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.2, 0.75, 32]} />
          <meshBasicMaterial color={color.bodyColor} opacity={0.35} transparent />
        </mesh>
      </group>
    </>
  );
};

export default CustomizerRobot3D;
