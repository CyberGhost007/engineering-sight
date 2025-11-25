import React, { useState } from 'react';
import { BookOpen, Code, Lightbulb, Zap } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface ExplanationPanelProps {
    explanation: string;
    howItWorks: string[];
    code: string;
    realWorldUses: string[];
}

type Tab = 'explanation' | 'how-it-works' | 'code' | 'real-world';

export const ExplanationPanel: React.FC<ExplanationPanelProps> = ({
    explanation,
    howItWorks,
    code,
    realWorldUses
}) => {
    const [activeTab, setActiveTab] = useState<Tab>('explanation');

    const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
        { id: 'explanation', label: 'Explanation', icon: Lightbulb },
        { id: 'how-it-works', label: 'How It Works', icon: Zap },
        { id: 'code', label: 'Code', icon: Code },
        { id: 'real-world', label: 'Real World', icon: BookOpen },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
            <div className="flex border-b border-slate-100">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-3 px-2 text-sm font-medium flex items-center justify-center gap-2 transition-colors relative ${activeTab === tab.id
                                ? 'text-indigo-600 bg-indigo-50/50'
                                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                            }`}
                    >
                        <tab.icon size={16} />
                        <span className="hidden sm:inline">{tab.label}</span>
                        {activeTab === tab.id && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                        )}
                    </button>
                ))}
            </div>

            <div className="p-6 overflow-y-auto flex-1 max-h-[600px]">
                {activeTab === 'explanation' && (
                    <div className="prose prose-slate prose-sm max-w-none">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Lightbulb className="text-amber-500" />
                            Simple Explanation
                        </h3>
                        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-slate-700 leading-relaxed">
                            {explanation}
                        </div>
                    </div>
                )}

                {activeTab === 'how-it-works' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Zap className="text-indigo-500" />
                            Step-by-Step
                        </h3>
                        <ol className="space-y-4">
                            {howItWorks.map((step, index) => (
                                <li key={index} className="flex gap-4">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <p className="text-slate-600 pt-1">{step}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}

                {activeTab === 'code' && (
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Code className="text-emerald-500" />
                            Implementation
                        </h3>
                        <CodeBlock code={code} language="typescript" />
                    </div>
                )}

                {activeTab === 'real-world' && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <BookOpen className="text-blue-500" />
                            Real World Uses
                        </h3>
                        <ul className="grid gap-3">
                            {realWorldUses.map((use, index) => (
                                <li key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex gap-3 items-start">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                                    <span className="text-slate-700">{use}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
