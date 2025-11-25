import React from 'react';
import { motion } from 'framer-motion';

interface Node {
    id: number;
    x: number;
    y: number;
}

interface Edge {
    source: number;
    target: number;
}

interface GraphCanvasProps {
    nodes: Node[];
    edges: Edge[];
    visited: number[];
    current: number | null;
    queue?: number[]; // For BFS
    stack?: number[]; // For DFS
    distances?: Record<number, number>; // For Dijkstra
    mstEdges?: Edge[]; // For Prim
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({ nodes, edges, visited, current, queue, stack, distances, mstEdges }) => {
    return (
        <div className="w-full h-full flex items-center justify-center bg-slate-50 relative">
            <svg className="w-full h-full" viewBox="0 0 800 600">
                {/* Edges */}
                {edges.map((edge, index) => {
                    const start = nodes.find(n => n.id === edge.source);
                    const end = nodes.find(n => n.id === edge.target);
                    if (!start || !end) return null;

                    const isMstEdge = mstEdges?.some(
                        e => (e.source === edge.source && e.target === edge.target) ||
                            (e.source === edge.target && e.target === edge.source)
                    );

                    return (
                        <line
                            key={`edge-${index}`}
                            x1={start.x}
                            y1={start.y}
                            x2={end.x}
                            y2={end.y}
                            stroke={isMstEdge ? "#f59e0b" : "#cbd5e1"}
                            strokeWidth={isMstEdge ? "4" : "2"}
                        />
                    );
                })}

                {/* Nodes */}
                {nodes.map((node) => {
                    let fillColor = '#e2e8f0'; // default slate-200
                    let strokeColor = '#94a3b8'; // slate-400

                    if (current === node.id) {
                        fillColor = '#f59e0b'; // amber-500
                        strokeColor = '#d97706'; // amber-600
                    } else if (visited.includes(node.id)) {
                        fillColor = '#22c55e'; // green-500
                        strokeColor = '#16a34a'; // green-600
                    } else if (queue?.includes(node.id) || stack?.includes(node.id)) {
                        fillColor = '#3b82f6'; // blue-500
                        strokeColor = '#2563eb'; // blue-600
                    }

                    return (
                        <g key={node.id}>
                            <motion.circle
                                cx={node.x}
                                cy={node.y}
                                r={25}
                                fill={fillColor}
                                stroke={strokeColor}
                                strokeWidth="3"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, fill: fillColor, stroke: strokeColor }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            />
                            <text
                                x={node.x}
                                y={node.y}
                                dy=".3em"
                                textAnchor="middle"
                                className="text-sm font-bold fill-slate-700 pointer-events-none"
                            >
                                {node.id}
                            </text>
                            {distances && distances[node.id] !== undefined && distances[node.id] !== Infinity && (
                                <text
                                    x={node.x}
                                    y={node.y - 35}
                                    textAnchor="middle"
                                    className="text-xs font-bold fill-slate-500"
                                >
                                    d: {distances[node.id]}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Legend/Status Overlay */}
            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur p-4 rounded-xl border border-slate-200 shadow-sm text-sm">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                        <span>Current Node</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Visited</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>In Queue/Stack</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-200 border border-slate-400"></div>
                        <span>Unvisited</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
