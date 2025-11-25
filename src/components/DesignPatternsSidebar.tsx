import React from 'react';
import { ChevronRight } from 'lucide-react';
import { designPatternsData } from '../data/designPatternsData';

interface DesignPatternsSidebarProps {
    activeCategory: string;
    activePattern: string;
    onSelect: (category: string, pattern: string) => void;
}

export const DesignPatternsSidebar: React.FC<DesignPatternsSidebarProps> = ({ activeCategory, activePattern, onSelect }) => {
    return (
        <aside className="w-64 h-[calc(100vh-4rem)] fixed top-16 left-0 border-r border-slate-200 bg-white overflow-y-auto">
            <div className="p-4 space-y-6">
                {designPatternsData.map((category) => (
                    <div key={category.id}>
                        <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm uppercase tracking-wider mb-3 px-2">
                            <category.icon size={16} />
                            <span>{category.title}</span>
                        </div>
                        <ul className="space-y-1">
                            {category.patterns.map((pattern) => (
                                <li key={pattern.id}>
                                    <button
                                        onClick={() => onSelect(category.id, pattern.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group ${activeCategory === category.id && activePattern === pattern.id
                                            ? 'bg-indigo-50 text-indigo-600 font-medium'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        {pattern.title}
                                        {activeCategory === category.id && activePattern === pattern.id && (
                                            <ChevronRight size={14} className="opacity-100" />
                                        )}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    );
};
