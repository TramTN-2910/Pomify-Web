import { create } from 'zustand';

export const COLOR_OPTIONS = [
  { id: 'purple', name: 'Pastel Purple', bodyColor: '#A78BFA', accentColor: '#C4B5FD', price: 0 },
  { id: 'blue', name: 'Baby Blue', bodyColor: '#93C5FD', accentColor: '#BFDBFE', price: 0 },
  { id: 'pink', name: 'Sakura Pink', bodyColor: '#FBCFE8', accentColor: '#FCE7F3', price: 0 },
  { id: 'mint', name: 'Fresh Mint', bodyColor: '#A7F3D0', accentColor: '#D1FAE5', price: 0 },
  { id: 'violet', name: 'Midnight Violet', bodyColor: '#4C1D95', accentColor: '#7C3AED', price: 15 },
  { id: 'pearl', name: 'Pearl White', bodyColor: '#FFFFFF', accentColor: '#E2E8F0', price: 10 },
];

export const FINISH_OPTIONS = [
  { id: 'gloss', name: 'Silk Gloss', roughness: 0.15, metalness: 0.1, price: 0 },
  { id: 'matte', name: 'Soft Velvet Matte', roughness: 0.65, metalness: 0.05, price: 0 },
  { id: 'metallic', name: 'Chrono Metallic', roughness: 0.2, metalness: 0.6, price: 20 },
];

export const EXPRESSION_OPTIONS = [
  { id: 'happy', name: 'Happy Smile', icon: '😊' },
  { id: 'curious', name: 'Curious Eye', icon: '🥺' },
  { id: 'wink', name: 'Playful Wink', icon: '😉' },
  { id: 'caring', name: 'Caring Heart', icon: '🥰' },
  { id: 'starry', name: 'Starry Eyes', icon: '🤩' },
  { id: 'chill', name: 'Chill Relaxed', icon: '😌' },
];

export const ACCESSORY_OPTIONS = [
  { id: 'catEars', name: 'Necomimi Cat Ears', price: 25, icon: '🐱', category: 'head' },
  { id: 'halo', name: 'Angel Halo Ring', price: 30, icon: '😇', category: 'head' },
  { id: 'glasses', name: 'Smart AR Glasses', price: 35, icon: '👓', category: 'face' },
  { id: 'beanie', name: 'Cozy Wool Beanie', price: 20, icon: '🧢', category: 'head' },
  { id: 'bowtie', name: 'Dapper Bowtie', price: 15, icon: '👔', category: 'neck' },
  { id: 'crown', name: 'Mini Royal Crown', price: 40, icon: '👑', category: 'head' },
];

export const PERSONALITY_OPTIONS = [
  { id: 'cute', name: 'Cute Companion', desc: 'Warm, cheerful & emotionally expressive' },
  { id: 'smart', name: 'Pro Assistant', desc: 'Focus-oriented, concise & goal driven' },
  { id: 'chill', name: 'Zen Relaxer', desc: 'Calming, ambient guidance & mindful breaks' },
];

export const BASE_PRICE = 299;

export const useCustomizerStore = create((set, get) => ({
  color: COLOR_OPTIONS[0],
  finish: FINISH_OPTIONS[0],
  expression: EXPRESSION_OPTIONS[0],
  accessories: [],
  personality: PERSONALITY_OPTIONS[0],
  robotName: 'Pomify Custom',
  isSaved: false,

  setColor: (color) => set({ color, isSaved: false }),
  setFinish: (finish) => set({ finish, isSaved: false }),
  setExpression: (expression) => set({ expression, isSaved: false }),
  setPersonality: (personality) => set({ personality, isSaved: false }),
  setRobotName: (robotName) => set({ robotName, isSaved: false }),

  toggleAccessory: (accessory) => set((state) => {
    const exists = state.accessories.some((item) => item.id === accessory.id);
    const updated = exists
      ? state.accessories.filter((item) => item.id !== accessory.id)
      : [...state.accessories, accessory];
    return { accessories: updated, isSaved: false };
  }),

  getTotalPrice: () => {
    const state = get();
    const colorAddon = state.color.price || 0;
    const finishAddon = state.finish.price || 0;
    const accessoriesAddon = state.accessories.reduce((sum, item) => sum + item.price, 0);
    return BASE_PRICE + colorAddon + finishAddon + accessoriesAddon;
  },

  saveDesign: () => set({ isSaved: true }),
}));

export default useCustomizerStore;
