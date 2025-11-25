import React from 'react';
import { useSorting } from '../../hooks/useSorting';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { SortingBars } from '../../components/SortingBars';
import type { SortingStep } from '../../types';

const shellSortAlgorithm = (initialArray: number[]): SortingStep[] => {
    const array = [...initialArray];
    const steps: SortingStep[] = [];
    const n = array.length;

    const pushStep = (comparing: number[], swapping: number[], sortedIndices: number[]) => {
        steps.push({
            array: [...array],
            comparing,
            swapping,
            sorted: sortedIndices
        });
    };

    // Start with a big gap, then reduce the gap
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // Do a gapped insertion sort for this gap size.
        for (let i = gap; i < n; i += 1) {
            const temp = array[i];
            let j;

            pushStep([i, i - gap], [], []); // Compare

            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                pushStep([j, j - gap], [j, j - gap], []); // Swap visualization (shift)
                array[j] = array[j - gap];
                pushStep([], [], []);
            }
            array[j] = temp;
            pushStep([], [j], []); // Place temp
        }
    }

    // Final sorted state
    pushStep([], [], array.map((_, idx) => idx));

    return steps;
};

export const ShellSort: React.FC = () => {
    const [speed, setSpeed] = React.useState(50);
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
        algorithm: shellSortAlgorithm,
        speed
    });

    const explanation = `
    Shell Sort is an optimization of Insertion Sort. 
    Instead of only comparing items that are right next to each other, it starts by comparing items that are far apart. 
    This allows small items to move to the beginning of the list much faster. 
    It gradually reduces the gap between items until it becomes a regular Insertion Sort, but by then, the list is almost sorted!
  `;

    const howItWorks = [
        "Choose a gap size (usually half the list size).",
        "Compare items that are 'gap' distance apart.",
        "Sort these sub-lists using insertion sort.",
        "Reduce the gap size (usually by half).",
        "Repeat until the gap is 1 (regular insertion sort)."
    ];

    const code = `function shellSort(arr) {
  let n = arr.length;
  
  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
    for (let i = gap; i < n; i += 1) {
      let temp = arr[i];
      let j;
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      arr[j] = temp;
    }
  }
  return arr;
}`;

    const realWorldUses = [
        "Medium-sized arrays: It performs better than simple O(n²) algorithms.",
        "Standard C library: Used in uClibc implementation of qsort.",
        "Legacy systems: Was very popular before Quick Sort and Merge Sort became dominant."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Shell Sort</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    An in-place comparison sort that generalizes insertion sort to allow the exchange of items that are far apart.
                </p>
            </div>
            <div className="space-y-8">
                <div className="h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <VisualizerContainer
                        title="Shell Sort Visualization"
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
