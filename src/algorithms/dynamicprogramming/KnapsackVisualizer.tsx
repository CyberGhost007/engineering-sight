import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Briefcase, Package, Calculator } from 'lucide-react';

interface Item {
    id: number;
    weight: number;
    value: number;
    name: string;
}

export const KnapsackVisualizer: React.FC = () => {
    const [capacity, setCapacity] = useState(7);
    const [items] = useState<Item[]>([
        { id: 1, weight: 1, value: 1, name: 'Apple' },
        { id: 2, weight: 3, value: 4, name: 'Laptop' },
        { id: 3, weight: 4, value: 5, name: 'Guitar' },
        { id: 4, weight: 5, value: 7, name: 'Gold' },
    ]);
    const [dpTable, setDpTable] = useState<number[][]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [currentCell, setCurrentCell] = useState<{ r: number, c: number } | null>(null);
    const [message, setMessage] = useState('Adjust capacity and items, then click Start.');

    useEffect(() => {
        reset();
    }, [capacity, items]);

    const reset = () => {
        setIsRunning(false);
        setCurrentCell(null);
        setSelectedItems([]);
        // Initialize empty table
        const table = Array(items.length + 1).fill(0).map(() => Array(capacity + 1).fill(0));
        setDpTable(table);
        setMessage('Ready to solve 0/1 Knapsack.');
    };

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const solveKnapsack = async () => {
        setIsRunning(true);
        setMessage('Starting DP Algorithm...');

        const n = items.length;
        const W = capacity;
        const dp = Array(n + 1).fill(0).map(() => Array(W + 1).fill(0));

        // DP Calculation
        for (let i = 1; i <= n; i++) {
            for (let w = 1; w <= W; w++) {
                setCurrentCell({ r: i, c: w });
                const item = items[i - 1];

                if (item.weight <= w) {
                    const include = item.value + dp[i - 1][w - item.weight];
                    const exclude = dp[i - 1][w];
                    dp[i][w] = Math.max(include, exclude);
                    setMessage(`Checking ${item.name}: Include (${include}) vs Exclude (${exclude})`);
                } else {
                    dp[i][w] = dp[i - 1][w];
                    setMessage(`Checking ${item.name}: Too heavy (${item.weight} > ${w}), skipping.`);
                }

                // Update specific cell for animation
                setDpTable(prev => {
                    const newTable = prev.map(row => [...row]);
                    newTable[i][w] = dp[i][w];
                    return newTable;
                });

                await sleep(300);
            }
        }

        // Backtracking to find items
        setMessage('Backtracking to find selected items...');
        let w = W;
        const selected = [];
        for (let i = n; i > 0; i--) {
            if (dp[i][w] !== dp[i - 1][w]) {
                selected.push(items[i - 1].id);
                w -= items[i - 1].weight;
                setCurrentCell({ r: i, c: w + items[i - 1].weight }); // Highlight decision path
                await sleep(500);
            }
        }

        setSelectedItems(selected);
        setCurrentCell(null);
        setIsRunning(false);
        setMessage(`Max Value: ${dp[n][W]}. Items selected: ${selected.length}`);
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3">
                    <Briefcase className="text-indigo-600" size={40} />
                    0/1 Knapsack Visualizer
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Select items to maximize total value without exceeding the knapsack's weight capacity.
                </p>
            </div>

            {/* Controls */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-3">
                    <span className="text-slate-700 font-medium">Capacity:</span>
                    <input
                        type="number"
                        value={capacity}
                        onChange={(e) => setCapacity(Math.max(1, parseInt(e.target.value) || 0))}
                        disabled={isRunning}
                        className="w-20 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="h-8 w-px bg-slate-200 hidden sm:block" />

                <button
                    onClick={solveKnapsack}
                    disabled={isRunning}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                    <Play size={18} /> Solve
                </button>

                <button
                    onClick={reset}
                    disabled={isRunning}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    <RotateCcw size={18} /> Reset
                </button>
            </div>

            {/* Visualization Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* DP Table */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200 overflow-x-auto">
                    <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Calculator size={20} className="text-indigo-600" />
                        DP Table
                    </h3>
                    <div className="min-w-max">
                        <div className="grid gap-1" style={{ gridTemplateColumns: `auto repeat(${capacity + 1}, minmax(40px, 1fr))` }}>
                            {/* Header Row */}
                            <div className="font-bold text-slate-400 text-xs p-2">Item \ Cap</div>
                            {Array.from({ length: capacity + 1 }).map((_, i) => (
                                <div key={i} className="font-bold text-slate-600 text-center p-2 bg-slate-50 rounded">{i}</div>
                            ))}

                            {/* Table Body */}
                            {dpTable.map((row, rIdx) => (
                                <React.Fragment key={rIdx}>
                                    <div className="font-medium text-slate-700 p-2 flex items-center gap-2">
                                        {rIdx === 0 ? 'Base' : (
                                            <>
                                                <Package size={16} className={selectedItems.includes(items[rIdx - 1].id) ? 'text-green-500' : 'text-slate-400'} />
                                                {items[rIdx - 1].name}
                                                <span className="text-xs text-slate-400">({items[rIdx - 1].weight}kg, ${items[rIdx - 1].value})</span>
                                            </>
                                        )}
                                    </div>
                                    {row.map((val, cIdx) => (
                                        <motion.div
                                            key={`${rIdx}-${cIdx}`}
                                            initial={false}
                                            animate={{
                                                backgroundColor: currentCell?.r === rIdx && currentCell?.c === cIdx ? '#818cf8' : '#f8fafc',
                                                scale: currentCell?.r === rIdx && currentCell?.c === cIdx ? 1.1 : 1,
                                            }}
                                            className={`
                                                border border-slate-100 rounded flex items-center justify-center text-sm font-mono
                                                ${currentCell?.r === rIdx && currentCell?.c === cIdx ? 'text-white font-bold shadow-md z-10' : 'text-slate-600'}
                                            `}
                                        >
                                            {val}
                                        </motion.div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Info Panel */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-2">Status</h3>
                        <p className="text-lg font-medium text-slate-700">
                            {message}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <h3 className="font-bold text-slate-900 mb-4">Items</h3>
                        <div className="space-y-2">
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${selectedItems.includes(item.id)
                                        ? 'bg-green-50 border-green-200'
                                        : 'bg-slate-50 border-slate-100'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${selectedItems.includes(item.id) ? 'bg-green-100 text-green-600' : 'bg-white text-slate-400'}`}>
                                            <Package size={20} />
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-900">{item.name}</div>
                                            <div className="text-xs text-slate-500">{item.weight}kg</div>
                                        </div>
                                    </div>
                                    <div className="font-bold text-slate-700">${item.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
