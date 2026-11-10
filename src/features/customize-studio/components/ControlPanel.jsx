import React from 'react';
import { Palette, Check, Bot } from 'lucide-react';
import useCustomizerStore, { COLOR_OPTIONS } from '../store/customizerStore';

export const ControlPanel = () => {
  const {
    color,
    robotName,
    setColor,
    setRobotName,
  } = useCustomizerStore();

  return (
    <div className="flex flex-col h-full bg-white/70 backdrop-blur-xl border border-blue-100 rounded-3xl p-5 shadow-soft-glass">
      {/* Studio Header & Naming */}
      <div className="mb-5">
        <label className="block text-xs font-bold uppercase tracking-wider text-pomify-purple mb-1.5 flex items-center gap-1.5">
          <Bot className="w-3.5 h-3.5" /> Robot Designation
        </label>
        <input
          type="text"
          value={robotName}
          onChange={(e) => setRobotName(e.target.value)}
          className="w-full px-4 py-2.5 rounded-2xl bg-white border border-blue-200 text-pomify-navy font-bold text-lg focus:outline-none focus:border-pomify-purple transition-all shadow-sm"
          placeholder="Name your Pomify..."
        />
      </div>

      {/* Color Selection Section */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="text-sm font-bold text-pomify-navy flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-pomify-purple" /> Body Colors
            </h4>
            <span className="text-[11px] font-semibold text-pomify-purple bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
              PBR Finish
            </span>
          </div>
          <p className="text-xs text-pomify-subtext">
            Choose your companion's official factory color theme.
          </p>
        </div>

        <div className="space-y-3">
          {COLOR_OPTIONS.map((c) => {
            const isSelected = color.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setColor(c)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? 'border-pomify-purple bg-blue-50/90 ring-2 ring-pomify-purple/30 shadow-sm'
                    : 'border-slate-100 bg-white hover:border-blue-200 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-10 h-10 rounded-2xl shadow-sm border-2 border-white flex items-center justify-center shrink-0"
                    style={{ backgroundColor: c.bodyColor }}
                  >
                    {isSelected && <Check className="w-5 h-5 text-slate-800 drop-shadow-sm" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-pomify-navy">{c.name}</span>
                      {c.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-[10px] font-bold text-pomify-purple">
                          {c.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-pomify-subtext mt-0.5">{c.desc}</p>
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
    </div>
  );
};

export default ControlPanel;
