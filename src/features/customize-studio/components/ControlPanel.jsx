import React, { useState } from 'react';
import { Palette, Sparkles, Smile, Glasses, Cpu, Check, Layers, Bot } from 'lucide-react';
import useCustomizerStore, {
  MODEL_OPTIONS,
  COLOR_OPTIONS,
  FINISH_OPTIONS,
  EXPRESSION_OPTIONS,
  ACCESSORY_OPTIONS,
  PERSONALITY_OPTIONS,
} from '../store/customizerStore';

export const ControlPanel = () => {
  const [activeTab, setActiveTab] = useState('model');

  const {
    modelType,
    color,
    finish,
    expression,
    accessories,
    personality,
    robotName,
    setModelType,
    setColor,
    setFinish,
    setExpression,
    setPersonality,
    toggleAccessory,
    setRobotName,
  } = useCustomizerStore();

  const tabs = [
    { id: 'model', label: '3D Model', icon: Bot },
    { id: 'color', label: 'Color & Material', icon: Palette },
    { id: 'face', label: 'Expressions', icon: Smile },
    { id: 'accessories', label: 'Accessories', icon: Glasses },
    { id: 'personality', label: 'Personality', icon: Cpu },
  ];

  return (
    <div className="flex flex-col h-full bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl p-5 shadow-soft-glass">
      {/* Studio Header & Naming */}
      <div className="mb-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-pomify-purple mb-1">
          Robot Designation
        </label>
        <input
          type="text"
          value={robotName}
          onChange={(e) => setRobotName(e.target.value)}
          className="w-full px-4 py-2 rounded-2xl bg-white border border-blue-200 text-pomify-navy font-bold text-lg focus:outline-none focus:border-pomify-purple transition-all"
          placeholder="Name your Pomify..."
        />
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-1.5 p-1 bg-blue-50/80 rounded-2xl mb-5 border border-blue-100 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-white text-pomify-purple-dark shadow-sm border border-blue-100'
                  : 'text-pomify-subtext hover:text-pomify-navy hover:bg-white/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-5">
        
        {/* TAB 0: 3D Model Preset Selection */}
        {activeTab === 'model' && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-pomify-navy mb-2 flex items-center gap-1.5">
              <Bot className="w-4 h-4 text-pomify-purple" /> Select Robot 3D Model
            </h4>
            <div className="space-y-3">
              {MODEL_OPTIONS.map((m) => {
                const isSelected = modelType.id === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setModelType(m)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between transition-all ${
                      isSelected
                        ? 'border-pomify-purple bg-blue-50/90 ring-2 ring-pomify-purple/30 shadow-sm'
                        : 'border-slate-100 bg-white hover:border-blue-200'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-extrabold text-pomify-navy">{m.name}</span>
                        {m.id === 'customStl' && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-200/60 text-[10px] font-bold text-pomify-purple-dark">
                            Custom STL CAD
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-pomify-subtext mt-1">{m.desc}</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 ${
                      isSelected ? 'bg-pomify-purple border-pomify-purple text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 1: Color & Material */}
        {activeTab === 'color' && (
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-bold text-pomify-navy mb-2.5 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-pomify-purple" /> Body Shell Color
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                {COLOR_OPTIONS.map((c) => {
                  const isSelected = color.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setColor(c)}
                      className={`p-2.5 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                        isSelected
                          ? 'border-pomify-purple bg-blue-50/80 shadow-sm ring-2 ring-pomify-purple/30'
                          : 'border-slate-100 bg-white hover:border-blue-200'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-full shadow-inner flex items-center justify-center" style={{ backgroundColor: c.bodyColor }}>
                        {isSelected && <Check className="w-4 h-4 text-slate-800 drop-shadow-sm" />}
                      </div>
                      <span className="text-xs font-semibold text-pomify-navy">{c.name}</span>
                      {c.price > 0 && <span className="text-[10px] text-pomify-purple font-bold">+${c.price}</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-pomify-navy mb-2.5 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-pomify-purple" /> Material Finish
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {FINISH_OPTIONS.map((f) => {
                  const isSelected = finish.id === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setFinish(f)}
                      className={`p-2.5 rounded-2xl border text-center transition-all ${
                        isSelected
                          ? 'border-pomify-purple bg-blue-50/80 font-bold text-pomify-purple-dark shadow-sm'
                          : 'border-slate-100 bg-white text-pomify-subtext hover:border-blue-200'
                      }`}
                    >
                      <div className="text-xs font-semibold">{f.name}</div>
                      {f.price > 0 && <div className="text-[10px] text-pomify-purple font-bold">+${f.price}</div>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Face Expressions */}
        {activeTab === 'face' && (
          <div>
            <h4 className="text-sm font-bold text-pomify-navy mb-2.5 flex items-center gap-1.5">
              <Smile className="w-4 h-4 text-pomify-purple" /> Default Face Matrix
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {EXPRESSION_OPTIONS.map((exp) => {
                const isSelected = expression.id === exp.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => setExpression(exp)}
                    className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                      isSelected
                        ? 'border-pomify-purple bg-blue-50/80 ring-2 ring-pomify-purple/30'
                        : 'border-slate-100 bg-white hover:border-blue-200'
                    }`}
                  >
                    <span className="text-2xl">{exp.icon}</span>
                    <span className="text-xs font-bold text-pomify-navy">{exp.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: Accessories */}
        {activeTab === 'accessories' && (
          <div>
            <h4 className="text-sm font-bold text-pomify-navy mb-2.5 flex items-center gap-1.5">
              <Glasses className="w-4 h-4 text-pomify-purple" /> Attach 3D Accessories
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {ACCESSORY_OPTIONS.map((acc) => {
                const isSelected = accessories.some((item) => item.id === acc.id);
                return (
                  <button
                    key={acc.id}
                    onClick={() => toggleAccessory(acc)}
                    className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-pomify-purple bg-blue-50/80 ring-2 ring-pomify-purple/30'
                        : 'border-slate-100 bg-white hover:border-blue-200'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{acc.icon}</span>
                      <div className="text-left">
                        <div className="text-xs font-bold text-pomify-navy">{acc.name}</div>
                        <div className="text-[10px] text-pomify-purple font-semibold">+${acc.price}</div>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'bg-pomify-purple border-pomify-purple text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: Personality Style */}
        {activeTab === 'personality' && (
          <div>
            <h4 className="text-sm font-bold text-pomify-navy mb-2.5 flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-pomify-purple" /> Companion Intelligence Tuning
            </h4>
            <div className="space-y-3">
              {PERSONALITY_OPTIONS.map((p) => {
                const isSelected = personality.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setPersonality(p)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-pomify-purple bg-purple-50/80 ring-2 ring-pomify-purple/30'
                        : 'border-slate-100 bg-white hover:border-purple-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-extrabold text-pomify-navy">{p.name}</span>
                      {isSelected && <Sparkles className="w-4 h-4 text-pomify-purple" />}
                    </div>
                    <p className="text-[11px] text-pomify-subtext">{p.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ControlPanel;
