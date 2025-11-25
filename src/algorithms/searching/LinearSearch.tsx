import React, { useState } from 'react';
import { useSearching } from '../../hooks/useSearching';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { SortingBars } from '../../components/SortingBars';
import type { SortingStep } from '../../types';

const linearSearchAlgorithm = (array: number[], target: number): SortingStep[] => {
    const steps: SortingStep[] = [];

    for (let i = 0; i < array.length; i++) {
        // Check
        steps.push({
            array: [...array],
            comparing: [i],
            swapping: [],
            sorted: []
        });

        if (array[i] === target) {
            // Found
            steps.push({
                array: [...array],
                comparing: [],
                swapping: [],
                sorted: [i]
            });
            return steps;
        }
    }

    // Not found
    steps.push({
        array: [...array],
        comparing: [],
        swapping: [],
        sorted: []
    });

    return steps;
};

export const LinearSearch: React.FC = () => {
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
        algorithm: linearSearchAlgorithm,
        speed
    });

    const explanation = `
    Linear Search is like looking for your favorite toy in a toy box by picking up one toy at a time and checking if it's the one you want. 
    You start at the beginning and check every single item until you find it or run out of items.
  `;

    const howItWorks = [
        "Start at the first item in the list.",
        "Check if it matches what you're looking for.",
        "If yes, you found it!",
        "If no, move to the next item.",
        "Repeat until you find the item or reach the end of the list."
    ];

    const code = `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found at index i
    }
  }
  return -1; // Not found
}`;

    const realWorldUses = [
        "Unsorted Lists: The only way to search if the data isn't sorted.",
        "Small Lists: Fast enough for small amounts of data.",
        "Simple checks: Checking if a grocery item is in your cart."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Linear Search</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Sequentially checks each element of the list until a match is found or the whole list has been searched.
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
                    onClick={() => generateNewArray(15, false)}
                    className="text-sm text-indigo-600 font-medium hover:text-indigo-800"
                >
                    New Random List
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
