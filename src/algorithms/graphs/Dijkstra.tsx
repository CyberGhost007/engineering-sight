import React, { useState } from 'react';
import { useGraph } from '../../hooks/useGraph';
import type { Node, Edge, GraphStep } from '../../hooks/useGraph';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { GraphCanvas } from '../../components/GraphCanvas';

const dijkstraAlgorithm = (nodes: Node[], edges: Edge[], startNode: number): GraphStep[] => {
    const steps: GraphStep[] = [];
    const visited = new Set<number>();
    const distances: { [key: number]: number } = {};
    const prev: { [key: number]: number | null } = {};
    const unvisited = new Set<number>();

    // Initialize
    nodes.forEach(node => {
        distances[node.id] = Infinity;
        prev[node.id] = null;
        unvisited.add(node.id);
    });
    distances[startNode] = 0;

    steps.push({
        visited: [],
        current: null,
        queue: [],
        description: "Initialize distances to Infinity, start node to 0"
    });

    while (unvisited.size > 0) {
        // Find unvisited node with smallest distance
        let current = -1;
        let minDist = Infinity;

        unvisited.forEach(nodeId => {
            if (distances[nodeId] < minDist) {
                minDist = distances[nodeId];
                current = nodeId;
            }
        });

        if (current === -1 || distances[current] === Infinity) break; // Remaining nodes unreachable

        unvisited.delete(current);
        visited.add(current);

        steps.push({
            visited: Array.from(visited),
            current: current,
            queue: [],
            description: `Visiting node ${current} (Distance: ${distances[current]})`
        });

        // Check neighbors
        const neighbors = edges
            .filter(e => e.source === current || e.target === current)
            .map(e => e.source === current ? e.target : e.source);

        for (const neighbor of neighbors) {
            if (unvisited.has(neighbor)) {
                const alt = distances[current] + 1; // Assuming weight 1 for all edges for simplicity
                if (alt < distances[neighbor]) {
                    distances[neighbor] = alt;
                    prev[neighbor] = current;

                    steps.push({
                        visited: Array.from(visited),
                        current: current,
                        queue: [neighbor], // Highlight neighbor being updated
                        description: `Updating distance for node ${neighbor} to ${alt}`
                    });
                }
            }
        }
    }

    steps.push({
        visited: Array.from(visited),
        current: null,
        queue: [],
        description: "Finished"
    });

    return steps;
};

export const Dijkstra: React.FC = () => {
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
        distances
    } = useGraph({
        algorithm: dijkstraAlgorithm,
        speed
    });

    const explanation = `
    Dijkstra's Algorithm finds the shortest path from a starting point to every other point in a graph. 
    It's like a GPS finding the fastest route. 
    It always chooses the closest unvisited node to explore next, updating the distances to its neighbors if it finds a shorter path.
  `;

    const howItWorks = [
        "Set distance to start node as 0 and all others as Infinity.",
        "Pick the unvisited node with the smallest distance.",
        "Visit its neighbors.",
        "If the path through the current node is shorter than the known path to a neighbor, update the neighbor's distance.",
        "Mark the current node as visited.",
        "Repeat until all nodes are visited."
    ];

    const code = `function dijkstra(graph, start) {
  let distances = {};
  let visited = new Set();
  // ... init distances ...

  while (unvisited.size > 0) {
    let u = getNodeWithMinDist(unvisited, distances);
    visited.add(u);
    
    for (let v of graph[u]) {
      let alt = distances[u] + weight(u, v);
      if (alt < distances[v]) {
        distances[v] = alt;
      }
    }
  }
}`;

    const realWorldUses = [
        "Google Maps: Finding the shortest route.",
        "Computer Networks: Routing data packets.",
        "Social Networks: Finding connection chains."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Dijkstra's Algorithm</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Finds the shortest paths between nodes in a graph.
                </p>
            </div>

            <div className="space-y-8">
                <div className="h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <VisualizerContainer
                        title="Dijkstra's Algorithm Visualization"
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
                            distances={distances}
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
