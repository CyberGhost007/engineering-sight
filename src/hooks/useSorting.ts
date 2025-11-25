import { useState, useEffect, useCallback, useRef } from 'react';
import type { SortingStep } from '../types';

interface UseSortingProps {
    initialArray?: number[];
    algorithm: (array: number[]) => SortingStep[];
    speed?: number;
}

export const useSorting = ({ initialArray, algorithm, speed = 50 }: UseSortingProps) => {
    const [array, setArray] = useState<number[]>(initialArray || []);
    const [steps, setSteps] = useState<SortingStep[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [comparing, setComparing] = useState<number[]>([]);
    const [swapping, setSwapping] = useState<number[]>([]);
    const [sorted, setSorted] = useState<number[]>([]);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const generateRandomArray = useCallback((length = 10) => {
        const newArray = Array.from({ length }, () => Math.floor(Math.random() * 100) + 10);
        setArray(newArray);
        setSteps([]);
        setCurrentStep(0);
        setComparing([]);
        setSwapping([]);
        setSorted([]);
        setIsPlaying(false);
        return newArray;
    }, []);

    // Initialize
    useEffect(() => {
        if (!initialArray) {
            generateRandomArray();
        }
    }, [generateRandomArray, initialArray]);

    // Generate steps when array changes or algorithm changes
    useEffect(() => {
        if (array.length > 0 && steps.length === 0) {
            const generatedSteps = algorithm([...array]);
            setSteps(generatedSteps);
        }
    }, [array, algorithm, steps.length]);

    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    // Playback logic
    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                if (!isMounted.current) return;

                setCurrentStep((prev) => {
                    if (prev < steps.length - 1) {
                        return prev + 1;
                    } else {
                        if (isMounted.current) setIsPlaying(false);
                        return prev;
                    }
                });
            }, 1000 - (speed * 9)); // Speed mapping: 1 -> 1000ms, 100 -> 100ms roughly
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, steps.length, speed]);

    // Update state based on current step
    useEffect(() => {
        if (steps.length > 0 && currentStep < steps.length) {
            const step = steps[currentStep];
            setArray(step.array);
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
        // Re-generate array or just reset to initial state of current array? 
        // Usually we want to restart with same data or new data. 
        // Let's just reset to step 0.
        if (steps.length > 0) {
            setArray(steps[0].array);
        }
    };

    const stepForward = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    return {
        array,
        comparing,
        swapping,
        sorted,
        isPlaying,
        play: () => setIsPlaying(true),
        pause: () => setIsPlaying(false),
        reset,
        stepForward,
        generateNewArray: () => generateRandomArray(),
        isSorted: currentStep === steps.length - 1 && steps.length > 0
    };
};
