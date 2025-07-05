
import React from 'react';
import { Loader } from './Loader';

interface ReviewOutputProps {
  review: string;
  isLoading: boolean;
  error: string | null;
}

const WelcomeMessage: React.FC = () => (
    <div className="text-center p-8">
        <h3 className="text-xl font-semibold text-slate-300 mb-2">Welcome to the AI Code Reviewer</h3>
        <p className="text-slate-400">
            Paste your code in the left panel and click "Review Code" to get instant, AI-powered feedback on quality, performance, and security.
        </p>
    </div>
);

const FormattedReview: React.FC<{ content: string }> = ({ content }) => {
    // Basic markdown to HTML-like element conversion for presentation
    const lines = content.split('\n');
    const elements = lines.map((line, index) => {
        if (line.startsWith('### ')) {
            return <h3 key={index} className="text-lg font-semibold text-indigo-300 mt-6 mb-2">{line.substring(4)}</h3>;
        }
        if (line.startsWith('## ')) {
            return <h2 key={index} className="text-xl font-bold text-indigo-300 mt-8 mb-3 border-b border-slate-600 pb-2">{line.substring(3)}</h2>;
        }
        if (line.startsWith('**') && line.endsWith('**')) {
             return <p key={index} className="font-bold my-2">{line.substring(2, line.length - 2)}</p>;
        }
        if (line.match(/^\d+\.\s/)) {
            return <p key={index} className="ml-4 my-1 text-slate-300">{line}</p>;
        }
        if (line.startsWith('```')) {
            // This is a simple toggle, assumes code blocks are not nested
            return <div key={index} className="my-2 p-3 bg-slate-900/70 rounded-md font-mono text-sm text-cyan-300 overflow-x-auto">{/* Placeholder for code content handled below */}</div>;
        }
        if (line.trim() === '') {
            return <br key={index} />;
        }
        return <p key={index} className="my-1 text-slate-300 leading-relaxed">{line}</p>;
    });
    
    // Naive handling of code blocks
    let inCodeBlock = false;
    let codeBlockContent = '';
    const finalElements: React.ReactNode[] = [];

    content.split('\n').forEach((line, index) => {
        if (line.trim().startsWith('```')) {
            if (inCodeBlock) {
                finalElements.push(
                    <pre key={`code-${index}`} className="my-2 p-4 bg-slate-900/70 rounded-md font-mono text-sm text-cyan-300 overflow-x-auto whitespace-pre-wrap">
                        <code>{codeBlockContent}</code>
                    </pre>
                );
                codeBlockContent = '';
            }
            inCodeBlock = !inCodeBlock;
        } else if (inCodeBlock) {
            codeBlockContent += line + '\n';
        } else {
            // Re-creating simple elements for non-code block content
            if (line.startsWith('### ')) {
                finalElements.push(<h3 key={index} className="text-lg font-semibold text-indigo-300 mt-6 mb-2">{line.substring(4)}</h3>);
            } else if (line.startsWith('## ')) {
                finalElements.push(<h2 key={index} className="text-xl font-bold text-indigo-300 mt-8 mb-3 border-b border-slate-600 pb-2">{line.substring(3)}</h2>);
            } else if (line.startsWith('**') && line.endsWith('**')) {
                finalElements.push(<p key={index} className="font-bold text-slate-100 my-2">{line.substring(2, line.length - 2)}</p>);
            } else if (line.match(/^\d+\.\s/)) {
                 finalElements.push(<p key={index} className="my-1 text-slate-300 leading-relaxed">{line}</p>);
            }
            else {
                finalElements.push(<p key={index} className="my-1 text-slate-300 leading-relaxed">{line}</p>);
            }
        }
    });


    return <>{finalElements}</>;
};


export const ReviewOutput: React.FC<ReviewOutputProps> = ({ review, isLoading, error }) => {
  return (
    <div className="flex flex-col bg-slate-800 rounded-lg shadow-lg overflow-hidden h-[calc(100vh-150px)] md:h-auto">
      <div className="flex-shrink-0 p-3 bg-slate-900/50 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-slate-200">AI Review</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <Loader />
            <p className="mt-4 text-lg">Analyzing your code...</p>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-full">
            <div className="bg-red-900/30 border border-red-500 text-red-300 p-4 rounded-md text-center">
              <h3 className="font-bold">An Error Occurred</h3>
              <p className="mt-2 text-sm">{error}</p>
            </div>
          </div>
        )}
        {!isLoading && !error && !review && <WelcomeMessage />}
        {!isLoading && !error && review && (
           <div className="prose prose-invert max-w-none">
             <FormattedReview content={review} />
           </div>
        )}
      </div>
    </div>
  );
};
