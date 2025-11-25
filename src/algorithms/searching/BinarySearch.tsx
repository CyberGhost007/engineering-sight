import React, { useState } from 'react';
import { useSearching } from '../../hooks/useSearching';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { SortingBars } from '../../components/SortingBars';
import type { SortingStep } from '../../types';

const binarySearchAlgorithm = (array: number[], target: number): SortingStep[] => {
    const steps: SortingStep[] = [];
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Visualize range and mid
        steps.push({
            array: [...array],
            comparing: [mid],
            swapping: Array.from({ length: right - left + 1 }, (_, k) => left + k), // Use swapping color for range
            sorted: []
        });

        if (array[mid] === target) {
            // Found
            steps.push({
                array: [...array],
                comparing: [],
                swapping: [],
                sorted: [mid]
            });
            return steps;
        }

        if (array[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
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

export const BinarySearch: React.FC = () => {
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
        algorithm: binarySearchAlgorithm,
        speed
    });

    const explanation = `
    Binary Search is like looking for a word in a dictionary. 
    You open the book to the middle. If the word you're looking for comes after the word you see, you ignore the first half of the book and look in the second half. 
    You keep splitting the remaining pages in half until you find your word. 
    BUT! The list MUST be sorted first for this to work.
  `;

    const howItWorks = [
        "Start with the whole sorted list.",
        "Look at the item in the exact middle.",
        "If it's what you want, you're done!",
        "If it's smaller than what you want, throw away the left half and look in the right half.",
        "If it's bigger than what you want, throw away the right half and look in the left half.",
        "Repeat until you find it or run out of items."
    ];

    const code = `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Found
    }

    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1; // Not found
}`;

    const realWorldUses = [
        "Databases: Finding a record by ID very quickly.",
        "Libraries: Finding a book on a shelf (if they are sorted).",
        "Autocomplete: Quickly finding words that start with what you typed."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Binary Search</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Efficiently finds an item from a sorted list by repeatedly dividing the search interval in half.
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
