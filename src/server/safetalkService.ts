import { GoogleGenAI, Type } from "@google/genai";
import { SafeTalkResponse } from "../types";

// Lazy-initialize Gemini AI client
let aiClient: GoogleGenAI | null = null;
export function getAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Map emotion ID to readable Vietnamese name
export const emotionLabelMap: Record<string, string> = {
  vui: "Vui vẻ",
  buon: "Buồn bã",
  lo_lang: "Lo lắng",
  tuc_gian: "Tức giận",
  that_vong: "Thất vọng",
  boi_roi: "Bối rối",
};

// Function to sanitize and scrub any personal identifiers
export function sanitizePersonalInfo(text: string): string {
  if (!text) return "";
  let sanitized = text;

  // Mask Vietnamese and international phone numbers
  sanitized = sanitized.replace(/(?:\+84|0)[3|5|7|8|9][0-9]{8}\b/g, "[số điện thoại]");
  sanitized = sanitized.replace(/\b0\d{9,10}\b/g, "[số điện thoại]");

  // Mask email addresses
  sanitized = sanitized.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, "[email]");

  // Mask explicit intro phrases: "tên em là...", "em tên là...", "tôi tên là..."
  sanitized = sanitized.replace(
    /(?:tên em là|em tên là|mình tên là|tôi tên là|tên tôi là)\s+([A-ZÀ-Ỹa-zà-ỹ\s]+?)(?=[,.\n]|$)/gi,
    "em"
  );

  // Mask school mentions: "trường THCS [Tên]", "em học trường..."
  sanitized = sanitized.replace(
    /(?:em học trường|học sinh trường|học trường|trường THCS|trường tiểu học|trường)\s+([A-ZÀ-Ỹa-zà-ỹ0-9\s]+?)(?=[,.\n]|$)/gi,
    "ở trường"
  );

  // Mask address mentions: "nhà em ở...", "địa chỉ nhà ở..."
  sanitized = sanitized.replace(
    /(?:nhà em ở|địa chỉ ở|địa chỉ nhà|sống tại)\s+([A-ZÀ-Ỹa-zà-ỹ0-9\s,]+?)(?=[.\n]|$)/gi,
    "ở nhà"
  );

  return sanitized;
}

// Check if a situation description is overly vague or lacks cause/context
export function isSituationVague(text: string): boolean {
  const trimmed = text.trim();
  const lower = trimmed.toLowerCase();

  // If very short and contains no context clues
  if (trimmed.length < 35) {
    const contextKeywords = [
      "kiểm tra",
      "thi",
      "điểm",
      "bài tập",
      "ôn bài",
      "thầy",
      "cô",
      "giáo viên",
      "bạn",
      "cãi",
      "nhóm",
      "lớp",
      "học",
      "phát biểu",
      "bố",
      "mẹ",
      "gia đình",
      "tẩy chay",
      "hiểu lầm",
      "dự án",
      "thuyết trình",
      "lo vì",
      "buồn vì",
      "sợ vì",
    ];
    const hasSpecificContext = contextKeywords.some((kw) => lower.includes(kw));
    if (!hasSpecificContext) {
      return true;
    }
    // If it only has an isolated word like "lo quá" or "bài tập" with no elaboration
    if (trimmed.length < 18) {
      return true;
    }
  }

  // Classic vague phrases
  const vaguePhrases = [
    "em đang rất lo",
    "em lo quá",
    "em rất lo",
    "em buồn quá",
    "em rất buồn",
    "chán quá",
    "em tức quá",
    "em thấy bế tắc",
    "em không biết làm sao",
    "em sợ quá",
    "em đang mệt mỏi",
  ];
  if (vaguePhrases.some((vp) => lower === vp || lower.startsWith(vp + ".") || lower.startsWith(vp + "!"))) {
    return true;
  }

  return false;
}

// Check for emergency crisis indicators
export function detectCrisis(text: string): boolean {
  const crisisKeywords = [
    "tự tử",
    "tự sát",
    "tự hại",
    "rạch tay",
    "muốn chết",
    "kết thúc cuộc sống",
    "bị đánh đập dã man",
    "xâm hại",
  ];
  const lower = text.toLowerCase();
  return crisisKeywords.some((kw) => lower.includes(kw));
}

