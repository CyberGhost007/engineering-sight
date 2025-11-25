import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Eye, RotateCcw, ListEnd } from 'lucide-react';

export const QueueVisualizer: React.FC = () => {
    const [queue, setQueue] = useState<number[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('Queue is empty. Start enqueuing elements!');
    const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const MAX_SIZE = 10;

    const handleEnqueue = () => {
        if (queue.length >= MAX_SIZE) {
            setMessage('Queue Overflow! Cannot enqueue more elements.');
            return;
        }
        const val = parseInt(inputValue);
        if (isNaN(val)) {
            setMessage('Please enter a valid number.');
            return;
        }
        setQueue([...queue, val]);
        setInputValue('');
        setMessage(`Enqueued ${val} into the queue.`);
        setHighlightIndex(queue.length); // Highlight the new last element
        setTimeout(() => setHighlightIndex(null), 1000);
        inputRef.current?.focus();
    };

    const handleDequeue = () => {
        if (queue.length === 0) {
            setMessage('Queue Underflow! The queue is empty.');
            return;
        }
        const dequeued = queue[0];
        setQueue(queue.slice(1));
        setMessage(`Dequeued ${dequeued} from the queue.`);
    };

    const handlePeek = () => {
        if (queue.length === 0) {
            setMessage('Queue is empty. Nothing to peek.');
            return;
        }
        setMessage(`Front element is ${queue[0]}.`);
        setHighlightIndex(0);
        setTimeout(() => setHighlightIndex(null), 1000);
    };

    const handleClear = () => {
        setQueue([]);
        setMessage('Queue cleared.');
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3">
                    <ListEnd className="text-indigo-600" size={40} />
                    Queue Visualizer
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    A Queue is a FIFO (First-In, First-Out) data structure. Elements are added at the "rear" and removed from the "front".
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
                        onKeyDown={(e) => e.key === 'Enter' && handleEnqueue()}
                    />
                    <button
                        onClick={handleEnqueue}
                        disabled={queue.length >= MAX_SIZE}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                    >
                        <Plus size={18} /> Enqueue
                    </button>
                </div>

                <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block" />

                <button
                    onClick={handleDequeue}
                    disabled={queue.length === 0}
                    className="px-4 py-2 bg-rose-100 text-rose-700 rounded-lg font-medium hover:bg-rose-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                    <Trash2 size={18} /> Dequeue
                </button>

                <button
                    onClick={handlePeek}
                    disabled={queue.length === 0}
                    className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-medium hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                    <Eye size={18} /> Peek
                </button>

                <button
                    onClick={handleClear}
                    disabled={queue.length === 0}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                    <RotateCcw size={18} /> Clear
                </button>
            </div>

            {/* Visualization Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Queue Container */}
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-8 min-h-[300px] flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-4 left-4 text-slate-400 text-sm font-mono">
                        Size: {queue.length} / {MAX_SIZE}
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto max-w-full p-4">
                        <div className="text-slate-500 text-xs uppercase tracking-widest font-semibold mr-2">Front</div>
                        <AnimatePresence mode='popLayout'>
                            {queue.map((val, idx) => (
                                <motion.div
                                    key={`${val}-${idx}`} // Key based on value and index to track identity
                                    layout
                                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        scale: 1,
                                        backgroundColor: highlightIndex === idx ? '#818cf8' : '#4f46e5'
                                    }}
                                    exit={{ opacity: 0, x: -50, scale: 0.5 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="h-16 w-16 min-w-[4rem] rounded-xl flex items-center justify-center text-white font-bold shadow-lg border border-white/10 bg-indigo-600 relative"
                                >
                                    {val}
                                    <div className="absolute -bottom-6 text-[10px] text-slate-500 font-mono">
                                        Idx: {idx}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {queue.length === 0 && (
                            <div className="text-slate-600 text-sm italic px-4">
                                Empty Queue
                            </div>
                        )}
                        <div className="text-slate-500 text-xs uppercase tracking-widest font-semibold ml-2">Rear</div>
                    </div>
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
                                <span className="text-slate-600">Enqueue</span>
                                <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">O(1)</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Dequeue</span>
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
