import React, { useState } from 'react';
import { useGraph } from '../../hooks/useGraph';
import type { Node, Edge, GraphStep } from '../../hooks/useGraph';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { GraphCanvas } from '../../components/GraphCanvas';

const dfsAlgorithm = (_nodes: Node[], edges: Edge[], startNode: number): GraphStep[] => {
    const steps: GraphStep[] = [];
    const visited = new Set<number>();
    const stack: number[] = [startNode];

    // Initial state
    steps.push({
        visited: [],
        current: null,
        queue: [...stack], // Using queue field for stack visualization
        description: "Start DFS"
    });

    while (stack.length > 0) {
        const current = stack.pop()!;

        if (!visited.has(current)) {
            visited.add(current);

            // Visit current
            steps.push({
                visited: Array.from(visited),
                current: current,
                queue: [...stack],
                description: `Visiting node ${current}`
            });

            // Find neighbors
            const neighbors = edges
                .filter(e => e.source === current || e.target === current)
                .map(e => e.source === current ? e.target : e.source)
                .sort((a, b) => b - a); // Sort reverse for stack to process in order

            for (const neighbor of neighbors) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);

                    // Add to stack visualization
                    steps.push({
                        visited: Array.from(visited),
                        current: current,
                        queue: [...stack],
                        description: `Adding neighbor ${neighbor} to stack`
                    });
                }
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

export const DFS: React.FC = () => {
    const [speed, setSpeed] = useState(50);
    const {
        nodes,
        edges,
        visited,
        current,
        queue, // This is actually the stack here
        isPlaying,
        play,
        pause,
        reset,
        stepForward,
        generateNewGraph,
        isFinished
    } = useGraph({
        algorithm: dfsAlgorithm,
        speed
    });

    const explanation = `
    Depth-First Search (DFS) is like exploring a maze. 
    You keep walking down a path as far as you can go. When you hit a dead end, you backtrack to the last intersection and try a different path. 
    You keep doing this until you've explored the whole maze.
  `;

    const howItWorks = [
        "Start at a chosen node.",
        "Pick one neighbor and follow it.",
        "From that neighbor, pick one of its neighbors and follow it.",
        "Keep going as deep as possible.",
        "If you get stuck (no unvisited neighbors), go back (backtrack) to the previous node and try a different path."
    ];

    const code = `function dfs(graph, startNode, visited = new Set()) {
  visited.add(startNode);
  console.log("Visited " + startNode);

  let neighbors = graph[startNode];
  for (let neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}`;

    const realWorldUses = [
        "Maze Solving: Finding a path from start to finish.",
        "Puzzle Solving: Finding a solution to Sudoku or a crossword.",
        "Cycle Detection: Checking if a graph has a loop."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Depth-First Search (DFS)</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Explores as far as possible along each branch before backtracking.
                </p>
            </div>

            <div className="space-y-8">
                <div className="h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <VisualizerContainer
                        title="DFS Visualization"
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
                            stack={queue}
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
