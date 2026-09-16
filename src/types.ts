export type EmotionId = 'vui' | 'buon' | 'lo_lang' | 'tuc_gian' | 'that_vong' | 'boi_roi';

export interface EmotionOption {
  id: EmotionId;
  label: string;
  emoji: string;
  badgeColor: string;
  activeBg: string;
  activeBorder: string;
  activeText: string;
}

export interface SafeTalkRequest {
  emotion: EmotionId;
  situation: string;
  clarificationAnswer?: string;   // Câu trả lời cho câu hỏi làm rõ của AI (nếu có)
}

export interface SafeTalkResponse {
  detectedCategory?: string;      // Nhóm tình huống (áp lực học tập, mâu thuẫn bạn bè, làm việc nhóm, bài kiểm tra, giao tiếp...)
  needsClarification: boolean;    // True nếu tình huống quá mơ hồ và AI đang hỏi 1 câu làm rõ duy nhất
  understanding: string;          // Phần 1: Mình hiểu rằng... (tối đa 2 câu)
  emotionReflection: string;      // Phần 2: Cảm xúc bạn đang mô tả... (1 câu)
  suggestions: string[];          // Phần 3: Bạn có thể thử... (chỉ đưa ra khi đã đủ thông tin rõ ràng)
  clarifyingQuestion?: string;    // Đúng 1 câu hỏi làm rõ khi needsClarification = true
  supportRecommendation: string;  // Phần 4: Nếu cần thêm hỗ trợ... (1 câu)
  isCrisis?: boolean;             // Cảnh báo khẩn cấp nếu có nguy cơ tự hại/nguy hiểm
}
