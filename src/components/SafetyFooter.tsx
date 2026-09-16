import React from 'react';
import { Shield, LifeBuoy, Heart } from 'lucide-react';

export const SafetyFooter: React.FC = () => {
  return (
    <footer id="app-footer" className="mt-14 py-8 border-t border-slate-800/80 text-center text-xs text-slate-400 max-w-2xl mx-auto px-4 space-y-3">
      <div className="flex flex-wrap items-center justify-center gap-3 text-slate-300 font-medium">
        <span className="inline-flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-indigo-500/30 shadow-sm shadow-indigo-950/40">
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          Bảo mật & Ẩn danh tuyệt đối
        </span>
        <span className="inline-flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-indigo-500/30 shadow-sm shadow-indigo-950/40">
          <LifeBuoy className="w-3.5 h-3.5 text-indigo-400" />
          Tổng đài Quốc gia Trẻ em: 111 (Miễn phí)
        </span>
      </div>

      <p className="text-slate-400 max-w-md mx-auto leading-relaxed text-[11px] sm:text-xs">
        SafeTalk AI là trạm không gian an toàn giúp bạn gọi tên cảm xúc và tìm lại bình tĩnh. Khi cần trợ giúp lớn hơn, hãy trò chuyện trực tiếp với người lớn đáng tin cậy.
      </p>

      <div className="text-[11px] text-slate-500 flex items-center justify-center gap-1 pt-0.5">
        <span>Đồng hành cùng học sinh mỗi ngày</span>
        <Heart className="w-3 h-3 text-pink-400 fill-pink-400 inline filter drop-shadow-xs" />
      </div>
    </footer>
  );
};
