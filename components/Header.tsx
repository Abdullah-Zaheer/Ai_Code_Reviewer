
import React from 'react';
import { CodeIcon } from './icons/CodeIcon';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center gap-3 p-4 bg-slate-900/50 border-b border-slate-700/50 sticky top-0 z-10 backdrop-blur-sm">
      <CodeIcon className="h-8 w-8 text-indigo-400" />
      <h1 className="text-xl md:text-2xl font-bold text-slate-100 tracking-tight">
        AZ Code Reviewer
      </h1>
    </header>
  );
};
