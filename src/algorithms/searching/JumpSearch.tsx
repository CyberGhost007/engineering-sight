import React, { useState } from 'react';
import { useSearching } from '../../hooks/useSearching';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { SortingBars } from '../../components/SortingBars';
import type { SortingStep } from '../../types';

const jumpSearchAlgorithm = (array: number[], target: number): SortingStep[] => {
    const steps: SortingStep[] = [];
    const n = array.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;

    // Finding the block where element is present (if it is present)
    while (array[Math.min(step, n) - 1] < target) {
        steps.push({
            array: [...array],
            comparing: [Math.min(step, n) - 1],
            swapping: [],
            sorted: []
        });
        prev = step;
        if (prev >= n) {
            steps.push({
                array: [...array],
                comparing: [],
                swapping: [],
                sorted: []
            });
            return steps;
        }
    }

    // Doing a linear search for x in block beginning with prev
    while (array[prev] < target) {
        steps.push({
            array: [...array],
            comparing: [prev],
            swapping: [],
            sorted: []
        });
        prev++;
        if (prev === Math.min(step, n)) {
            steps.push({
                array: [...array],
                comparing: [],
                swapping: [],
                sorted: []
            });
            return steps;
        }
    }

    // If element is found
    steps.push({
        array: [...array],
        comparing: [prev],
        swapping: [],
        sorted: []
    });

    if (array[prev] === target) {
        steps.push({
            array: [...array],
            comparing: [],
            swapping: [],
            sorted: [prev]
        });
        return steps;
    }

    return steps;
};

export const JumpSearch: React.FC = () => {
    const [speed, setSpeed] = useState(50);
    const {
        array,
        target,
        setTarget,
        comparing,
        found,
        isPlaying,
        play,
        pause,
        reset,
        stepForward,
        generateNewArray,
        isFound
    } = useSearching({
        algorithm: jumpSearchAlgorithm,
        speed
    });

    const explanation = `
    Jump Search is like skipping through a book. 
    Instead of checking every page (Linear Search), you jump ahead by a fixed number of pages. 
    If you jump past the page you want, you go back to the last jump and check page by page. 
    It's faster than Linear Search but needs the book to be sorted!
  `;

    const howItWorks = [
        "Determine a jump size (usually square root of list size).",
        "Jump ahead by that size.",
        "If the item at the jump is smaller than what you want, jump again.",
        "If the item is larger, go back to the previous jump.",
        "Perform a linear search in that small block."
    ];

    const code = `function jumpSearch(arr, x) {
  let n = arr.length;
  let step = Math.floor(Math.sqrt(n));
  let prev = 0;
  
  while (arr[Math.min(step, n)-1] < x) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }
  
  while (arr[prev] < x) {
    prev++;
    if (prev == Math.min(step, n)) return -1;
  }
  
  if (arr[prev] == x) return prev;
  return -1;
}`;

    const realWorldUses = [
        "When jumping back is expensive: Like in old tape drives where rewinding took time.",
        "Alternative to Binary Search: When the cost of jumping is cheaper than random access."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Jump Search</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    A searching algorithm for sorted arrays that checks fewer elements than linear search by jumping ahead.
                </p>
            </div>

            <div className="flex justify-center gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <span className="font-bold text-slate-700">Find:</span>
                <input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(Number(e.target.value))}
                    className="border border-slate-300 rounded px-3 py-1 w-24 text-center font-mono"
                />
                <button
                    onClick={() => generateNewArray(15, true)} // true for sorted
                    className="text-sm text-indigo-600 font-medium hover:text-indigo-800"
                >
                    New Sorted List
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
                        isSorted={isFound}
                    >
                        <SortingBars
                            array={array}
                            comparing={comparing}
                            swapping={[]}
                            sorted={found}
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
