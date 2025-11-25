import React from 'react';
import type { DocItem } from '../data/docsData';
import { CheckCircle2, XCircle, Globe, Cpu, BookOpen } from 'lucide-react';

interface DocsContentProps {
    item: DocItem | null;
}

export const DocsContent: React.FC<DocsContentProps> = ({ item }) => {
    if (!item) {
        return (
            <div className="flex-1 flex items-center justify-center bg-slate-50 h-full">
                <div className="text-center text-slate-400">
                    <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Select an algorithm to view its use cases.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-slate-50 h-full overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{item.title}</h1>
                    <p className="text-lg text-slate-600 leading-relaxed">{item.description}</p>
                </div>

                {/* Best/Worst For */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                        <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                            <CheckCircle2 className="text-emerald-600" />
                            Best Used For
                        </h3>
                        <ul className="space-y-2">
                            {item.bestFor.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-emerald-900/80">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-100">
                        <h3 className="text-lg font-bold text-rose-800 mb-4 flex items-center gap-2">
                            <XCircle className="text-rose-600" />
                            Avoid When
                        </h3>
                        <ul className="space-y-2">
                            {item.worstFor.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-rose-900/80">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Real World Examples */}
                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Globe className="text-indigo-600" />
                        Real World Applications
                    </h2>
                    <div className="grid gap-4">
                        {item.realWorldExamples.map((example, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-bold text-slate-800 text-lg">{example.app}</h4>
                                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wide">
                                        {example.feature}
                                    </span>
                                </div>
                                <p className="text-slate-600">{example.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feature Mapping */}
                <div>
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Cpu className="text-amber-600" />
                        Feature Implementation Guide
                    </h2>
                    <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg">
                        <div className="p-6">
                            <div className="grid gap-6">
                                {item.featureMapping.map((map, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 border-b border-slate-800 last:border-0 pb-6 last:pb-0">
                                        <div className="md:w-1/3">
                                            <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">If you are building...</span>
                                            <div className="text-white font-bold text-xl mt-1">{map.feature}</div>
                                        </div>
                                        <div className="hidden md:block text-slate-600">→</div>
                                        <div className="md:w-2/3">
                                            <span className="text-slate-400 text-sm uppercase tracking-wider font-semibold">You should use...</span>
                                            <div className="text-amber-400 font-mono font-bold text-lg mt-1">{map.algo}</div>
                                            <p className="text-slate-300 text-sm mt-2">{map.reason}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
