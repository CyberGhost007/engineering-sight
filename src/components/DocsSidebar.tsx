import React from 'react';
import type { DocCategory, DocItem } from '../data/docsData';
import { ChevronRight, BookOpen, Hash, Network, Search, SortAsc } from 'lucide-react';

interface DocsSidebarProps {
    categories: DocCategory[];
    activeItem: DocItem | null;
    onSelect: (item: DocItem) => void;
}

const getIcon = (id: string) => {
    switch (id) {
        case 'sorting': return SortAsc;
        case 'searching': return Search;
        case 'graphs': return Network;
        default: return Hash;
    }
};

export const DocsSidebar: React.FC<DocsSidebarProps> = ({ categories, activeItem, onSelect }) => {
    return (
        <div className="w-64 bg-white border-r border-slate-200 h-full overflow-y-auto flex-shrink-0">
            <div className="p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <BookOpen className="text-indigo-600" />
                    Docs & Use Cases
                </h2>
                <p className="text-xs text-slate-500 mt-1">Learn when and where to use algorithms.</p>
            </div>
            <div className="p-4 space-y-6">
                {categories.map((category) => {
                    const Icon = getIcon(category.id);
                    return (
                        <div key={category.id}>
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Icon size={14} />
                                {category.title}
                            </h3>
                            <div className="space-y-1">
                                {category.items.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => onSelect(item)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group ${activeItem?.id === item.id
                                            ? 'bg-indigo-50 text-indigo-700'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        {item.title}
                                        {activeItem?.id === item.id && (
                                            <ChevronRight size={14} className="text-indigo-500" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