// Fallback response generator if Gemini key is not set or network fails
export function generateSafeFallback(
  emotionId: string,
  situation: string,
  clarificationAnswer?: string
): SafeTalkResponse {
  const emotionName = emotionLabelMap[emotionId] || "Cảm xúc";
  const trimmedSituation = sanitizePersonalInfo(situation.trim());
  const trimmedAnswer = clarificationAnswer ? sanitizePersonalInfo(clarificationAnswer.trim()) : "";
  const combinedText = trimmedAnswer ? `${trimmedSituation} - ${trimmedAnswer}` : trimmedSituation;
  const lower = combinedText.toLowerCase();

  if (detectCrisis(combinedText)) {
    return {
      detectedCategory: "Hỗ trợ an toàn khẩn cấp",
      needsClarification: false,
      understanding: "Mình nhận thấy bạn đang trải qua tình huống rất khó khăn và áp lực.",
      emotionReflection: "Có vẻ như bạn đang cảm thấy quá tải và cần được bảo vệ an toàn ngay lúc này.",
      clarifyingQuestion: "",
      suggestions: [
        "Hãy tạm dừng mọi việc, uống một ngụm nước ấm và ngồi gần người thân hoặc bạn bè.",
        "Chia sẻ ngay với cha mẹ, thầy cô hoặc người lớn mà bạn tin tưởng nhất.",
      ],
      supportRecommendation:
        "Bạn hãy gọi ngay tới Tổng đài Quốc gia Bảo vệ Trẻ em 111 (miễn phí 24/7) hoặc nói chuyện với người lớn để nhận được hỗ trợ kịp thời nhé.",
      isCrisis: true,
    };
  }

  // Check if situation is overly vague and user has not yet clarified
  if (!trimmedAnswer && isSituationVague(trimmedSituation)) {
    let question = "Điều gì đang khiến bạn cảm thấy như vậy: việc học, bạn bè hay một việc khác?";
    if (emotionId === "lo_lang") {
      question = "Điều gì đang khiến bạn lo nhất lúc này: việc học, bạn bè hay một việc khác?";
    } else if (emotionId === "buon") {
      question = "Điều gì đang làm bạn buồn lòng: một chuyện ở trường, bạn bè hay gia đình?";
    } else if (emotionId === "tuc_gian") {
      question = "Chuyện gì vừa xảy ra khiến bạn bực bội: bất đồng với bạn bè hay một điều chưa như ý?";
    } else if (emotionId === "that_vong") {
      question = "Điều gì đã không diễn ra như bạn kỳ vọng: kết quả một bài kiểm tra hay một lời hứa?";
    } else if (emotionId === "boi_roi") {
      question = "Bạn đang băn khoăn về vấn đề gì nhất: cách làm bài tập hay cách ứng xử với mọi người?";
    }

    return {
      detectedCategory: "Cần làm rõ tình huống",
      needsClarification: true,
      understanding: `Mình lắng nghe bạn và hiểu rằng bạn đang cảm thấy ${emotionName.toLowerCase()} lúc này.`,
      emotionReflection: `Khi có điều gì đó chưa rõ ràng làm bạn bận tâm, cảm giác ${emotionName.toLowerCase()} là phản ứng rất tự nhiên.`,
      clarifyingQuestion: question,
      suggestions: [], // Không đưa gợi ý vội khi chưa rõ tình huống
      supportRecommendation:
        "Bạn hãy trả lời câu hỏi nhỏ phía trên để SafeTalk đưa ra những gợi ý phù hợp nhất cho bạn nhé.",
      isCrisis: false,
    };
  }

  // Detect category based on situation keywords
  let category = "Áp lực học tập";
  let specificSuggestions: string[] = [];
  let supportPerson = "thầy cô hoặc cha mẹ";

  if (
    lower.includes("kiểm tra") ||
    lower.includes("thi") ||
    lower.includes("điểm") ||
    lower.includes("ôn bài") ||
    lower.includes("sợ điểm kém") ||
    lower.includes("sợ rớt")
  ) {
    category = "Lo lắng trước bài kiểm tra";
    supportPerson = "thầy cô bộ môn hoặc cha mẹ";
    specificSuggestions = [
      "Bạn hãy chia tài liệu thành từng phần nhỏ và ôn tập tập trung trong 20 phút rồi nghỉ giải lao 5 phút.",
      "Thử làm trước các bài tập dễ để lấy lại sự tự tin rồi mới chuyển sang phần khó hơn.",
      "Trước khi phát đề, bạn hãy hít sâu 3 nhịp chậm rãi để tâm trí bình tĩnh và tỉnh táo.",
    ];
  } else if (
    lower.includes("nhóm") ||
    lower.includes("làm nhóm") ||
    lower.includes("phân công") ||
    lower.includes("không chịu làm") ||
    lower.includes("bất đồng")
  ) {
    category = "Khó khăn khi làm việc nhóm";
    supportPerson = "thầy cô giáo hướng dẫn hoặc bạn nhóm trưởng";
    specificSuggestions = [
      "Bạn hãy cùng các bạn lập một bảng phân chia công việc rõ ràng với thời hạn cụ thể cho từng phần.",
      "Thử nhắn tin trao đổi nhẹ nhàng với bạn cùng nhóm để lắng nghe xem bạn ấy có đang gặp vướng mắc gì không.",
      "Nếu nhóm chưa thể tìm được tiếng nói chung, bạn có thể nhờ thầy cô bộ môn hướng dẫn cách giải quyết.",
    ];
  } else if (
    lower.includes("bạn") ||
    lower.includes("cãi") ||
    lower.includes("hiểu lầm") ||
    lower.includes("tẩy chay") ||
    lower.includes("nghỉ chơi") ||
    lower.includes("giận") ||
    lower.includes("nói xấu")
  ) {
    category = "Mâu thuẫn với bạn bè";
    supportPerson = "thầy cô chủ nhiệm hoặc cha mẹ";
    specificSuggestions = [
      "Bạn hãy đợi cả hai bình tâm lại một chút trước khi nhắn tin hoặc gặp riêng bạn để nói chuyện.",
      "Thử mở lời bằng cảm nghĩ của mình như 'Hôm trước mình thấy buồn vì...' thay vì đổ lỗi cho bạn.",
      "Bạn có thể viết ra giấy những điều mình muốn giải thích để khi nói chuyện không bị bối rối.",
    ];
  } else if (
    lower.includes("giao tiếp") ||
    lower.includes("phát biểu") ||
    lower.includes("đứng trước lớp") ||
    lower.includes("ngại") ||
    lower.includes("sợ nói") ||
    lower.includes("ngượng") ||
    lower.includes("bối rối") ||
    lower.includes("không dám")
  ) {
    category = "Bối rối trong giao tiếp";
    supportPerson = "thầy cô giáo hoặc một người bạn thân";
    specificSuggestions = [
      "Bạn hãy ghi trước ra giấy nháp 1 hoặc 2 ý chính mà mình dự định phát biểu.",
      "Thử tập nói thầm một lần trong đầu hoặc chia sẻ trước với bạn ngồi bên cạnh.",
      "Bạn hãy nhớ rằng việc hơi ngập ngừng khi phát biểu trước lớp là điều hoàn toàn bình thường.",
    ];
  } else {
    category = "Áp lực học tập";
    supportPerson = "thầy cô giáo hoặc cha mẹ";
    specificSuggestions = [
      "Bạn hãy ghi các bài cần nộp ra giấy và đánh dấu bài nào cần hoàn thành trước tiên.",
      "Cứ sau 45 phút học bài, bạn hãy đứng dậy đi lại và uống một ngụm nước mát để thả lỏng.",
      "Bạn có thể trao đổi với thầy cô hoặc phụ huynh để nhận lời khuyên sắp xếp thời gian hợp lý hơn.",
    ];
  }

  const understandingText = trimmedAnswer
    ? `Mình hiểu rằng bạn đang gặp khó khăn: ${trimmedSituation}, cụ thể là về ${trimmedAnswer}.`
    : `Mình hiểu rằng bạn đang gặp tình huống: "${trimmedSituation}".`;

  return {
    detectedCategory: category,
    needsClarification: false,
    understanding: understandingText,
    emotionReflection: `Dường như bạn đang cảm thấy ${emotionName.toLowerCase()} vì tình huống thuộc nhóm ${category.toLowerCase()} này.`,
    clarifyingQuestion: "",
    suggestions: specificSuggestions,
    supportRecommendation: `Nếu bạn cảm thấy cần thêm sự trợ giúp, hãy cởi mở trao đổi với ${supportPerson} nhé.`,
    isCrisis: false,
  };
}

