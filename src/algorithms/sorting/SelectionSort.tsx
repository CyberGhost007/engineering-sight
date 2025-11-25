import React, { useState } from 'react';
import { useSorting } from '../../hooks/useSorting';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { SortingBars } from '../../components/SortingBars';
import type { SortingStep } from '../../types';

const selectionSortAlgorithm = (initialArray: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const array = [...initialArray];
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;

        for (let j = i + 1; j < n; j++) {
            // Compare
            steps.push({
                array: [...array],
                comparing: [minIdx, j],
                swapping: [],
                sorted: Array.from({ length: i }, (_, k) => k)
            });

            if (array[j] < array[minIdx]) {
                minIdx = j;
                // Highlight new min
                steps.push({
                    array: [...array],
                    comparing: [minIdx], // Highlight min
                    swapping: [],
                    sorted: Array.from({ length: i }, (_, k) => k)
                });
            }
        }

        if (minIdx !== i) {
            // Swap
            const temp = array[i];
            array[i] = array[minIdx];
            array[minIdx] = temp;

            steps.push({
                array: [...array],
                comparing: [],
                swapping: [i, minIdx],
                sorted: Array.from({ length: i }, (_, k) => k)
            });
        }
    }

    // Final sorted state
    steps.push({
        array: [...array],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, k) => k)
    });

    return steps;
};

export const SelectionSort: React.FC = () => {
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
        algorithm: selectionSortAlgorithm,
        speed
    });

    const explanation = `
    Selection Sort is like finding the smallest toy in a pile and putting it on a shelf. 
    Then you find the next smallest toy in the remaining pile and put it next to the first one. 
    You keep doing this until all the toys are on the shelf in order from smallest to biggest.
  `;

    const howItWorks = [
        "Look through the entire list to find the smallest item.",
        "Swap it with the first item in the list.",
        "Now the first item is sorted.",
        "Look through the rest of the list (starting from the second item) to find the next smallest item.",
        "Swap it with the second item.",
        "Repeat until the whole list is sorted."
    ];

    const code = `function selectionSort(arr) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    // Find the minimum element in unsorted array
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }

    // Swap the found minimum element with the first element
    if (minIdx !== i) {
      let temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
  }
  return arr;
}`;

    const realWorldUses = [
        "Memory Constraints: It performs the minimum number of swaps, which is good if writing to memory is expensive.",
        "Simple Lists: Good for checking if everything is in order.",
        "Small Lists: Easy to implement and works well for very small amounts of data."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Selection Sort</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Repeatedly finds the minimum element from the unsorted part and puts it at the beginning.
                </p>
            </div>

            <div className="space-y-8">
                <div className="h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <VisualizerContainer
                        title="Selection Sort Visualization"
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
