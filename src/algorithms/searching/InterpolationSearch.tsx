import React, { useState } from 'react';
import { useSearching } from '../../hooks/useSearching';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { SortingBars } from '../../components/SortingBars';
import type { SortingStep } from '../../types';

const interpolationSearchAlgorithm = (array: number[], target: number): SortingStep[] => {
    const steps: SortingStep[] = [];
    let low = 0;
    let high = array.length - 1;

    while (low <= high && target >= array[low] && target <= array[high]) {
        if (low === high) {
            steps.push({
                array: [...array],
                comparing: [low],
                swapping: [],
                sorted: []
            });
            if (array[low] === target) {
                steps.push({
                    array: [...array],
                    comparing: [],
                    swapping: [],
                    sorted: [low]
                });
                return steps;
            }
            return steps;
        }

        // Probing the position with keeping uniform distribution in mind.
        const pos = low + Math.floor(((high - low) / (array[high] - array[low])) * (target - array[low]));

        steps.push({
            array: [...array],
            comparing: [pos],
            swapping: [], // Could visualize range low-high if desired
            sorted: []
        });

        if (array[pos] === target) {
            steps.push({
                array: [...array],
                comparing: [],
                swapping: [],
                sorted: [pos]
            });
            return steps;
        }

        if (array[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }

    steps.push({
        array: [...array],
        comparing: [],
        swapping: [],
        sorted: []
    });
    return steps;
};

export const InterpolationSearch: React.FC = () => {
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
        algorithm: interpolationSearchAlgorithm,
        speed
    });

    const explanation = `
    Interpolation Search is like looking for a name in a phone book. 
    If you're looking for "Zack", you don't start in the middle; you jump to the end. 
    If you're looking for "Adam", you jump to the beginning. 
    It guesses where the item might be based on its value. It's super fast for evenly distributed data!
  `;

    const howItWorks = [
        "Start with the whole sorted list.",
        "Calculate a probable position using a formula (like estimating where a word is in a dictionary).",
        "Check that position.",
        "If it's a match, great!",
        "If not, narrow the search range and calculate a new position.",
        "Repeat."
    ];

    const code = `function interpolationSearch(arr, x) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high && x >= arr[low] && x <= arr[high]) {
    if (low === high) {
      if (arr[low] === x) return low;
      return -1;
    }
    
    let pos = low + Math.floor(((high - low) / (arr[high] - arr[low])) * (x - arr[low]));

    if (arr[pos] === x) return pos;

    if (arr[pos] < x) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}`;

    const realWorldUses = [
        "Phone Books: Humans naturally use this method.",
        "Databases: When keys are uniformly distributed (e.g., timestamps, sequential IDs).",
        "Fast lookup: Can be O(log log n) which is faster than Binary Search O(log n) for good data."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Interpolation Search</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    An improvement over Binary Search for instances, where the values in a sorted array are uniformly distributed.
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
