import React from 'react';
import { ChevronRight, SortAsc, Search, Network, GitGraph, Layers, Crown, Calculator } from 'lucide-react';

interface SidebarProps {
    activeCategory: string;
    activeAlgorithm: string;
    onSelect: (category: string, algorithm: string) => void;
}

const categories = [
    {
        id: 'sorting',
        name: 'Sorting',
        icon: SortAsc,
        algorithms: ['Bubble Sort', 'Quick Sort', 'Merge Sort', 'Insertion Sort', 'Selection Sort', 'Heap Sort', 'Shell Sort', 'Cocktail Shaker Sort']
    },
    {
        id: 'searching',
        name: 'Searching',
        icon: Search,
        algorithms: ['Linear Search', 'Binary Search', 'Jump Search', 'Interpolation Search']
    },
    {
        id: 'graphs',
        name: 'Graph Algorithms',
        icon: Network,
        algorithms: ['Breadth-First Search', 'Depth-First Search', "Dijkstra's Algorithm", "Prim's Algorithm"]
    },
    {
        id: 'trees',
        name: 'Tree Algorithms',
        icon: GitGraph,
        algorithms: ['BST Operations', 'Tree Traversals']
    },
    {
        id: 'datastructures',
        name: 'Data Structures',
        icon: Layers,
        algorithms: ['Stack', 'Queue']
    },
    {
        id: 'backtracking',
        name: 'Backtracking',
        icon: Crown,
        algorithms: ['N-Queens Problem']
    },
    {
        id: 'dp',
        name: 'Dynamic Programming',
        icon: Calculator,
        algorithms: ['0/1 Knapsack']
    }
];

export const Sidebar: React.FC<SidebarProps> = ({ activeCategory, activeAlgorithm, onSelect }) => {
    return (
        <aside className="w-64 h-[calc(100vh-4rem)] fixed top-16 left-0 border-r border-slate-200 bg-white overflow-y-auto">
            <div className="p-4 space-y-6">
                {categories.map((category) => (
                    <div key={category.id}>
                        <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm uppercase tracking-wider mb-3 px-2">
                            <category.icon size={16} />
                            <span>{category.name}</span>
                        </div>
                        <ul className="space-y-1">
                            {category.algorithms.map((algo) => (
                                <li key={algo}>
                                    <button
                                        onClick={() => onSelect(category.id, algo)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group ${activeCategory === category.id && activeAlgorithm === algo
                                            ? 'bg-indigo-50 text-indigo-600 font-medium'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        {algo}
                                        {activeCategory === category.id && activeAlgorithm === algo && (
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
