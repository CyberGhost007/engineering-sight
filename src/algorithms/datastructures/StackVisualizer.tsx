import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Eye, RotateCcw, Layers } from 'lucide-react';

export const StackVisualizer: React.FC = () => {
    const [stack, setStack] = useState<number[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('Stack is empty. Start pushing elements!');
    const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const MAX_SIZE = 10;

    const handlePush = () => {
        if (stack.length >= MAX_SIZE) {
            setMessage('Stack Overflow! Cannot push more elements.');
            return;
        }
        const val = parseInt(inputValue);
        if (isNaN(val)) {
            setMessage('Please enter a valid number.');
            return;
        }
        setStack([val, ...stack]);
        setInputValue('');
        setMessage(`Pushed ${val} onto the stack.`);
        setHighlightIndex(0);
        setTimeout(() => setHighlightIndex(null), 1000);
        inputRef.current?.focus();
    };

    const handlePop = () => {
        if (stack.length === 0) {
            setMessage('Stack Underflow! The stack is empty.');
            return;
        }
        const popped = stack[0];
        setStack(stack.slice(1));
        setMessage(`Popped ${popped} from the stack.`);
    };

    const handlePeek = () => {
        if (stack.length === 0) {
            setMessage('Stack is empty. Nothing to peek.');
            return;
        }
        setMessage(`Top element is ${stack[0]}.`);
        setHighlightIndex(0);
        setTimeout(() => setHighlightIndex(null), 1000);
    };

    const handleClear = () => {
        setStack([]);
        setMessage('Stack cleared.');
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3">
                    <Layers className="text-indigo-600" size={40} />
                    Stack Visualizer
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    A Stack is a LIFO (Last-In, First-Out) data structure. Elements are added and removed from the same end, called the "top".
                </p>
            </div>

            {/* Controls */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                    <input
                        ref={inputRef}
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Value"
                        className="w-24 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onKeyDown={(e) => e.key === 'Enter' && handlePush()}
                    />
                    <button
                        onClick={handlePush}
                        disabled={stack.length >= MAX_SIZE}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                    >
                        <Plus size={18} /> Push
                    </button>
                </div>

                <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />

                <button
                    onClick={handlePop}
                    disabled={stack.length === 0}
                    className="px-4 py-2 bg-rose-100 text-rose-700 rounded-lg font-medium hover:bg-rose-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                    <Trash2 size={18} /> Pop
                </button>

                <button
                    onClick={handlePeek}
                    disabled={stack.length === 0}
                    className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-medium hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                    <Eye size={18} /> Peek
                </button>

                <button
                    onClick={handleClear}
                    disabled={stack.length === 0}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                    <RotateCcw size={18} /> Clear
                </button>
            </div>

            {/* Visualization Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stack Container */}
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-8 min-h-[400px] flex flex-col items-center justify-end relative overflow-hidden">
                    <div className="absolute top-4 left-4 text-slate-400 text-sm font-mono">
                        Size: {stack.length} / {MAX_SIZE}
                    </div>

                    <div className="w-48 border-b-4 border-l-4 border-r-4 border-slate-700 rounded-b-xl p-2 min-h-[50px] flex flex-col-reverse gap-2 bg-slate-800/30 backdrop-blur-sm">
                        <AnimatePresence mode='popLayout'>
                            {stack.map((val, idx) => (
                                <motion.div
                                    key={`${val}-${stack.length - 1 - idx}`} // Unique key based on value and position (reversed)
                                    layout
                                    initial={{ opacity: 0, y: -50, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        backgroundColor: highlightIndex === idx ? '#818cf8' : '#4f46e5' // Indigo-400 vs Indigo-600
                                    }}
                                    exit={{ opacity: 0, y: -20, scale: 0.5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className={`
                                        h-12 w-full rounded-lg flex items-center justify-center text-white font-bold shadow-lg border border-white/10
                                        ${idx === 0 ? 'bg-indigo-500' : 'bg-indigo-600'}
                                    `}
                                >
                                    {val}
                                    {idx === 0 && (
                                        <span className="absolute right-full mr-4 text-xs text-indigo-400 font-mono">TOP</span>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {stack.length === 0 && (
                            <div className="h-full flex items-center justify-center text-slate-600 text-sm italic py-4">
                                Empty Stack
                            </div>
                        )}
                    </div>
                    <div className="mt-2 text-slate-500 text-xs uppercase tracking-widest font-semibold">Stack Base</div>
                </div>

                {/* Info Panel */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-2">Status</h3>
                        <p className={`text-lg font-medium ${message.includes('Overflow') || message.includes('Underflow') ? 'text-rose-600' : 'text-slate-700'}`}>
                            {message}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">Complexity Analysis</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Push</span>
                                <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">O(1)</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Pop</span>
                                <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">O(1)</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Peek</span>
                                <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">O(1)</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Space</span>
                                <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">O(n)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
