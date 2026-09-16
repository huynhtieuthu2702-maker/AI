import React from 'react';
import { EMOTIONS } from '../data/emotions';
import { EmotionId } from '../types';
import { Sparkles, Check } from 'lucide-react';

interface EmotionSelectorProps {
  selectedEmotion: EmotionId | null;
  onSelectEmotion: (emotion: EmotionId) => void;
  disabled?: boolean;
}

export const EmotionSelector: React.FC<EmotionSelectorProps> = ({
  selectedEmotion,
  onSelectEmotion,
  disabled = false,
}) => {
  return (
    <div id="emotion-selector-section" className="w-full">
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-semibold text-slate-200 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Lúc này bạn đang cảm thấy thế nào?</span>
        </label>
        <span className="text-xs text-slate-400 font-normal">
          {selectedEmotion ? 'Đã chọn 1 cảm xúc' : 'Chọn 1 cảm xúc phù hợp'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
        {EMOTIONS.map((item) => {
          const isSelected = selectedEmotion === item.id;
          return (
            <button
              key={item.id}
              id={`emotion-btn-${item.id}`}
              type="button"
              disabled={disabled}
              onClick={() => onSelectEmotion(item.id)}
              className={`relative min-h-[52px] px-3.5 py-3 rounded-2xl text-sm font-medium transition-all duration-200 flex items-center justify-between gap-2 border cursor-pointer select-none ${
                isSelected
                  ? `${item.activeBg} ${item.activeBorder} ${item.activeText} scale-[1.02]`
                  : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 hover:text-white shadow-xs active:scale-[0.98]'
              } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl leading-none filter drop-shadow-xs" role="img" aria-label={item.label}>
                  {item.emoji}
                </span>
                <span className="font-semibold tracking-tight text-sm">
                  {item.label}
                </span>
              </div>

              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
