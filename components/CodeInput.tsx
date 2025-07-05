
import React from 'react';

interface CodeInputProps {
  code: string;
  setCode: (code: string) => void;
  onReview: () => void;
  isLoading: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({ code, setCode, onReview, isLoading }) => {
  return (
    <div className="flex flex-col bg-slate-800 rounded-lg shadow-lg overflow-hidden h-[calc(100vh-150px)] md:h-auto">
      <div className="flex-shrink-0 p-3 bg-slate-900/50 flex justify-between items-center border-b border-slate-700">
        <h2 className="text-lg font-semibold text-slate-200">Your Code</h2>
        <button
          onClick={onReview}
          disabled={isLoading || !code.trim()}
          className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500"
        >
          {isLoading ? 'Reviewing...' : 'Review Code'}
        </button>
      </div>
      <div className="flex-grow h-full">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here..."
          disabled={isLoading}
          className="w-full h-full p-4 bg-transparent text-slate-300 font-mono text-sm resize-none focus:outline-none disabled:opacity-50"
          spellCheck="false"
        />
      </div>
    </div>
  );
};
