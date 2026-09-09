import { create } from 'zustand';

export const useRobotStore = create((set) => ({
  emotion: 'happy', // happy, curious, thinking, caring, alert, sleepy, neutral
  bubbleText: "Hi, I'm Pomify 👋",
  showBubble: true,
  targetRotation: { x: 0, y: 0 },
  isHovered: false,

  setEmotion: (emotion) => set({ emotion }),
  setBubbleText: (text, visible = true) => set({ bubbleText: text, showBubble: visible }),
  setTargetRotation: (rotation) => set({ targetRotation: rotation }),
  setIsHovered: (isHovered) => set({ isHovered }),
  
  triggerReaction: (actionName) => {
    switch (actionName) {
      case 'curious':
        set({ emotion: 'curious', bubbleText: 'Ooh! Tell me more ✨', showBubble: true });
        break;
      case 'happy':
        set({ emotion: 'happy', bubbleText: 'Yay! Glad to see you 💜', showBubble: true });
        break;
      case 'thinking':
        set({ emotion: 'thinking', bubbleText: 'Let me think about that... 🤔', showBubble: true });
        break;
      case 'caring':
        set({ emotion: 'caring', bubbleText: 'Take a breath. I am here for you 🫶', showBubble: true });
        break;
      case 'alert':
        set({ emotion: 'alert', bubbleText: 'Reminder alert! 🔔', showBubble: true });
        break;
      default:
        set({ emotion: 'happy', bubbleText: "Hi, I'm Pomify 👋", showBubble: true });
    }
  }
}));

export default useRobotStore;
