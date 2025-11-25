import React, { useState } from 'react';
import { useSorting } from '../../hooks/useSorting';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { SortingBars } from '../../components/SortingBars';
import type { SortingStep } from '../../types';

const insertionSortAlgorithm = (initialArray: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const array = [...initialArray];
    const n = array.length;

    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;

        // Highlight key
        steps.push({
            array: [...array],
            comparing: [i],
            swapping: [],
            sorted: Array.from({ length: i }, (_, k) => k)
        });

        while (j >= 0 && array[j] > key) {
            // Compare
            steps.push({
                array: [...array],
                comparing: [j, j + 1],
                swapping: [],
                sorted: Array.from({ length: i }, (_, k) => k)
            });

            array[j + 1] = array[j];

            // Show shift
            steps.push({
                array: [...array],
                comparing: [],
                swapping: [j + 1],
                sorted: Array.from({ length: i }, (_, k) => k)
            });

            j = j - 1;
        }
        array[j + 1] = key;

        // Place key
        steps.push({
            array: [...array],
            comparing: [],
            swapping: [j + 1],
            sorted: Array.from({ length: i + 1 }, (_, k) => k)
        });
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

export const InsertionSort: React.FC = () => {
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
        algorithm: insertionSortAlgorithm,
        speed
    });

    const explanation = `
    Insertion Sort is like sorting playing cards in your hand. 
    You pick up one card at a time and put it in the right spot among the cards you're already holding. 
    You keep doing this until all the cards are in your hand and sorted!
  `;

    const howItWorks = [
        "Start with the second item in the list (the first is already 'sorted' by itself).",
        "Compare it with the item before it.",
        "If it's smaller, move the previous item up to make space.",
        "Keep moving back until you find the right spot or reach the start.",
        "Insert the item into that spot.",
        "Repeat for all remaining items."
    ];

    const code = `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    // Move elements of arr[0..i-1], that are greater than key,
    // to one position ahead of their current position
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}`;

    const realWorldUses = [
        "Small Datasets: It's very fast for small lists.",
        "Almost Sorted Data: If the list is already mostly sorted, it does very little work.",
        "Online Sorting: Sorting data as it arrives one by one."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Insertion Sort</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Builds the final sorted array one item at a time.
                </p>
            </div>

            <div className="space-y-8">
                <div className="h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <VisualizerContainer
                        title="Insertion Sort Visualization"
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
