import { useState, useEffect, useCallback, useRef } from 'react';
import type { Node, Edge } from './useGraph';

export interface TreeStep {
    visited: number[];
    current: number | null;
    description?: string;
    nodes?: Node[]; // Optional if nodes move/change
    edges?: Edge[];
}

interface UseTreeProps {
    algorithm: (root: TreeNode | null, target?: number) => TreeStep[];
    speed?: number;
}

export class TreeNode {
    id: number;
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;
    x: number;
    y: number;

    constructor(value: number, id: number) {
        this.value = value;
        this.id = id;
        this.left = null;
        this.right = null;
        this.x = 0;
        this.y = 0;
    }
}

export const useTree = ({ algorithm, speed = 1000 }: UseTreeProps) => {
    const [root, setRoot] = useState<TreeNode | null>(null);
    const [nodes, setNodes] = useState<Node[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [steps, setSteps] = useState<TreeStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Visualization state
    const [visited, setVisited] = useState<number[]>([]);
    const [current, setCurrent] = useState<number | null>(null);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Helper to layout tree
    const layoutTree = useCallback((node: TreeNode | null, x: number, y: number, offset: number, depth: number) => {
        if (!node) return;
        node.x = x;
        node.y = y;
        layoutTree(node.left, x - offset, y + 60, offset / 1.8, depth + 1);
        layoutTree(node.right, x + offset, y + 60, offset / 1.8, depth + 1);
    }, []);

    // Helper to convert tree to nodes/edges for GraphCanvas
    const treeToGraph = useCallback((node: TreeNode | null, nodeList: Node[], edgeList: Edge[]) => {
        if (!node) return;
        nodeList.push({ id: node.id, x: node.x, y: node.y });
        if (node.left) {
            edgeList.push({ source: node.id, target: node.left.id });
            treeToGraph(node.left, nodeList, edgeList);
        }
        if (node.right) {
            edgeList.push({ source: node.id, target: node.right.id });
            treeToGraph(node.right, nodeList, edgeList);
        }
    }, []);

    const generateRandomBST = useCallback(() => {
        const values = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
        const newRoot = new TreeNode(values[0], values[0]); // Use value as ID for simplicity if unique, or generate ID
        // Actually, values might not be unique. Let's use index as ID? 
        // But BST needs value comparison.
        // Let's use value as ID and ensure uniqueness or handle duplicates.
        // For simplicity, let's just insert and if duplicate ignore.

        const createNode = (val: number) => new TreeNode(val, val); // Using val as ID for visualization matching

        const insert = (root: TreeNode, val: number) => {
            if (val < root.value) {
                if (root.left) insert(root.left, val);
                else root.left = createNode(val);
            } else if (val > root.value) {
                if (root.right) insert(root.right, val);
                else root.right = createNode(val);
            }
        };

        for (let i = 1; i < values.length; i++) {
            insert(newRoot, values[i]);
        }

        // Layout
        layoutTree(newRoot, 400, 50, 200, 0);

        // Convert to graph
        const nodeList: Node[] = [];
        const edgeList: Edge[] = [];
        treeToGraph(newRoot, nodeList, edgeList);

        setRoot(newRoot);
        setNodes(nodeList);
        setEdges(edgeList);
        setSteps([]);
        setCurrentStep(0);
        setVisited([]);
        setCurrent(null);
        setIsPlaying(false);

        return newRoot;
    }, [layoutTree, treeToGraph]);

    // Initialize
    useEffect(() => {
        generateRandomBST();
    }, [generateRandomBST]);

    // Generate steps
    useEffect(() => {
        if (root) {
            const generatedSteps = algorithm(root);
            setSteps(generatedSteps);
        }
    }, [root, algorithm]);

    // Playback
    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                setCurrentStep((prev) => {
                    if (prev < steps.length - 1) {
                        return prev + 1;
                    } else {
                        setIsPlaying(false);
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
        }
    }, [currentStep, steps]);

    const reset = () => {
        setIsPlaying(false);
        setCurrentStep(0);
        setVisited([]);
        setCurrent(null);
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
        isPlaying,
        play: () => setIsPlaying(true),
        pause: () => setIsPlaying(false),
        reset,
        stepForward,
        generateNewTree: generateRandomBST,
        isFinished: currentStep === steps.length - 1 && steps.length > 0
    };
};
