import React, { useEffect } from 'react';
import useRobotStore from '../store/robotStore';

export const MouseTracker3D = ({ children }) => {
  const setTargetRotation = useRobotStore((state) => state.setTargetRotation);

  useEffect(() => {
    const handleMouseMove = (event) => {
      // Normalize mouse coordinates to -1 to +1
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Limit rotation range
      setTargetRotation({
        x: y * 0.5,
        y: x * 0.8,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [setTargetRotation]);

  return <>{children}</>;
};

export default MouseTracker3D;
