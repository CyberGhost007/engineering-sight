import React from 'react';

interface CodeBlockProps {
    code: string;
    language?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'typescript' }) => {
    return (
        <div className="relative group">
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-slate-400 font-mono uppercase">{language}</span>
            </div>
            <pre className="bg-slate-900 text-slate-50 p-4 rounded-xl text-sm overflow-x-auto font-mono leading-relaxed shadow-inner">
                <code>{code}</code>
            </pre>
        </div>
    );
};
