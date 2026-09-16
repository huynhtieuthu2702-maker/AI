import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header id="app-header" className="pt-6 pb-4 text-center w-full max-w-5xl mx-auto px-4">
      {/* Cosmic Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/40 text-cyan-300 text-xs font-semibold tracking-wide mb-3 shadow-sm shadow-indigo-950/50 backdrop-blur-sm">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>Trạm lắng nghe cảm xúc • Không gian vũ trụ an toàn</span>
      </div>

      {/* Main App Title with cosmic gradient */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white flex items-center justify-center gap-2 drop-shadow-md">
        <span className="bg-gradient-to-r from-cyan-200 via-indigo-100 to-purple-200 bg-clip-text text-transparent">
          SafeTalk AI – Người bạn đồng hành cảm xúc
        </span>
        <span className="text-xl sm:text-2xl" role="img" aria-label="Vũ trụ">✨🪐</span>
      </h1>

      {/* Exact required subtitle */}
      <p className="text-sm sm:text-base lg:text-lg text-slate-300 mt-2 font-medium">
        Một nơi để bạn chia sẻ điều mình đang cảm thấy.
      </p>

      {/* Trust & Boundary Indicator in cosmic glass pill */}
      <div className="mt-3 inline-flex items-center gap-3 text-xs text-slate-300 bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-indigo-500/30 shadow-sm shadow-indigo-950/30">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          Ẩn danh tuyệt đối
        </span>
        <span className="text-indigo-400/50">•</span>
        <span className="flex items-center gap-1.5">
          <HeartHandshake className="w-3.5 h-3.5 text-purple-400" />
          Đồng hành & lắng nghe
        </span>
      </div>
    </header>
  );
};
