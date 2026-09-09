import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Lighting from './Lighting';
import Environment from './Environment';

export const CanvasViewer = ({ children, className = '', cameraPosition = [0, 0, 5.5] }) => {
  return (
    <div className={`w-full h-full min-h-[350px] relative ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: 45 }}
        shadows
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Environment />
        <Lighting />
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CanvasViewer;
