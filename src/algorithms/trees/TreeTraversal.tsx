import React, { useState } from 'react';
import { useTree, TreeNode } from '../../hooks/useTree';
import type { TreeStep } from '../../hooks/useTree';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { GraphCanvas } from '../../components/GraphCanvas';

type TraversalType = 'inorder' | 'preorder' | 'postorder';

const traversalAlgorithm = (root: TreeNode | null, type: TraversalType): TreeStep[] => {
    const steps: TreeStep[] = [];
    const visited: number[] = [];

    const traverse = (node: TreeNode | null) => {
        if (!node) return;

        // Preorder: Visit -> Left -> Right
        if (type === 'preorder') {
            visited.push(node.id);
            steps.push({
                visited: [...visited],
                current: node.id,
                description: `Visit ${node.value}`
            });
        }

        traverse(node.left);

        // Inorder: Left -> Visit -> Right
        if (type === 'inorder') {
            visited.push(node.id);
            steps.push({
                visited: [...visited],
                current: node.id,
                description: `Visit ${node.value}`
            });
        }

        traverse(node.right);

        // Postorder: Left -> Right -> Visit
        if (type === 'postorder') {
            visited.push(node.id);
            steps.push({
                visited: [...visited],
                current: node.id,
                description: `Visit ${node.value}`
            });
        }
    };

    traverse(root);

    // Final step
    steps.push({
        visited: [...visited],
        current: null,
        description: "Finished traversal"
    });

    return steps;
};

export const TreeTraversal: React.FC = () => {
    const [speed, setSpeed] = useState(50);
    const [traversalType, setTraversalType] = useState<TraversalType>('inorder');

    const algorithmWrapper = (root: TreeNode | null) => traversalAlgorithm(root, traversalType);

    const {
        nodes,
        edges,
        visited,
        current,
        isPlaying,
        play,
        pause,
        reset,
        stepForward,
        generateNewTree,
        isFinished
    } = useTree({
        algorithm: algorithmWrapper,
        speed
    });

    const explanation = `
    Tree Traversal is about visiting every node in the tree exactly once. 
    The order matters! 
    - Inorder: Left, then Root, then Right.
    - Preorder: Root, then Left, then Right.
    - Postorder: Left, then Right, then Root.
  `;

    const howItWorks = [
        "Start at the root.",
        "Follow the rules for the specific traversal type (e.g., go left first).",
        "Visit nodes recursively.",
        "Keep track of visited nodes."
    ];

    const code = `function inorder(node) {
  if (!node) return;
  inorder(node.left);
  console.log(node.val);
  inorder(node.right);
}

function preorder(node) {
  if (!node) return;
  console.log(node.val);
  preorder(node.left);
  preorder(node.right);
}

function postorder(node) {
  if (!node) return;
  postorder(node.left);
  postorder(node.right);
  console.log(node.val);
}`;

    const realWorldUses = [
        "Inorder: Getting sorted data from a BST.",
        "Preorder: Copying a tree structure.",
        "Postorder: Deleting a tree (delete children before parent)."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Tree Traversals</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Different ways to visit every node in a tree.
                </p>
            </div>

            <div className="flex justify-center gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-slate-700">Type:</span>
                <select
                    value={traversalType}
                    onChange={(e) => {
                        setTraversalType(e.target.value as TraversalType);
                        reset();
                    }}
                    className="border border-slate-300 rounded px-3 py-1 bg-white"
                >
                    <option value="inorder">Inorder (Left-Root-Right)</option>
                    <option value="preorder">Preorder (Root-Left-Right)</option>
                    <option value="postorder">Postorder (Left-Right-Root)</option>
                </select>
                <button
                    onClick={() => generateNewTree()}
                    className="text-sm text-indigo-600 font-medium hover:text-indigo-800"
                >
                    New Random Tree
                </button>
            </div>

            <div className="space-y-8">
                <div className="h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <VisualizerContainer
                        title={`${traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} Traversal`}
                        isPlaying={isPlaying}
                        onPlay={play}
                        onPause={pause}
                        onReset={reset}
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
