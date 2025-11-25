import React, { useState } from 'react';
import { DesignPatternsSidebar } from './DesignPatternsSidebar';
import { designPatternsData } from '../data/designPatternsData';
import { Layers, CheckCircle, XCircle, Maximize2, X } from 'lucide-react';
import { PatternDiagram } from './PatternDiagram';

export const DesignPatternsLayout: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('mobile');
    const [activePattern, setActivePattern] = useState('mvvm');
    const [isFullScreen, setIsFullScreen] = useState(false);

    const currentCategory = designPatternsData.find(c => c.id === activeCategory);
    const currentPattern = currentCategory?.patterns.find(p => p.id === activePattern);

    return (
        <div className="flex h-full">
            <DesignPatternsSidebar
                activeCategory={activeCategory}
                activePattern={activePattern}
                onSelect={(cat, pat) => {
                    setActiveCategory(cat);
                    setActivePattern(pat);
                }}
            />
            <main className="flex-1 overflow-y-auto bg-slate-50 p-8 ml-64">
                <div className="max-w-4xl mx-auto space-y-8">
                    {currentPattern ? (
                        <>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-indigo-100 rounded-xl">
                                        <Layers className="text-indigo-600" size={32} />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                                            {currentPattern.title}
                                        </h1>
                                        <p className="text-lg text-slate-600">
                                            {currentPattern.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <CheckCircle className="text-green-500" size={20} />
                                        Pros
                                    </h3>
                                    <ul className="space-y-2">
                                        {currentPattern.pros.map((pro, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-slate-600 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 shrink-0" />
                                                {pro}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <XCircle className="text-red-500" size={20} />
                                        Cons
                                    </h3>
                                    <ul className="space-y-2">
                                        {currentPattern.cons.map((con, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-slate-600 text-sm">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                                                {con}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Use Case</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    {currentPattern.useCase}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                        <Layers className="text-indigo-600" size={20} />
                                        File Structure
                                    </h3>
                                    <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto shadow-lg">
                                        <pre className="text-sm font-mono text-slate-300 leading-relaxed">
                                            {currentPattern.folderStructure}
                                        </pre>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                            <Layers className="text-indigo-600" size={20} />
                                            Visual Concept
                                        </h3>
                                        <button
                                            onClick={() => setIsFullScreen(true)}
                                            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                            title="View Full Screen"
                                        >
                                            <Maximize2 size={20} />
                                        </button>
                                    </div>
                                    <PatternDiagram
                                        nodes={currentPattern.diagramData.nodes}
                                        edges={currentPattern.diagramData.edges}
                                    />
                                    <p className="text-sm text-slate-500 text-center italic mt-2">
                                        {currentPattern.visualDescription}
                                    </p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-slate-500">Select a design pattern to view details.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Full Screen Modal */}
            {isFullScreen && currentPattern && (
                <div className="fixed inset-0 z-50 bg-white flex flex-col">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white">
                        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                            <Layers className="text-indigo-600" size={28} />
                            {currentPattern.title} - Visual Concept
                        </h2>
                        <button
                            onClick={() => setIsFullScreen(false)}
                            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        >
                            <X size={28} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-auto p-8 bg-slate-50 flex flex-col items-center justify-center">
                        <div className="w-full h-full max-w-7xl bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col">
                            <div className="flex-1 flex items-center justify-center min-h-0">
                                <PatternDiagram
                                    nodes={currentPattern.diagramData.nodes}
                                    edges={currentPattern.diagramData.edges}
                                    className="h-full"
                                />
                            </div>
                            <p className="text-slate-500 text-center italic mt-6 text-lg">
                                {currentPattern.visualDescription}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
