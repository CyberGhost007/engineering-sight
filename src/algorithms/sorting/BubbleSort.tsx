import React, { useState } from 'react';
import { useSorting } from '../../hooks/useSorting';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { SortingBars } from '../../components/SortingBars';
import type { SortingStep } from '../../types';

const bubbleSortAlgorithm = (initialArray: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const array = [...initialArray];
    const n = array.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            // Compare
            steps.push({
                array: [...array],
                comparing: [j, j + 1],
                swapping: [],
                sorted: Array.from({ length: i }, (_, k) => n - 1 - k) // Last i elements are sorted
            });

            if (array[j] > array[j + 1]) {
                // Swap
                const temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                steps.push({
                    array: [...array],
                    comparing: [],
                    swapping: [j, j + 1],
                    sorted: Array.from({ length: i }, (_, k) => n - 1 - k)
                });
            }
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

export const BubbleSort: React.FC = () => {
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
        algorithm: bubbleSortAlgorithm,
        speed
    });

    const explanation = `
    Imagine you have a line of kids organized by height. Bubble Sort works by looking at two kids standing next to each other. 
    If the kid on the left is taller than the kid on the right, they swap places. 
    We keep doing this down the line until the tallest kid "bubbles up" to the very end. 
    Then we start over, but we don't need to check the last kid anymore because we know they are the tallest!
  `;

    const howItWorks = [
        "Start at the beginning of the list.",
        "Compare the first two items. If the first is bigger than the second, swap them.",
        "Move to the next pair and repeat until you reach the end.",
        "At the end of the first pass, the largest item is in its correct spot (at the end).",
        "Repeat the process for the remaining items, ignoring the ones already sorted at the end."
    ];

    const code = `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n; i++) {
    // Last i elements are already in place
    for (let j = 0; j < n - i - 1; j++) {
      
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap if they are in wrong order
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`;

    const realWorldUses = [
        "Teaching: It's the simplest sorting algorithm to learn.",
        "Computer Graphics: Detecting very small errors in almost-sorted data.",
        "Simple checks: When you just need to check if a list is already sorted."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Bubble Sort</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    The simplest sorting algorithm that works by repeatedly swapping adjacent elements if they are in the wrong order.
                </p>
            </div>

            <div className="space-y-8">
                <div className="h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <VisualizerContainer
                        title="Bubble Sort Visualization"
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
