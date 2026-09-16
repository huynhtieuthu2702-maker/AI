import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SafeTalkResponse } from '../types';
import { 
  HeartHandshake, 
  Smile,
  Lightbulb, 
  Users, 
  RotateCcw, 
  AlertTriangle, 
  PhoneCall,
  Tag,
  HelpCircle,
  Send,
  Loader2,
  ShieldCheck
} from 'lucide-react';

interface AiResponseViewProps {
  response: SafeTalkResponse;
  onReset: () => void;
  onSubmitClarification?: (answer: string) => void;
  isClarifying?: boolean;
}

export const AiResponseView: React.FC<AiResponseViewProps> = ({ 
  response, 
  onReset,
  onSubmitClarification,
  isClarifying = false,
}) => {
  const [clarificationInput, setClarificationInput] = useState('');

  const handleClarificationSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!clarificationInput.trim() || !onSubmitClarification || isClarifying) return;
    onSubmitClarification(clarificationInput.trim());
  };

  const handleSelectQuickOption = (optionText: string) => {
    setClarificationInput(optionText);
  };

  return (
    <motion.div 
      id="ai-response-container" 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full space-y-3.5"
    >
      {/* Emergency Crisis Banner if detected */}
      {response.isCrisis && (
        <div id="crisis-alert-box" className="p-4 rounded-2xl bg-amber-950/50 border border-amber-500/40 text-amber-200 shadow-lg shadow-amber-950/50">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5 text-sm">
              <p className="font-bold text-amber-100">
                Sự an toàn và sức khỏe của bạn là quan trọng nhất
              </p>
              <p className="text-amber-200/90 leading-relaxed">
                Tình huống này vượt quá khả năng hỗ trợ thông thường của SafeTalk. Hãy tìm kiếm sự trợ giúp ngay từ người lớn hoặc gọi:
              </p>
              <div className="inline-flex items-center gap-2 bg-amber-900/80 text-amber-100 font-bold px-3.5 py-1.5 rounded-xl border border-amber-500/40">
                <PhoneCall className="w-4 h-4 text-amber-300" />
                <span>Tổng đài Quốc gia Bảo vệ Trẻ em: 111 (Miễn phí 24/7)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Nhóm tình huống được nhận diện (Header Bar) */}
      {response.detectedCategory && (
        <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 shadow-md text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-slate-400 font-medium">
              <Tag className="w-3.5 h-3.5 text-cyan-400" />
              <span>Nhóm tình huống:</span>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-semibold border ${
              response.needsClarification 
                ? 'bg-amber-950/80 text-amber-300 border-amber-500/40' 
                : 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40'
            }`}>
              {response.detectedCategory}
            </span>
          </div>

          {response.needsClarification ? (
            <span className="text-amber-300 font-medium text-xs">
              💬 Cần 1 câu làm rõ
            </span>
          ) : (
            <span className="text-emerald-300 font-medium text-xs">
              ✓ Đã có gợi ý phù hợp
            </span>
          )}
        </div>
      )}

      {/* Thẻ 1: Mình hiểu rằng (Cosmic Cyan) */}
      <div 
        id="card-understanding" 
        className="bg-gradient-to-br from-cyan-950/40 via-slate-900/80 to-slate-950/90 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 shadow-lg shadow-cyan-950/30 transition-all"
      >
        <div className="flex items-center gap-2.5 mb-2 text-cyan-300 font-semibold text-sm">
          <div className="w-6 h-6 rounded-full bg-cyan-900/60 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0">
            <HeartHandshake className="w-3.5 h-3.5" />
          </div>
          <h3 className="tracking-tight">Mình hiểu rằng</h3>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-normal pl-8 sm:pl-8.5">
          {response.understanding}
        </p>
      </div>

      {/* Thẻ 2: Cảm xúc bạn đang mô tả (Galactic Purple) */}
      <div 
        id="card-emotion-reflection" 
        className="bg-gradient-to-br from-purple-950/40 via-slate-900/80 to-slate-950/90 border border-purple-500/30 rounded-2xl p-4 sm:p-5 shadow-lg shadow-purple-950/30 transition-all"
      >
        <div className="flex items-center gap-2.5 mb-2 text-purple-300 font-semibold text-sm">
          <div className="w-6 h-6 rounded-full bg-purple-900/60 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0">
            <Smile className="w-3.5 h-3.5" />
          </div>
          <h3 className="tracking-tight">Cảm xúc bạn đang mô tả</h3>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-normal pl-8 sm:pl-8.5">
          {response.emotionReflection}
        </p>
      </div>

      {/* NẾU TÌNH HUỐNG MƠ HỒ: Thẻ làm rõ duy nhất (Cosmic Amber) */}
      {response.needsClarification && response.clarifyingQuestion ? (
        <div 
          id="card-clarification" 
          className="bg-gradient-to-br from-amber-950/40 via-slate-900/80 to-slate-950/90 border border-amber-500/35 rounded-2xl p-4 sm:p-5 shadow-lg shadow-amber-950/40 space-y-3.5"
        >
          <div className="flex items-center gap-2.5 text-amber-300 font-semibold text-sm">
            <div className="w-6 h-6 rounded-full bg-amber-900/60 border border-amber-500/40 flex items-center justify-center text-amber-300 shrink-0">
              <HelpCircle className="w-3.5 h-3.5" />
            </div>
            <h3 className="tracking-tight">SafeTalk muốn hiểu bạn hơn trước khi đưa gợi ý</h3>
          </div>

          <div className="pl-8 sm:pl-8.5 space-y-3">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-amber-500/30 text-sm text-amber-100 font-medium leading-relaxed">
              💬 {response.clarifyingQuestion}
            </div>

            {/* Gợi ý chọn nhanh */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-slate-400 font-medium">Gợi ý chọn nhanh:</span>
              {[
                'Việc học & bài kiểm tra',
                'Mâu thuẫn với bạn bè',
                'Làm việc nhóm',
                'Một việc khác',
              ].map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  disabled={isClarifying}
                  onClick={() => handleSelectQuickOption(opt)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-amber-950/70 hover:text-amber-200 text-slate-300 border border-slate-700 hover:border-amber-500/40 transition-colors cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Ô nhập trả lời */}
            <form onSubmit={handleClarificationSubmit} className="space-y-2">
              <div className="relative">
                <input
                  id="clarification-input"
                  type="text"
                  value={clarificationInput}
                  disabled={isClarifying}
                  onChange={(e) => setClarificationInput(e.target.value)}
                  placeholder="Nhập ngắn gọn câu trả lời của bạn..."
                  className="w-full rounded-xl border border-amber-500/40 p-3 pr-24 text-sm text-slate-100 bg-slate-950/80 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all shadow-inner"
                  maxLength={200}
                />
                <button
                  id="submit-clarification-btn"
                  type="submit"
                  disabled={!clarificationInput.trim() || isClarifying}
                  className={`absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    !clarificationInput.trim() || isClarifying
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold shadow-xs'
                  }`}
                >
                  {isClarifying ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Gửi trả lời</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 px-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Bạn không cần nhập tên thật hoặc thông tin cá nhân.</span>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* Thẻ 3: Bạn có thể thử (Aurora Emerald) */
        <div 
          id="card-suggestions" 
          className="bg-gradient-to-br from-emerald-950/40 via-slate-900/80 to-slate-950/90 border border-emerald-500/30 rounded-2xl p-4 sm:p-5 shadow-lg shadow-emerald-950/30 transition-all space-y-2.5"
        >
          <div className="flex items-center gap-2.5 text-emerald-300 font-semibold text-sm">
            <div className="w-6 h-6 rounded-full bg-emerald-900/60 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <h3 className="tracking-tight">Bạn có thể thử</h3>
          </div>
          
          <div className="pl-8 sm:pl-8.5 space-y-2">
            <ul className="space-y-2">
              {response.suggestions.map((item, idx) => (
                <li
                  key={idx}
                  className="text-sm text-slate-200 flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-emerald-500/20 leading-relaxed shadow-inner"
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-900/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Thẻ 4: Nếu cần thêm hỗ trợ (Stellar Indigo) */}
      <div 
        id="card-support-recommendation" 
        className="bg-gradient-to-br from-indigo-950/40 via-slate-900/80 to-slate-950/90 border border-indigo-500/30 rounded-2xl p-4 sm:p-5 shadow-lg shadow-indigo-950/30 transition-all"
      >
        <div className="flex items-center gap-2.5 mb-2 text-indigo-300 font-semibold text-sm">
          <div className="w-6 h-6 rounded-full bg-indigo-900/60 border border-indigo-500/30 flex items-center justify-center text-indigo-300 shrink-0">
            <Users className="w-3.5 h-3.5" />
          </div>
          <h3 className="tracking-tight">Nếu cần thêm hỗ trợ</h3>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-normal pl-8 sm:pl-8.5">
          {response.supportRecommendation}
        </p>
      </div>

      {/* Reset Action */}
      <div className="text-center pt-3">
        <button
          id="reset-situation-btn"
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-800 bg-slate-900/80 transition-all border border-slate-700 hover:border-cyan-500/40 cursor-pointer shadow-md shadow-indigo-950/50 active:scale-[0.99]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Chia sẻ một tình huống khác</span>
        </button>
      </div>
    </motion.div>
  );
};
