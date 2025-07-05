
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { ReviewOutput } from './components/ReviewOutput';
import { reviewCode } from './services/geminiService';

const App: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [review, setReview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError('Please enter some code to review.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setReview('');
    try {
      const result = await reviewCode(code);
      setReview(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 font-sans">
      <Header />
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-6 lg:p-8">
        <CodeInput
          code={code}
          setCode={setCode}
          onReview={handleReview}
          isLoading={isLoading}
        />
        <ReviewOutput
          review={review}
          isLoading={isLoading}
          error={error}
        />
      </main>
      <footer className="text-center p-4 text-xs text-slate-500">
        <p>Created by Abdullah Zaheer. For educational purposes only.</p>
      </footer>
    </div>
  );
};

export default App;
