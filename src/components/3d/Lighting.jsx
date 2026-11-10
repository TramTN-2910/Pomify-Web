import React from 'react';

export const Lighting = () => {
  return (
    <>
      <ambientLight intensity={0.85} color="#FAF5FF" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#F3E8FF"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
        shadow-normalBias={0.03}
      />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#DBEAFE" />
      <pointLight position={[0, 4, 3]} intensity={0.6} color="#FBCFE8" />
    </>
  );
};

export default Lighting;
