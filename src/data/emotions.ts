import { EmotionOption } from '../types';

export const EMOTIONS: EmotionOption[] = [
  {
    id: 'vui',
    label: 'Vui',
    emoji: '😊',
    badgeColor: 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30',
    activeBg: 'bg-gradient-to-br from-emerald-600 to-teal-700',
    activeBorder: 'border-emerald-400 ring-2 ring-emerald-400/40 shadow-lg shadow-emerald-950/60',
    activeText: 'text-white',
  },
  {
    id: 'buon',
    label: 'Buồn',
    emoji: '🥺',
    badgeColor: 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30',
    activeBg: 'bg-gradient-to-br from-cyan-600 to-blue-700',
    activeBorder: 'border-cyan-400 ring-2 ring-cyan-400/40 shadow-lg shadow-cyan-950/60',
    activeText: 'text-white',
  },
  {
    id: 'lo_lang',
    label: 'Lo lắng',
    emoji: '😰',
    badgeColor: 'bg-amber-950/40 text-amber-300 border-amber-500/30',
    activeBg: 'bg-gradient-to-br from-amber-600 to-orange-700',
    activeBorder: 'border-amber-400 ring-2 ring-amber-400/40 shadow-lg shadow-amber-950/60',
    activeText: 'text-white',
  },
  {
    id: 'tuc_gian',
    label: 'Tức giận',
    emoji: '😤',
    badgeColor: 'bg-rose-950/40 text-rose-300 border-rose-500/30',
    activeBg: 'bg-gradient-to-br from-rose-600 to-red-700',
    activeBorder: 'border-rose-400 ring-2 ring-rose-400/40 shadow-lg shadow-rose-950/60',
    activeText: 'text-white',
  },
  {
    id: 'that_vong',
    label: 'Thất vọng',
    emoji: '😔',
    badgeColor: 'bg-indigo-950/40 text-indigo-300 border-indigo-500/30',
    activeBg: 'bg-gradient-to-br from-indigo-600 to-violet-700',
    activeBorder: 'border-indigo-400 ring-2 ring-indigo-400/40 shadow-lg shadow-indigo-950/60',
    activeText: 'text-white',
  },
  {
    id: 'boi_roi',
    label: 'Bối rối',
    emoji: '🤔',
    badgeColor: 'bg-purple-950/40 text-purple-300 border-purple-500/30',
    activeBg: 'bg-gradient-to-br from-purple-600 to-fuchsia-700',
    activeBorder: 'border-purple-400 ring-2 ring-purple-400/40 shadow-lg shadow-purple-950/60',
    activeText: 'text-white',
  },
];

export const SITUATION_EXAMPLES = [
  { emotion: 'lo_lang' as const, text: 'Em sắp có bài kiểm tra ngày mai và rất sợ bị điểm kém.' },
  { emotion: 'buon' as const, text: 'Em vừa có hiểu lầm và cãi nhau với bạn thân cùng bàn.' },
  { emotion: 'boi_roi' as const, text: 'Làm bài tập nhóm nhưng các bạn không chịu hợp tác làm phần của mình.' },
  { emotion: 'that_vong' as const, text: 'Em cảm thấy áp lực vì bài tập và lịch học thêm dồn dập.' },
  { emotion: 'lo_lang' as const, text: 'Em rất run và ngập ngừng mỗi khi phải đứng lên phát biểu trước lớp.' },
];
