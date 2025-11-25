import React, { useState } from 'react';
import { useGraph } from '../../hooks/useGraph';
import type { Node, Edge, GraphStep } from '../../hooks/useGraph';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { GraphCanvas } from '../../components/GraphCanvas';

const bfsAlgorithm = (_nodes: Node[], edges: Edge[], startNode: number): GraphStep[] => {
    const steps: GraphStep[] = [];
    const visited = new Set<number>();
    const queue: number[] = [startNode];

    // Initial state
    steps.push({
        visited: [],
        current: null,
        queue: [...queue],
        description: "Start BFS"
    });

    visited.add(startNode);

    while (queue.length > 0) {
        const current = queue.shift()!;

        // Visit current
        steps.push({
            visited: Array.from(visited),
            current: current,
            queue: [...queue],
            description: `Visiting node ${current}`
        });

        // Find neighbors
        const neighbors = edges
            .filter(e => e.source === current || e.target === current)
            .map(e => e.source === current ? e.target : e.source)
            .sort((a, b) => a - b); // Sort for deterministic order

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);

                // Add to queue visualization
                steps.push({
                    visited: Array.from(visited),
                    current: current,
                    queue: [...queue],
                    description: `Adding neighbor ${neighbor} to queue`
                });
            }
        }
    }

    // Final state
    steps.push({
        visited: Array.from(visited),
        current: null,
        queue: [],
        description: "Finished"
    });

    return steps;
};

export const BFS: React.FC = () => {
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
        isFinished
    } = useGraph({
        algorithm: bfsAlgorithm,
        speed
    });

    const explanation = `
    Breadth-First Search (BFS) is like throwing a pebble into a pond. 
    The ripples move out in all directions, visiting the closest spots first, then the ones a bit further out, and so on. 
    In a graph, it visits all the neighbors of a node before moving to the neighbors' neighbors.
  `;

    const howItWorks = [
        "Start at a chosen node (the root).",
        "Put it in a 'queue' (a line of people waiting).",
        "Take the first node out of the queue and visit it.",
        "Find all its unvisited neighbors and add them to the back of the queue.",
        "Repeat until the queue is empty."
    ];

    const code = `function bfs(graph, startNode) {
  let visited = new Set();
  let queue = [startNode];
  visited.add(startNode);

  while (queue.length > 0) {
    let currentNode = queue.shift();
    console.log("Visited " + currentNode);

    let neighbors = graph[currentNode];
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`;

    const realWorldUses = [
        "GPS Navigation: Finding the shortest path (fewest turns) on a map.",
        "Social Networks: Finding people within '2 degrees of separation'.",
        "Web Crawlers: Exploring links on a website layer by layer."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Breadth-First Search (BFS)</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Explores the graph layer by layer, visiting all neighbors before moving deeper.
                </p>
            </div>

            <div className="space-y-8">
                <div className="h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <VisualizerContainer
                        title="BFS Visualization"
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