// Helper to split text by punctuation
export function splitSentences(text: string): string[] {
  if (!text) return [];
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

// Main handler for SafeTalk analysis (called by server.ts and Vercel Serverless Function)
export async function handleSafeTalkRequest(body: {
  emotion?: string;
  situation?: string;
  clarificationAnswer?: string;
}): Promise<{ status?: number; error?: string; data?: SafeTalkResponse }> {
  const { emotion, situation, clarificationAnswer } = body || {};

  if (!emotion || !situation || typeof situation !== "string" || !situation.trim()) {
    return {
      status: 400,
      error: "Vui lòng chọn cảm xúc và chia sẻ ngắn gọn tình huống đang gặp.",
    };
  }

  // 1. Sanitize all user inputs immediately for privacy
  const cleanSituation = sanitizePersonalInfo(situation.trim());
  const cleanClarification =
    clarificationAnswer && typeof clarificationAnswer === "string"
      ? sanitizePersonalInfo(clarificationAnswer.trim())
      : "";
  const emotionName = emotionLabelMap[emotion] || emotion;

  // 2. Check emergency crisis upfront
  const combinedSituation = cleanClarification
    ? `${cleanSituation} (Chi tiết: ${cleanClarification})`
    : cleanSituation;

  if (detectCrisis(combinedSituation)) {
    return {
      status: 200,
      data: generateSafeFallback(emotion, cleanSituation, cleanClarification),
    };
  }

  const ai = getAI();

  // If GEMINI_API_KEY is not configured or client fails, gracefully use fallback
  if (!ai) {
    return {
      status: 200,
      data: generateSafeFallback(emotion, cleanSituation, cleanClarification),
    };
  }

  const systemInstruction = `Bạn là SafeTalk AI – Người bạn đồng hành cảm xúc dành cho học sinh Trung học cơ sở (THCS, độ tuổi 11-15 tuổi).
Mục tiêu: Giúp học sinh nhận diện, diễn đạt cảm xúc, suy nghĩ rõ hơn và nhận gợi ý đơn giản, an toàn.

QUY TẮC BẢO MẬT DỮ LIỆU & QUYỀN RIÊNG TƯ (BẮT BUỘC):
1. KHÔNG yêu cầu họ tên thật, địa chỉ, số điện thoại, tên trường lớp hay bất kỳ thông tin cá nhân nào.
2. NẾU NGƯỜI DÙNG VÔ TÌNH NHẬP THÔNG TIN CÁ NHÂN (tên riêng, số điện thoại, địa chỉ, trường lớp, tên bạn bè...), AI TUYỆT ĐỐI KHÔNG ĐƯỢC LẶP LẠI THÔNG TIN ĐÓ TRONG BẤT KỲ PHẦN NÀO CỦA PHẢN HỒI. Hãy luôn xưng hô ẩn danh bằng 'Bạn' và 'Mình', nhắc đến trường lớp chung.

QUY TRÌNH PHÂN TÍCH & LÀM RÕ (TRÁNH ĐƯA RA GỢI Ý QUÁ SỚM):
1. Nếu người dùng CHƯA có câu trả lời làm rõ VÀ tình huống QUÁ MƠ HỒ (chỉ nêu cảm xúc ngắn gọn như 'Em đang rất lo', 'Em buồn quá', 'Chán quá', chưa có nguyên nhân hay bối cảnh cụ thể):
   - Đặt needsClarification = true.
   - clarifyingQuestion: ĐÚNG 1 câu hỏi ngắn gợi mở các hướng cụ thể (Ví dụ: "Điều gì đang khiến bạn lo nhất lúc này: việc học, bạn bè hay một việc khác?").
   - suggestions = [] (MẢNG RỖNG! Tuyệt đối KHÔNG đưa ra gợi ý hay lời khuyên khi tình huống quá mơ hồ).
   - understanding: Tối đa 2 câu ngắn lắng nghe và đồng cảm.
   - emotionReflection: Đúng 1 câu ngắn phản chiếu cảm xúc.
   - supportRecommendation: Đúng 1 câu ngắn khuyến khích trả lời câu hỏi nhỏ trên.
2. Nếu tình huống ĐÃ ĐỦ RÕ RÀNG HOẶC người dùng ĐÃ TRẢ LỜI CÂU HỎI LÀM RÕ (đã có clarificationAnswer):
   - Đặt needsClarification = false.
   - clarifyingQuestion = "". (KHÔNG ĐƯỢC HỎI THÊM, TUYỆT ĐỐI KHÔNG HỎI LIÊN TỤC).
   - detectedCategory: Xác định rõ nhóm tình huống (ví dụ: Lo lắng trước bài kiểm tra, Mâu thuẫn với bạn bè, Khó khăn khi làm việc nhóm, Áp lực học tập, Bối rối trong giao tiếp...).
   - understanding: Tối đa 2 câu ngắn tóm tắt tình huống và nguyên nhân chính.
   - emotionReflection: Đúng 1 câu ngắn phản chiếu cảm xúc.
   - suggestions: ĐÚNG 3 gợi ý vi mô (mỗi gợi ý đúng 1 câu ngắn), bám sát nguyên nhân vừa làm rõ.
   - supportRecommendation: Đúng 1 câu ngắn khuyến khích chia sẻ với người lớn đáng tin cậy.

QUY TẮC AN TOÀN BẮT BUỘC:
- KHÔNG chẩn đoán bệnh lý hay tâm thần học (CẤM dùng: 'trầm cảm', 'rối loạn', 'bệnh', 'yếu đuối').
- KHÔNG kê đơn thuốc hay tư vấn chuyên môn y tế.
- Giữ ngôn ngữ trong sáng, gần gũi, xưng hô 'Mình' và 'Bạn'.`;

  let prompt = "";
  if (cleanClarification) {
    prompt = `Học sinh THCS đang chọn cảm xúc: "${emotionName}"
Tình huống ban đầu: "${cleanSituation}"
Câu trả lời làm rõ của học sinh: "${cleanClarification}"

Học sinh ĐÃ TRẢ LỜI CÂU HỎI LÀM RÕ. Hãy phản hồi đầy đủ gợi ý ngay:
- needsClarification: false
- clarifyingQuestion: ""
- detectedCategory: Xác định nhóm tình huống (Lo lắng trước bài kiểm tra, Mâu thuẫn với bạn bè, Khó khăn khi làm việc nhóm, Áp lực học tập, Bối rối trong giao tiếp...)
- understanding: tối đa 2 câu ngắn tóm tắt bối cảnh và nguyên nhân học sinh vừa nêu.
- emotionReflection: đúng 1 câu ngắn.
- suggestions: đúng 3 gợi ý cụ thể, mỗi gợi ý đúng 1 câu ngắn.
- supportRecommendation: đúng 1 câu ngắn.`;
  } else {
    prompt = `Học sinh THCS đang chọn cảm xúc: "${emotionName}"
Tình huống học sinh mô tả: "${cleanSituation}"

Hãy phân tích và đánh giá:
- Nếu tình huống quá ngắn hoặc mơ hồ (ví dụ: 'Em đang rất lo', 'Em buồn quá', chưa nêu rõ chuyện gì):
  * needsClarification: true
  * clarifyingQuestion: đúng 1 câu hỏi ngắn gợi mở (ví dụ: "Điều gì đang khiến bạn lo nhất lúc này: việc học, bạn bè hay một việc khác?")
  * suggestions: [] (MẢNG RỖNG)
- Nếu tình huống đã đủ rõ (có chi tiết kiểm tra, mâu thuẫn bạn bè, bài tập...):
  * needsClarification: false
  * clarifyingQuestion: ""
  * suggestions: đúng 3 gợi ý cụ thể, mỗi gợi ý đúng 1 câu ngắn.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detectedCategory: {
              type: Type.STRING,
              description: "Nhóm tình huống cụ thể",
            },
            needsClarification: {
              type: Type.BOOLEAN,
              description:
                "True nếu tình huống quá mơ hồ và cần hỏi 1 câu làm rõ duy nhất; False nếu đã đủ rõ hoặc đã trả lời làm rõ",
            },
            understanding: {
              type: Type.STRING,
              description: "Phần 1: Mình hiểu rằng - tối đa 2 câu ngắn",
            },
            emotionReflection: {
              type: Type.STRING,
              description: "Phần 2: Cảm xúc bạn đang mô tả - đúng 1 câu ngắn",
            },
            clarifyingQuestion: {
              type: Type.STRING,
              description:
                "Nếu needsClarification=true: đúng 1 câu hỏi ngắn; Nếu needsClarification=false: chuỗi rỗng",
            },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description:
                "Phần 3: Bạn có thể thử - mảng rỗng nếu needsClarification=true; tối đa 3 gợi ý nếu false",
            },
            supportRecommendation: {
              type: Type.STRING,
              description: "Phần 4: Nếu cần thêm hỗ trợ - đúng 1 câu ngắn",
            },
            isCrisis: {
              type: Type.BOOLEAN,
              description: "Đánh dấu tình huống nguy cấp",
            },
          },
          required: [
            "detectedCategory",
            "needsClarification",
            "understanding",
            "emotionReflection",
            "suggestions",
            "supportRecommendation",
          ],
        },
      },
    });

    const responseText = response.text;
    if (!responseText) {
      return {
        status: 200,
        data: generateSafeFallback(emotion, cleanSituation, cleanClarification),
      };
    }

    const parsed = JSON.parse(responseText);

    // If clarification was already answered, force needsClarification to false
    if (cleanClarification) {
      parsed.needsClarification = false;
      parsed.clarifyingQuestion = "";
    }

    // If needsClarification is true, ensure suggestions is empty array
    if (parsed.needsClarification) {
      parsed.suggestions = [];
    }

    // 1. understanding: tối đa 2 câu
    if (parsed.understanding) {
      const sentences = splitSentences(parsed.understanding);
      parsed.understanding = sentences.length > 2 ? sentences.slice(0, 2).join(" ") : parsed.understanding;
    }

    // 2. emotionReflection: đúng 1 câu ngắn
    if (parsed.emotionReflection) {
      const sentences = splitSentences(parsed.emotionReflection);
      parsed.emotionReflection = sentences.length > 0 ? sentences[0] : parsed.emotionReflection;
    }

    // 3. clarifyingQuestion: đúng 1 câu ngắn nếu có
    if (parsed.clarifyingQuestion) {
      const sentences = splitSentences(parsed.clarifyingQuestion);
      parsed.clarifyingQuestion = sentences.length > 0 ? sentences[0] : "";
    }

    // 4. suggestions: tối đa 3 gợi ý, mỗi gợi ý đúng 1 câu ngắn (nếu không ở chế độ làm rõ)
    if (Array.isArray(parsed.suggestions) && !parsed.needsClarification) {
      parsed.suggestions = parsed.suggestions.slice(0, 3).map((item: string) => {
        const sentences = splitSentences(item);
        return sentences.length > 0 ? sentences[0] : item;
      });
    }

    // 5. supportRecommendation: đúng 1 câu ngắn
    if (parsed.supportRecommendation) {
      const sentences = splitSentences(parsed.supportRecommendation);
      parsed.supportRecommendation = sentences.length > 0 ? sentences[0] : parsed.supportRecommendation;
    }

    // 6. Strict Data Privacy Scrubbing: ensure NO personal info is leaked back
    parsed.understanding = sanitizePersonalInfo(parsed.understanding || "");
    parsed.emotionReflection = sanitizePersonalInfo(parsed.emotionReflection || "");
    parsed.clarifyingQuestion = sanitizePersonalInfo(parsed.clarifyingQuestion || "");
    parsed.supportRecommendation = sanitizePersonalInfo(parsed.supportRecommendation || "");
    if (Array.isArray(parsed.suggestions)) {
      parsed.suggestions = parsed.suggestions.map((s: string) => sanitizePersonalInfo(s));
    }

    return {
      status: 200,
      data: parsed as SafeTalkResponse,
    };
  } catch (err: any) {
    console.error("SafeTalk AI error:", err);
    return {
      status: 200,
      data: generateSafeFallback(emotion, cleanSituation, cleanClarification),
    };
  }
}
