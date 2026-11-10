import { create } from 'zustand';

export const COLOR_OPTIONS = [
  {
    id: 'blue',
    name: 'Pastel Blue',
    texture: '/models/Robot/textures/Mauxanh.png',
    bodyColor: '#A5BEEB',
    accentColor: '#3B82F6',
    price: 0,
    desc: 'Elegant, modern and refreshing aesthetic',
    badge: 'Popular',
  },
  {
    id: 'pink',
    name: 'Sakura Pink',
    texture: '/models/Robot/textures/Mauhong.png',
    bodyColor: '#F2A8B4',
    accentColor: '#EC4899',
    price: 0,
    desc: 'Warm, cheerful and friendly tone',
    badge: 'Sweet',
  },
  {
    id: 'purple',
    name: 'Pastel Purple',
    texture: '/models/Robot/textures/Mautim.png',
    bodyColor: '#A491D3',
    accentColor: '#8B5CF6',
    price: 0,
    desc: 'Subtle, creative and mystic aesthetic',
    badge: 'Signature',
  },
];

export const FINISH_OPTIONS = [
  { id: 'pbr', name: 'Factory PBR Standard', roughness: 0.7, metalness: 0.4, price: 0 },
];

export const EXPRESSION_OPTIONS = [
  { id: 'default', name: 'Standard Display', icon: '🤖' },
];

export const ACCESSORY_OPTIONS = [];

export const PERSONALITY_OPTIONS = [
  { id: 'cute', name: 'Cute Companion', desc: 'Warm, cheerful & emotionally expressive' },
  { id: 'smart', name: 'Pro Assistant', desc: 'Focus-oriented, concise & goal driven' },
  { id: 'chill', name: 'Zen Relaxer', desc: 'Calming, ambient guidance & mindful breaks' },
];

export const MODEL_OPTIONS = [
  {
    id: 'customStl',
    name: 'Pomify CAD Robot',
    desc: 'High-detail 3D hardware model with authentic PBR textures',
    price: 0,
  },
];

export const BASE_PRICE = 299;

export const useCustomizerStore = create((set, get) => ({
  modelType: MODEL_OPTIONS[0],
  color: COLOR_OPTIONS[0],
  finish: FINISH_OPTIONS[0],
  expression: EXPRESSION_OPTIONS[0],
  accessories: [],
  personality: PERSONALITY_OPTIONS[0],
  robotName: 'Pomify Neo',
  isSaved: false,

  setModelType: (modelType) => set({ modelType, isSaved: false }),
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
    const finishAddon = state.finish?.price || 0;
    const accessoriesAddon = state.accessories.reduce((sum, item) => sum + (item.price || 0), 0);
    return BASE_PRICE + colorAddon + finishAddon + accessoriesAddon;
  },

  saveDesign: () => set({ isSaved: true }),
}));

export default useCustomizerStore;
