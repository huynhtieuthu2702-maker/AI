import React from 'react';
import { motion } from 'motion/react';
import { EmotionId } from '../types';
import { EMOTIONS } from '../data/emotions';
import { 
  Sparkles, 
  ShieldCheck, 
  Compass, 
  PhoneCall, 
  Wind, 
  CheckCircle2,
  Loader2
} from 'lucide-react';

interface CosmicCompanionGuideProps {
  selectedEmotion: EmotionId | null;
  isLoading: boolean;
}

export const CosmicCompanionGuide: React.FC<CosmicCompanionGuideProps> = ({
  selectedEmotion,
  isLoading,
}) => {
  const currentEmotionObj = EMOTIONS.find(e => e.id === selectedEmotion);

  if (isLoading) {
    return (
      <div 
        id="cosmic-loading-card"
        className="bg-slate-900/80 rounded-3xl border border-indigo-500/30 p-6 sm:p-8 shadow-xl shadow-indigo-950/50 backdrop-blur-md flex flex-col items-center justify-center text-center min-h-[460px] space-y-5"
      >
        <div className="relative">
          {/* Animated pulse rings */}
          <div className="w-20 h-20 rounded-full bg-cyan-500/20 animate-ping absolute inset-0" />
          <div className="w-20 h-20 rounded-full bg-indigo-600/30 animate-pulse absolute inset-0" />
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white relative shadow-lg shadow-cyan-500/30">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>

        <div className="space-y-2 max-w-sm">
          <h3 className="text-lg font-bold text-white tracking-tight">
            SafeTalk đang lắng nghe bạn...
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Đang phân tích cảm xúc và chuẩn bị các góc nhìn tích cực, dịu êm để đồng hành cùng bạn.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-cyan-300 bg-cyan-950/70 border border-cyan-500/30 px-3.5 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>Không lưu trữ thông tin nhận dạng</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="cosmic-companion-guide"
      className="space-y-4"
    >
      {/* Active Emotion Spotlight Card if selected */}
      {currentEmotionObj ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-slate-900/90 via-indigo-950/60 to-slate-900/90 rounded-2xl border border-indigo-500/35 p-4 sm:p-5 shadow-lg shadow-indigo-950/40 backdrop-blur-md flex items-center gap-4"
        >
          <div className="text-3xl sm:text-4xl p-2.5 rounded-2xl bg-slate-950/70 border border-indigo-500/30 shadow-inner shrink-0">
            {currentEmotionObj.emoji}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Bạn đang cảm thấy:</span>
              <span className="text-xs font-bold text-cyan-300 px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30">
                {currentEmotionObj.label}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              SafeTalk luôn ở đây để lắng nghe bạn. Hãy viết vài dòng chia sẻ ở khung bên cạnh nhé!
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 rounded-2xl border border-indigo-500/25 p-4 sm:p-5 shadow-md shadow-indigo-950/30 backdrop-blur-md flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/70 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Khởi động hành trình chia sẻ</h4>
            <p className="text-xs text-slate-300">
              Chọn 1 trong 6 cảm xúc ở cột bên trái để bắt đầu trút bỏ âu lo.
            </p>
          </div>
        </div>
      )}

      {/* Main Guide: 4 Pillars of SafeTalk */}
      <div className="bg-slate-900/80 rounded-3xl border border-indigo-500/25 p-5 sm:p-6 shadow-xl shadow-indigo-950/50 backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white tracking-tight">
            Cách SafeTalk AI đồng hành cùng bạn
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-indigo-500/20 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-300 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Lắng nghe không phán xét</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px] sm:text-xs">
              Mọi cảm xúc của bạn đều có ý nghĩa và được tôn trọng trọn vẹn tại đây.
            </p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-indigo-500/20 space-y-1.5">
            <div className="flex items-center gap-2 text-purple-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span>Bảo mật & Ẩn danh</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px] sm:text-xs">
              Không lưu họ tên thật, trường lớp hay thông tin cá nhân của bạn.
            </p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-indigo-500/20 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold">
              <Compass className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>4 Thẻ giải tỏa rõ ràng</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px] sm:text-xs">
              Thấu hiểu, gọi tên cảm xúc, hành động cụ thể và hướng hỗ trợ tin cậy.
            </p>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-indigo-500/20 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-300 font-semibold">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Đường dây nóng 111</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px] sm:text-xs">
              Tổng đài Quốc gia Bảo vệ Trẻ em miễn phí 24/7 luôn sẵn sàng hỗ trợ.
            </p>
          </div>
        </div>

        {/* Quick Relaxation Mini Tip */}
        <div className="p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/50 to-purple-950/40 border border-cyan-500/30 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-cyan-900/60 border border-cyan-500/30 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
            <Wind className="w-4 h-4" />
          </div>
          <div className="text-xs space-y-1">
            <span className="font-semibold text-cyan-200 block">
              Mẹo hít thở vũ trụ 4-4-4:
            </span>
            <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
              Hít vào chậm 4 giây • Giữ nhẹ hơi thở 4 giây • Thở ra thật êm 4 giây. Nhịp thở đều sẽ giúp tâm trí bạn dịu lại ngay lập tức.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
