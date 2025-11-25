import React, { useState } from 'react';
import { useGraph } from '../../hooks/useGraph';
import type { Node, Edge, GraphStep } from '../../hooks/useGraph';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { GraphCanvas } from '../../components/GraphCanvas';

const primAlgorithm = (nodes: Node[], edges: Edge[], startNode: number): GraphStep[] => {
    const steps: GraphStep[] = [];
    const visited = new Set<number>();
    const mstEdges: Edge[] = []; // Edges in MST

    visited.add(startNode);

    steps.push({
        visited: [startNode],
        current: startNode,
        queue: [],
        description: "Start with arbitrary node"
    });

    while (visited.size < nodes.length) {
        let minEdge: Edge | null = null;
        let minWeight = Infinity; // Assuming weights, but here we use unweighted/unit weight logic or random
        // For visualization on unweighted graph, we can just pick any connecting edge to unvisited.
        // But Prim's is for weighted. Let's simulate weights based on distance or just random.
        // For simplicity in this visualizer, let's assume edge length = weight.

        // Find smallest edge connecting visited to unvisited
        for (const edge of edges) {
            const u = edge.source;
            const v = edge.target;

            if ((visited.has(u) && !visited.has(v)) || (visited.has(v) && !visited.has(u))) {
                // Calculate distance as weight
                const nodeU = nodes.find(n => n.id === u)!;
                const nodeV = nodes.find(n => n.id === v)!;
                const dist = Math.sqrt(Math.pow(nodeU.x - nodeV.x, 2) + Math.pow(nodeU.y - nodeV.y, 2));

                if (dist < minWeight) {
                    minWeight = dist;
                    minEdge = edge;
                }
            }
        }

        if (minEdge) {
            const nextNode = visited.has(minEdge.source) ? minEdge.target : minEdge.source;
            visited.add(nextNode);
            mstEdges.push(minEdge);

            steps.push({
                visited: Array.from(visited),
                current: nextNode,
                queue: [], // Could use queue to highlight the edge being added
                description: `Added node ${nextNode} to MST via shortest edge`
            });
        } else {
            break; // Disconnected graph
        }
    }

    steps.push({
        visited: Array.from(visited),
        current: null,
        queue: [],
        description: "MST Completed"
    });

    return steps;
};

export const Prim: React.FC = () => {
    const [speed, setSpeed] = useState(50);
    const {
        nodes,
        edges,
        visited,
        current,
        queue,
        isPlaying,
        play,
        pause,
        reset,
        stepForward,
        generateNewGraph,
        isFinished,
        mstEdges
    } = useGraph({
        algorithm: primAlgorithm,
        speed
    });

    const explanation = `
    Prim's Algorithm finds the Minimum Spanning Tree (MST) of a graph. 
    It connects all the nodes together using the edges with the smallest total weight (cost), without forming any loops. 
    It's like connecting cities with roads using the least amount of asphalt.
  `;

    const howItWorks = [
        "Start with any node.",
        "Look at all edges connecting visited nodes to unvisited nodes.",
        "Pick the edge with the smallest weight.",
        "Add that edge and the new node to the tree.",
        "Repeat until all nodes are connected."
    ];

    const code = `function prim(graph) {
  let visited = new Set();
  visited.add(startNode);
  let mst = [];

  while (visited.size < graph.nodes.length) {
    let minEdge = findMinEdge(visited, graph.edges);
    mst.push(minEdge);
    visited.add(minEdge.target);
  }
  return mst;
}`;

    const realWorldUses = [
        "Network Design: Laying cables to connect cities with minimum cost.",
        "Circuit Design: Connecting components on a chip.",
        "Clustering: Grouping similar items together."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Prim's Algorithm</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Finds a Minimum Spanning Tree for a weighted undirected graph.
                </p>
            </div>

            <div className="space-y-8">
                <div className="h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <VisualizerContainer
                        title="Prim's Algorithm Visualization"
                        isPlaying={isPlaying}
                        onPlay={play}
                        onPause={pause}
                        onReset={() => {
                            reset();
                            generateNewGraph();
                        }}
                        onStepForward={stepForward}
                        speed={speed}
                        onSpeedChange={setSpeed}
                        isSorted={isFinished}
                    >
                        <GraphCanvas
                            nodes={nodes}
                            edges={edges}
                            visited={visited}
                            current={current}
                            queue={queue}
                            mstEdges={mstEdges}
                        />
                    </VisualizerContainer>
                </div>

                <ExplanationPanel
                    explanation={explanation}
                    howItWorks={howItWorks}
                    code={code}
                    realWorldUses={realWorldUses}
                />
            </div>
        </div>
    );
};
