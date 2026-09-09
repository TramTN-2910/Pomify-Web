import { useCallback } from 'react';
import useRobotStore from '../store/robotStore';

export const useRobotAnimation = () => {
  const triggerReaction = useRobotStore((state) => state.triggerReaction);
  const setEmotion = useRobotStore((state) => state.setEmotion);
  const setBubbleText = useRobotStore((state) => state.setBubbleText);

  const onHoverCTA = useCallback((buttonType) => {
    if (buttonType === 'create') {
      triggerReaction('curious');
    } else if (buttonType === 'explore') {
      triggerReaction('happy');
    }
  }, [triggerReaction]);

  const onHoverFeature = useCallback((featureKey) => {
    switch (featureKey) {
      case 'manage':
        setEmotion('thinking');
        setBubbleText('Managing schedule... 📅');
        break;
      case 'remind':
        setEmotion('alert');
        setBubbleText('Don\'t forget! 🔔');
        break;
      case 'plan':
        setEmotion('happy');
        setBubbleText('Plan completed! ✨');
        break;
      case 'connect':
        setEmotion('caring');
        setBubbleText('Always listening 🫶');
        break;
      default:
        setEmotion('happy');
    }
  }, [setEmotion, setBubbleText]);

  const resetToIdle = useCallback(() => {
    setEmotion('happy');
    setBubbleText("Hi, I'm Pomify 👋");
  }, [setEmotion, setBubbleText]);

  return {
    onHoverCTA,
    onHoverFeature,
    resetToIdle,
  };
};

export default useRobotAnimation;
