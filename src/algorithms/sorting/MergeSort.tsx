import React, { useState } from 'react';
import { useSorting } from '../../hooks/useSorting';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { SortingBars } from '../../components/SortingBars';
import type { SortingStep } from '../../types';

const mergeSortAlgorithm = (initialArray: number[]): SortingStep[] => {
    const steps: SortingStep[] = [];
    const array = [...initialArray];
    const n = array.length;

    const merge = (arr: number[], l: number, m: number, r: number) => {
        const n1 = m - l + 1;
        const n2 = r - m;

        const L = new Array(n1);
        const R = new Array(n2);

        for (let i = 0; i < n1; i++) L[i] = arr[l + i];
        for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

        let i = 0;
        let j = 0;
        let k = l;

        while (i < n1 && j < n2) {
            // Compare
            steps.push({
                array: [...arr],
                comparing: [l + i, m + 1 + j],
                swapping: [],
                sorted: []
            });

            if (L[i] <= R[j]) {
                arr[k] = L[i];
                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [k], // Highlight update
                    sorted: []
                });
                i++;
            } else {
                arr[k] = R[j];
                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [k], // Highlight update
                    sorted: []
                });
                j++;
            }
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            steps.push({
                array: [...arr],
                comparing: [],
                swapping: [k],
                sorted: []
            });
            i++;
            k++;
        }

        while (j < n2) {
            arr[k] = R[j];
            steps.push({
                array: [...arr],
                comparing: [],
                swapping: [k],
                sorted: []
            });
            j++;
            k++;
        }
    };

    const mergeSort = (arr: number[], l: number, r: number) => {
        if (l >= r) {
            return;
        }
        const m = l + Math.floor((r - l) / 2);
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    };

    mergeSort(array, 0, n - 1);

    // Final sorted state
    steps.push({
        array: [...array],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, k) => k)
    });

    return steps;
};

export const MergeSort: React.FC = () => {
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
        algorithm: mergeSortAlgorithm,
        speed
    });

    const explanation = `
    Merge Sort is a "divide and conquer" algorithm. Imagine you have a messy deck of cards. 
    You split the deck in half, then split those halves in half, and keep going until you have piles of just one card. 
    Since a single card is already sorted, you then start merging the piles back together, making sure they are in order as you combine them. 
    Eventually, you have one big sorted deck!
  `;

    const howItWorks = [
        "Divide the list into two halves.",
        "Recursively divide each half until you have lists with only one item.",
        "Merge the smaller lists back together in sorted order.",
        "compare the first items of each list and pick the smaller one to add to the new list.",
        "Repeat until all items are merged back into a single sorted list."
    ];

    const code = `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}`;

    const realWorldUses = [
        "E-commerce: Sorting large product catalogs efficiently.",
        "External Sorting: Sorting data that is too big to fit in memory (like huge databases).",
        "Stable Sort: When you need to keep the original order of equal items."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Merge Sort</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    A stable, efficient, divide-and-conquer sorting algorithm.
                </p>
            </div>

            <div className="space-y-8">
                <div className="h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <VisualizerContainer
                        title="Merge Sort Visualization"
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
