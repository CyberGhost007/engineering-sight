import { useState, useEffect, useCallback, useRef } from 'react';
import type { SortingStep } from '../types';

// We can reuse SortingStep type for simplicity:
// comparing -> indices being checked
// sorted -> found index
// swapping -> not used or used for range indicators in binary search

interface UseSearchingProps {
    initialArray?: number[];
    algorithm: (array: number[], target: number) => SortingStep[];
    speed?: number;
}

export const useSearching = ({ initialArray, algorithm, speed = 50 }: UseSearchingProps) => {
    const [array, setArray] = useState<number[]>(initialArray || []);
    const [target, setTarget] = useState<number>(0);
    const [steps, setSteps] = useState<SortingStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [comparing, setComparing] = useState<number[]>([]);
    const [swapping, setSwapping] = useState<number[]>([]); // Used for range in binary search
    const [sorted, setSorted] = useState<number[]>([]); // Used for found index

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const generateRandomArray = useCallback((length = 15, sorted = false) => {
        let newArray = Array.from({ length }, () => Math.floor(Math.random() * 100) + 1);
        if (sorted) {
            newArray.sort((a, b) => a - b);
        }
        setArray(newArray);
        // Pick a random target from the array or a random number
        const randomTarget = Math.random() > 0.3
            ? newArray[Math.floor(Math.random() * newArray.length)]
            : Math.floor(Math.random() * 100) + 1;
        setTarget(randomTarget);

        setSteps([]);
        setCurrentStep(0);
        setComparing([]);
        setSorted([]);
        setIsPlaying(false);
        return { array: newArray, target: randomTarget };
    }, []);

    // Initialize
    useEffect(() => {
        if (!initialArray) {
            generateRandomArray();
        }
    }, [generateRandomArray, initialArray]);

    // Generate steps
    useEffect(() => {
        if (array.length > 0) {
            const generatedSteps = algorithm([...array], target);
            setSteps(generatedSteps);
        }
    }, [array, target, algorithm]);

    // Playback logic
    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                setCurrentStep((prev) => {
                    if (prev < steps.length - 1) {
                        return prev + 1;
                    } else {
                        setIsPlaying(false);
                        return prev;
                    }
                });
            }, 1000 - (speed * 9));
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, steps.length, speed]);

    // Update state
    useEffect(() => {
        if (steps.length > 0 && currentStep < steps.length) {
            const step = steps[currentStep];
            setComparing(step.comparing);
            setSwapping(step.swapping);
            setSorted(step.sorted);
        }
    }, [currentStep, steps]);

    const reset = () => {
        setIsPlaying(false);
        setCurrentStep(0);
        setComparing([]);
        setSwapping([]);
        setSorted([]);
    };

    const stepForward = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    return {
        array,
        target,
        setTarget,
        comparing,
        swapping,
        found: sorted,
        isPlaying,
        play: () => setIsPlaying(true),
        pause: () => setIsPlaying(false),
        reset,
        stepForward,
        generateNewArray: generateRandomArray,
        isFound: sorted.length > 0
    };
};
