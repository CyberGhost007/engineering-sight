import { useState, useEffect, useCallback, useRef } from 'react';

export interface GraphStep {
    visited: number[];
    current: number | null;
    queue: number[]; // or stack
    description?: string;
    distances?: Record<number, number>;
    mstEdges?: Edge[];
}

export interface Node {
    id: number;
    x: number;
    y: number;
}

export interface Edge {
    source: number;
    target: number;
}

interface UseGraphProps {
    algorithm: (nodes: Node[], edges: Edge[], startNode: number) => GraphStep[];
    speed?: number;
}

export const useGraph = ({ algorithm, speed = 1000 }: UseGraphProps) => {
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [steps, setSteps] = useState<GraphStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Visualization state
    const [visited, setVisited] = useState<number[]>([]);
    const [current, setCurrent] = useState<number | null>(null);
    const [queue, setQueue] = useState<number[]>([]);
    const [distances, setDistances] = useState<Record<number, number>>({});
    const [mstEdges, setMstEdges] = useState<Edge[]>([]);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const generateRandomGraph = useCallback(() => {
        // Create a simple connected graph
        const newNodes: Node[] = [
            { id: 0, x: 400, y: 100 },
            { id: 1, x: 250, y: 250 },
            { id: 2, x: 550, y: 250 },
            { id: 3, x: 150, y: 400 },
            { id: 4, x: 350, y: 400 },
            { id: 5, x: 450, y: 400 },
            { id: 6, x: 650, y: 400 },
        ];

        const newEdges: Edge[] = [
            { source: 0, target: 1 },
            { source: 0, target: 2 },
            { source: 1, target: 3 },
            { source: 1, target: 4 },
            { source: 2, target: 5 },
            { source: 2, target: 6 },
            { source: 4, target: 5 }, // Cross connection
        ];

        setNodes(newNodes);
        setEdges(newEdges);
        setSteps([]);
        setCurrentStep(0);
        setVisited([]);
        setCurrent(null);
        setQueue([]);
        setIsPlaying(false);
    }, []);

    // Initialize
    useEffect(() => {
        generateRandomGraph();
    }, [generateRandomGraph]);

    // Generate steps
    useEffect(() => {
        if (nodes.length > 0) {
            const generatedSteps = algorithm(nodes, edges, 0); // Start at node 0
            setSteps(generatedSteps);
        }
    }, [nodes, edges, algorithm]);

    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    // Playback
    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                if (!isMounted.current) return;

                setCurrentStep((prev) => {
                    if (prev < steps.length - 1) {
                        return prev + 1;
                    } else {
                        // Only update state if mounted
                        if (isMounted.current) setIsPlaying(false);
                        return prev;
                    }
                });
            }, 1000 - (speed * 9));
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, steps.length, speed]);

    // Update state
    useEffect(() => {
        if (steps.length > 0 && currentStep < steps.length) {
            const step = steps[currentStep];
            setVisited(step.visited);
            setCurrent(step.current);
            setQueue(step.queue);
            if (step.distances) setDistances(step.distances);
            if (step.mstEdges) setMstEdges(step.mstEdges);
        }
    }, [currentStep, steps]);

    const reset = () => {
        setIsPlaying(false);
        setCurrentStep(0);
        setVisited([]);
        setCurrent(null);
        setQueue([]);
        setDistances({});
        setMstEdges([]);
    };

    const stepForward = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    return {
        nodes,
        edges,
        visited,
        current,
        queue,
        distances,
        mstEdges,
        isPlaying,
        play: () => setIsPlaying(true),
        pause: () => setIsPlaying(false),
        reset,
        stepForward,
        generateNewGraph: generateRandomGraph,
        isFinished: visited.length === nodes.length // Approximate check
    };
};
