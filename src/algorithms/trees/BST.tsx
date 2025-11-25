import React, { useState } from 'react';
import { useTree, TreeNode } from '../../hooks/useTree';
import type { TreeStep } from '../../hooks/useTree';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { GraphCanvas } from '../../components/GraphCanvas';

const bstAlgorithm = (root: TreeNode | null, target?: number): TreeStep[] => {
    const steps: TreeStep[] = [];

    if (!root || target === undefined) return steps;

    const search = (node: TreeNode | null, val: number) => {
        if (!node) return;

        // Visit current
        steps.push({
            visited: [],
            current: node.id,
            description: `Checking node ${node.value}`
        });

        if (node.value === val) {
            steps.push({
                visited: [node.id], // Mark found
                current: node.id,
                description: `Found ${val}!`
            });
            return;
        }

        if (val < node.value) {
            if (node.left) {
                search(node.left, val);
            } else {
                steps.push({
                    visited: [],
                    current: node.id,
                    description: `${val} < ${node.value}, but no left child. Not found.`
                });
            }
        } else {
            if (node.right) {
                search(node.right, val);
            } else {
                steps.push({
                    visited: [],
                    current: node.id,
                    description: `${val} > ${node.value}, but no right child. Not found.`
                });
            }
        }
    };

    search(root, target);
    return steps;
};

export const BST: React.FC = () => {
    const [speed, setSpeed] = useState(50);
    const [target, setTarget] = useState(50);

    // Custom wrapper to pass target to algorithm
    const algorithmWrapper = (root: TreeNode | null) => bstAlgorithm(root, target);

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
    A Binary Search Tree (BST) is a special kind of tree where for every node, all nodes to the left are smaller, and all nodes to the right are bigger. 
    This makes searching very fast, like a binary search but in a tree structure!
  `;

    const howItWorks = [
        "Start at the root.",
        "Compare the value you're looking for with the current node.",
        "If it matches, you found it!",
        "If it's smaller, go to the left child.",
        "If it's bigger, go to the right child.",
        "Repeat until you find it or hit a dead end."
    ];

    const code = `function searchBST(root, val) {
  if (!root || root.val === val) {
    return root;
  }

  if (val < root.val) {
    return searchBST(root.left, val);
  } else {
    return searchBST(root.right, val);
  }
}`;

    const realWorldUses = [
        "Databases: Used for indexing to make searches faster.",
        "File Systems: Organizing files and folders.",
        "Autocomplete: Storing words for quick lookup."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Binary Search Tree (BST)</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    A tree data structure that keeps data sorted for efficient search, insertion, and deletion.
                </p>
            </div>

            <div className="flex justify-center gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-slate-700">Search for:</span>
                <input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(Number(e.target.value))}
                    className="border border-slate-300 rounded px-3 py-1 w-24 text-center font-mono"
                />
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
                        title={`Searching for ${target}`}
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
