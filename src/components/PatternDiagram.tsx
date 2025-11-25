import React from 'react';
import { Database, Server, Smartphone, Globe, User, Box } from 'lucide-react';
import type { DiagramNode, DiagramEdge } from '../data/designPatternsData';

import { twMerge } from 'tailwind-merge';

interface PatternDiagramProps {
    nodes: DiagramNode[];
    edges: DiagramEdge[];
    className?: string;
}

const getNodeIcon = (type: DiagramNode['type']) => {
    switch (type) {
        case 'database': return Database;
        case 'server': return Server;
        case 'mobile': return Smartphone;
        case 'web': return Globe;
        case 'user': return User;
        case 'component':
        default: return Box;
    }
};

const getNodeColor = (type: DiagramNode['type']) => {
    switch (type) {
        case 'database': return 'bg-amber-50 border-amber-200 text-amber-600';
        case 'server': return 'bg-slate-100 border-slate-200 text-slate-600';
        case 'mobile': return 'bg-blue-50 border-blue-200 text-blue-600';
        case 'web': return 'bg-sky-50 border-sky-200 text-sky-600';
        case 'user': return 'bg-rose-50 border-rose-200 text-rose-600';
        default: return 'bg-indigo-50 border-indigo-200 text-indigo-600';
    }
};

export const PatternDiagram: React.FC<PatternDiagramProps> = ({ nodes, edges, className }) => {
    return (
        <div className={twMerge("relative w-full h-64 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden", className)}>
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="28" // Adjusted to stop before the node
                        refY="3.5"
                        orient="auto"
                    >
                        <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                    </marker>
                </defs>
                {edges.map((edge, idx) => {
                    const source = nodes.find(n => n.id === edge.source);
                    const target = nodes.find(n => n.id === edge.target);
                    if (!source || !target) return null;

                    return (
                        <g key={idx}>
                            <line
                                x1={source.x + 40} // Center of 80px width
                                y1={source.y + 20} // Center of 40px height
                                x2={target.x + 40}
                                y2={target.y + 20}
                                stroke="#94a3b8"
                                strokeWidth="2"
                                markerEnd="url(#arrowhead)"
                            />
                            {edge.label && (
                                <text
                                    x={(source.x + target.x + 80) / 2}
                                    y={(source.y + target.y + 40) / 2 - 5}
                                    textAnchor="middle"
                                    className="text-[10px] fill-slate-500 font-medium bg-white"
                                >
                                    {edge.label}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>

            {nodes.map((node) => {
                const Icon = getNodeIcon(node.type);
                const colorClass = getNodeColor(node.type);

                return (
                    <div
                        key={node.id}
                        className={`absolute flex flex-col items-center justify-center w-20 h-14 rounded-lg border shadow-sm transition-transform hover:scale-105 ${colorClass}`}
                        style={{ left: node.x, top: node.y }}
                    >
                        <Icon size={20} className="mb-1" />
                        <span className="text-[10px] font-bold leading-none text-center px-1">{node.label}</span>
                    </div>
                );
            })}
        </div>
    );
};
