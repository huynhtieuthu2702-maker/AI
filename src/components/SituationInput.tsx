import React from 'react';
import { Send, Loader2, ShieldCheck } from 'lucide-react';
import { SITUATION_EXAMPLES } from '../data/emotions';
import { EmotionId } from '../types';

interface SituationInputProps {
  situation: string;
  onSituationChange: (text: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  selectedEmotion: EmotionId | null;
  onSelectExample: (emotion: EmotionId, text: string) => void;
}

export const SituationInput: React.FC<SituationInputProps> = ({
  situation,
  onSituationChange,
  onSubmit,
  isLoading,
  selectedEmotion,
  onSelectExample,
}) => {
  const isSubmitDisabled = !selectedEmotion || !situation.trim() || isLoading;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      if (!isSubmitDisabled) {
        onSubmit();
      }
    }
  };

  return (
    <div id="situation-input-section" className="w-full mt-5">
      {/* Quick Example Chips */}
      <div className="mb-3">
        <span className="text-xs text-slate-400 font-medium block mb-1.5">
          Gợi ý nhanh cho bạn:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {SITUATION_EXAMPLES.map((ex, index) => (
            <button
              key={index}
              id={`quick-example-btn-${index}`}
              type="button"
              disabled={isLoading}
              onClick={() => onSelectExample(ex.emotion, ex.text)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-900/70 text-slate-300 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800 hover:text-cyan-200 transition-colors text-left cursor-pointer"
            >
              💬 {ex.text}
            </button>
          ))}
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="situation-textarea"
            className="block text-sm font-semibold text-slate-200"
          >
            Chia sẻ tình huống của bạn
          </label>
        </div>

        <textarea
          id="situation-textarea"
          rows={5}
          value={situation}
          disabled={isLoading}
          onChange={(e) => onSituationChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Điều gì đang xảy ra? Bạn có thể chia sẻ ngắn gọn tại đây..."
          className="w-full rounded-2xl border border-indigo-500/30 p-4 text-sm text-slate-100 bg-slate-950/70 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-400 transition-all resize-none shadow-inner leading-relaxed"
          maxLength={600}
        />
        
        {/* Exact reminder below textarea + character count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mt-2 text-xs text-slate-400 px-1">
          <div className="flex items-center gap-1.5 text-cyan-200 font-medium bg-cyan-950/50 border border-cyan-500/30 px-2.5 py-1 rounded-lg self-start">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Bạn không cần nhập tên thật hoặc thông tin cá nhân.</span>
          </div>
          <span className="text-slate-500 self-end sm:self-center">{situation.length}/600</span>
        </div>
      </div>

      {/* Submit Button */}
      <div className="mt-5">
        <button
          id="submit-safetalk-btn"
          type="button"
          disabled={isSubmitDisabled}
          onClick={onSubmit}
          className={`w-full py-3.5 px-6 rounded-2xl font-semibold text-base flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer ${
            isSubmitDisabled
              ? 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-slate-700/50 shadow-none'
              : 'bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-950/70 hover:shadow-indigo-500/30 active:scale-[0.99] border border-indigo-400/40'
          }`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>SafeTalk đang lắng nghe và suy nghĩ...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Chia sẻ với SafeTalk</span>
            </>
          )}
        </button>

        {!selectedEmotion && !isLoading && (
          <p className="text-xs text-amber-300 text-center mt-2.5 font-medium">
            💡 Hãy chọn một cảm xúc ở phía trên để tiếp tục nhé.
          </p>
        )}
      </div>
    </div>
  );
};
