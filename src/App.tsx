import { useState, useRef } from 'react';
import { Header } from './components/Header';
import { EmotionSelector } from './components/EmotionSelector';
import { SituationInput } from './components/SituationInput';
import { AiResponseView } from './components/AiResponseView';
import { SafetyFooter } from './components/SafetyFooter';
import { CosmicBackground } from './components/CosmicBackground';
import { CosmicCompanionGuide } from './components/CosmicCompanionGuide';
import { EmotionId, SafeTalkResponse } from './types';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionId | null>(null);
  const [situation, setSituation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isClarifying, setIsClarifying] = useState<boolean>(false);
  const [response, setResponse] = useState<SafeTalkResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const responseSectionRef = useRef<HTMLDivElement | null>(null);

  const handleSelectEmotion = (emotion: EmotionId) => {
    setSelectedEmotion(emotion);
    setErrorMessage(null);
  };

  const handleSelectExample = (emotion: EmotionId, text: string) => {
    setSelectedEmotion(emotion);
    setSituation(text);
    setErrorMessage(null);
  };

  const handleSubmit = async () => {
    if (!selectedEmotion || !situation.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/safetalk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emotion: selectedEmotion,
          situation: situation.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Không thể kết nối với máy chủ, vui lòng thử lại sau.');
      }

      const data: SafeTalkResponse = await res.json();
      setResponse(data);

      // Smooth scroll to response
      setTimeout(() => {
        responseSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        'Đã có chút gián đoạn khi gửi thông tin. Bạn hãy thử lại sau vài giây nhé!'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClarificationSubmit = async (clarificationAnswer: string) => {
    if (!selectedEmotion || !situation.trim() || !clarificationAnswer.trim()) return;

    setIsClarifying(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/safetalk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emotion: selectedEmotion,
          situation: situation.trim(),
          clarificationAnswer: clarificationAnswer.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Không thể gửi câu trả lời, vui lòng thử lại sau.');
      }

      const data: SafeTalkResponse = await res.json();
      setResponse(data);

      // Smooth scroll to updated suggestions
      setTimeout(() => {
        responseSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        'Đã có chút gián đoạn khi gửi câu trả lời. Bạn hãy thử lại sau vài giây nhé!'
      );
    } finally {
      setIsClarifying(false);
    }
  };

  const handleReset = () => {
    setResponse(null);
    setSituation('');
    setSelectedEmotion(null);
    setErrorMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      {/* Gentle Floating Celestial Planets & Cosmic Nebula Background */}
      <CosmicBackground />

      {/* Header Bar */}
      <Header />

      {/* Horizontal Wide Workspace Canvas */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-1">
        {/* Error Alert if any */}
        {errorMessage && (
          <div
            id="error-alert"
            className="mb-6 p-4 rounded-2xl bg-rose-950/70 border border-rose-500/50 text-rose-200 text-sm flex items-center gap-2.5 shadow-lg shadow-rose-950/60 max-w-2xl mx-auto"
          >
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 2-Column Wide Layout to stretch content horizontally */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column (Input Station) */}
          <section 
            id="input-station-panel"
            className="lg:col-span-6 bg-slate-900/80 rounded-3xl border border-indigo-500/25 p-5 sm:p-7 shadow-xl shadow-indigo-950/50 backdrop-blur-md space-y-5"
          >
            {/* 1. Chọn cảm xúc */}
            <EmotionSelector
              selectedEmotion={selectedEmotion}
              onSelectEmotion={handleSelectEmotion}
              disabled={isLoading}
            />

            {/* 2. Nhập tình huống */}
            <SituationInput
              situation={situation}
              onSituationChange={setSituation}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              selectedEmotion={selectedEmotion}
              onSelectExample={handleSelectExample}
            />
          </section>

          {/* Right Column (AI Response or Cosmic Companion Guide) */}
          <section 
            id="response-companion-panel"
            ref={responseSectionRef}
            className="lg:col-span-6"
          >
            {response ? (
              <AiResponseView 
                response={response} 
                onReset={handleReset}
                onSubmitClarification={handleClarificationSubmit}
                isClarifying={isClarifying}
              />
            ) : (
              <CosmicCompanionGuide 
                selectedEmotion={selectedEmotion}
                isLoading={isLoading}
              />
            )}
          </section>
        </div>
      </main>

      {/* Safety & Non-Medical Privacy Footer */}
      <SafetyFooter />
    </div>
  );
}
