import React from 'react';
import { useSorting } from '../../hooks/useSorting';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { SortingBars } from '../../components/SortingBars';
import type { SortingStep } from '../../types';

const heapSortAlgorithm = (initialArray: number[]): SortingStep[] => {
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

    const heapify = (n: number, i: number, sortedIndices: number[]) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;

        if (left < n) {
            pushStep([largest, left], [], sortedIndices);
            if (array[left] > array[largest]) {
                largest = left;
            }
        }

        if (right < n) {
            pushStep([largest, right], [], sortedIndices);
            if (array[right] > array[largest]) {
                largest = right;
            }
        }

        if (largest !== i) {
            pushStep([], [i, largest], sortedIndices);
            [array[i], array[largest]] = [array[largest], array[i]];
            pushStep([], [], sortedIndices);

            heapify(n, largest, sortedIndices);
        }
    };

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i, []);
    }

    // One by one extract an element from heap
    const sortedIndices: number[] = [];
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        pushStep([], [0, i], sortedIndices);
        [array[0], array[i]] = [array[i], array[0]];
        pushStep([], [], sortedIndices);

        sortedIndices.push(i);

        // call max heapify on the reduced heap
        heapify(i, 0, sortedIndices);
    }
    sortedIndices.push(0);
    pushStep([], [], sortedIndices);

    return steps;
};

export const HeapSort: React.FC = () => {
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
        algorithm: heapSortAlgorithm,
        speed
    });

    const explanation = `
    Heap Sort uses a special tree-based data structure called a Binary Heap. 
    First, it turns the list into a Max Heap, where the biggest number is always at the top (root). 
    Then, it takes that biggest number, moves it to the end of the list (its sorted position), and fixes the heap. 
    It repeats this until the heap is empty and the list is sorted.
  `;

    const howItWorks = [
        "Build a Max Heap from the input data.",
        "At this point, the largest item is stored at the root of the heap.",
        "Replace it with the last item of the heap followed by reducing the size of heap by 1.",
        "Heapify the root of the tree.",
        "Repeat step 2 while the size of the heap is greater than 1."
    ];

    const code = `function heapSort(arr) {
  const n = arr.length;

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(arr, n, i);

  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];

    // call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
}

function heapify(arr, n, i) {
  let largest = i;
  let l = 2 * i + 1;
  let r = 2 * i + 2;

  if (l < n && arr[l] > arr[largest])
    largest = l;

  if (r < n && arr[r] > arr[largest])
    largest = r;

  if (largest != i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`;

    const realWorldUses = [
        "Systems with limited memory: Heap Sort sorts in-place (doesn't need extra space like Merge Sort).",
        "Priority Queues: The underlying logic is used to manage tasks by priority.",
        "Embedded Systems: Where consistent performance (O(n log n)) is critical."
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Heap Sort</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    A comparison-based sorting technique based on Binary Heap data structure.
                </p>
            </div>
            <div className="space-y-8">
                <div className="h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <VisualizerContainer
                        title="Heap Sort Visualization"
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
