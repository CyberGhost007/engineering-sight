import React from 'react';
import { useSorting } from '../../hooks/useSorting';
import { VisualizerContainer } from '../../components/VisualizerContainer';
import { ExplanationPanel } from '../../components/ExplanationPanel';
import { SortingBars } from '../../components/SortingBars';
import type { SortingStep } from '../../types';

const cocktailShakerSortAlgorithm = (initialArray: number[]): SortingStep[] => {
    const array = [...initialArray];
    const steps: SortingStep[] = [];
    let swapped = true;
    let start = 0;
    let end = array.length;
    const sortedIndices: number[] = [];

    const pushStep = (comparing: number[], swapping: number[], currentSortedIndices: number[] = []) => {
        steps.push({
            array: [...array],
            comparing,
            swapping,
            sorted: [...currentSortedIndices]
        });
    };

    while (swapped) {
        swapped = false;

        // Forward pass (like Bubble Sort)
        for (let i = start; i < end - 1; ++i) {
            pushStep([i, i + 1], []);
            if (array[i] > array[i + 1]) {
                pushStep([], [i, i + 1]);
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                pushStep([], []);
                swapped = true;
            }
        }

        if (!swapped) break;

        swapped = false;
        end--;
        sortedIndices.push(end); // The last element is now sorted

        // Backward pass
        for (let i = end - 1; i >= start; i--) {
            // Fix for boundary check: i-1 can be < 0 if i=0. But loop condition i >= start.
            // If start=0, i can be 0. Then i-1 is -1.
            // Loop should be i > start.
            if (i > start) {
                pushStep([i, i - 1], []);
                if (array[i] < array[i - 1]) {
                    pushStep([], [i, i - 1]);
                    [array[i], array[i - 1]] = [array[i - 1], array[i]];
                    pushStep([], []);
                    swapped = true;
                }
            }
        }

        start++;
        sortedIndices.push(start - 1); // The first element is now sorted
    }

    // Fill remaining sorted
    for (let i = 0; i < array.length; i++) {
        if (!sortedIndices.includes(i)) sortedIndices.push(i);
    }
    pushStep([], [], sortedIndices);

    return steps;
};

export const CocktailShakerSort: React.FC = () => {
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
        algorithm: cocktailShakerSortAlgorithm,
        speed
    });

    const explanation = `
    Cocktail Shaker Sort is a fun variation of Bubble Sort. 
    Instead of just bubbling the biggest number to the top, it goes back and forth! 
    It bubbles the biggest number to the right, then turns around and bubbles the smallest number to the left. 
    It's like shaking a cocktail shaker back and forth!
  `;

    const howItWorks = [
        "Start at the beginning and bubble the largest item to the end (like Bubble Sort).",
        "Now, start from the end and bubble the smallest item to the beginning.",
        "Shrink the unsorted area from both sides.",
        "Repeat until no swaps are needed."
    ];

    const code = `function cocktailShakerSort(arr) {
  let swapped = true;
  let start = 0;
  let end = arr.length;

  while (swapped) {
    swapped = false;
    for (let i = start; i < end - 1; ++i) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    if (!swapped) break;
    swapped = false;
    end--;
    for (let i = end - 1; i >= start; i--) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    start++;
  }
  return arr;
}`;

    const realWorldUses = [
        "Teaching: Great for visualizing how bidirectional algorithms work.",
        "Almost sorted data: Can be faster than Bubble Sort for lists that are nearly sorted.",
        "Visual appeal: It just looks cool!"
    ];

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Cocktail Shaker Sort</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    A variation of Bubble Sort that sorts in both directions on each pass through the list.
                </p>
            </div>
            <div className="space-y-8">
                <div className="h-[600px] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <VisualizerContainer
                        title="Cocktail Shaker Sort Visualization"
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
