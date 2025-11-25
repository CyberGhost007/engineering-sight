import React, { useState } from 'react';
import { useSorting } from '../../hooks/useSorting';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { SortingBars } from '../../components/SortingBars';
import type { SortingStep } from '../../types';

const quickSortAlgorithm = (initialArray: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const array = [...initialArray];
    const n = array.length;

    const partition = (arr: number[], low: number, high: number) => {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            // Compare with pivot
            steps.push({
                array: [...arr],
                comparing: [j, high],
                swapping: [],
                sorted: []
            });

            if (arr[j] < pivot) {
                i++;
                // Swap
                const temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;

                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [i, j],
                    sorted: []
                });
            }
        }

        // Swap pivot to correct position
        const temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;

        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [i + 1, high],
            sorted: []
        });

        return i + 1;
    };

    const quickSort = (arr: number[], low: number, high: number) => {
        if (low < high) {
            const pi = partition(arr, low, high);

            // We can mark pi as sorted here if we want, but usually only at the very end everything is sorted.
            // However, for visualization, marking the pivot as sorted after partition is helpful.
            // Let's add a step to show pivot is sorted?
            // Actually, let's just recurse.

            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    };

    quickSort(array, 0, n - 1);

    // Final sorted state
    steps.push({
        array: [...array],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, k) => k)
    });

    return steps;
};

export const QuickSort: React.FC = () => {
    const [speed, setSpeed] = useState(50);
    const {
        array,
        comparing,
        swapping,
        sorted,
        isPlaying,
        play,
        pause,
        reset,
        stepForward,
        generateNewArray,
        isSorted
    } = useSorting({
        algorithm: quickSortAlgorithm,
        speed
    });

    const explanation = `
    Quick Sort is like organizing a messy room by picking one item (the "pivot") and throwing everything smaller to the left and everything bigger to the right. 
    Then you do the same thing for the pile on the left and the pile on the right. 
    Eventually, everything is in the right spot! It's usually much faster than Bubble Sort.
  `;

    const howItWorks = [
        "Pick a 'pivot' element (usually the last one).",
        "Go through the list and move all items smaller than the pivot to its left, and larger items to its right.",
        "Now the pivot is in its exact correct sorted position.",
        "Repeat this process for the sub-list on the left of the pivot and the sub-list on the right.",
        "Keep doing this until all sub-lists are sorted."
    ];

    const code = `function quickSort(arr, low, high) {
  if (low < high) {
    // partitionIndex is where the pivot is now placed
    let pi = partition(arr, low, high);

    // Recursively sort elements before and after partition
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = (low - 1);

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      // Swap arr[i] and arr[j]
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
  // Swap arr[i+1] and arr[high] (or pivot)
  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;

  return i + 1;
}`;

    const realWorldUses = [
        "Programming Languages: Most built-in sort functions (like in Python or Java) use a version of Quick Sort.",
        "Big Data: It's very fast and uses little extra memory, making it great for huge datasets.",
        "Databases: Used for sorting query results efficiently."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Quick Sort</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    A highly efficient sorting algorithm that uses a divide-and-conquer strategy to sort elements.
                </p>
            </div>

            <div className="space-y-8">
                <div className="h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <VisualizerContainer
                        title="Quick Sort Visualization"
                        isPlaying={isPlaying}
                        onPlay={play}
                        onPause={pause}
                        onReset={() => {
                            reset();
                            generateNewArray();
                        }}
                        onStepForward={stepForward}
                        speed={speed}
                        onSpeedChange={setSpeed}
                        isSorted={isSorted}
                    >
                        <SortingBars
                            array={array}
                            comparing={comparing}
                            swapping={swapping}
                            sorted={sorted}
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
