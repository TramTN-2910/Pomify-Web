import React from 'react';
import { OrbitControls } from '@react-three/drei';
import useCustomizerStore from '../store/customizerStore';
import RobotCustomModel3D from '../../robot-companion/components/RobotCustomModel3D';

export const CustomizerRobot3D = () => {
  const { color } = useCustomizerStore();

  return (
    <>
      <OrbitControls
        enablePan={false}
        minDistance={2.5}
        maxDistance={6.0}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        autoRotate={false}
      />

      <RobotCustomModel3D
        scale={1.25}
        position={[0, -0.15, 0]}
        interactive={false}
        textureUrl={color?.texture}
        color={color}
      />
    </>
  );
};

export default CustomizerRobot3D;
