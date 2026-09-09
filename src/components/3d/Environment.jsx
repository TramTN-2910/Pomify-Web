import React from 'react';

export const Environment = () => {
  return (
    <>
      <color attach="background" args={['#F9F9FB']} />
      <fog attach="fog" args={['#F9F9FB', 8, 20]} />
    </>
  );
};

export default Environment;
