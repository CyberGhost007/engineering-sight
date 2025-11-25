export type AlgorithmType = 'sorting' | 'searching' | 'graph' | 'tree';

export interface AlgorithmInfo {
    id: string;
    name: string;
    category: AlgorithmType;
    explanation: string;
    howItWorks: string[];
    code: string;
    realWorldUses: string[];
}

// Sorting specific types
export interface SortingStep {
    array: number[];
    comparing: number[]; // Indices being compared
    swapping: number[]; // Indices being swapped
    sorted: number[]; // Indices that are sorted
    description?: string;
}
