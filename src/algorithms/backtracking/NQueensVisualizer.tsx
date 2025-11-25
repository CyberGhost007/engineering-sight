import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Crown, Grid3X3, Pause } from 'lucide-react';

type BoardState = number[][]; // 0: empty, 1: queen, 2: conflict/checking

export const NQueensVisualizer: React.FC = () => {
    const [n, setN] = useState(4);
    const [board, setBoard] = useState<BoardState>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [speed, setSpeed] = useState(500);
    const [message, setMessage] = useState('Select board size and click Start.');
    const [solutionCount, setSolutionCount] = useState(0);

    // Refs to control the loop
    const stopRef = useRef(false);
    const speedRef = useRef(speed);

    useEffect(() => {
        speedRef.current = speed;
    }, [speed]);

    useEffect(() => {
        resetBoard();
    }, [n]);

    const resetBoard = () => {
        stopRef.current = true;
        setIsRunning(false);
        const newBoard = Array(n).fill(0).map(() => Array(n).fill(0));
        setBoard(newBoard);
        setMessage(`Ready to solve ${n}-Queens.`);
        setSolutionCount(0);
    };

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const isSafe = (board: BoardState, row: number, col: number) => {
        // Check this row on left side
        for (let i = 0; i < col; i++) {
            if (board[row][i] === 1) return false;
        }

        // Check upper diagonal on left side
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 1) return false;
        }

        // Check lower diagonal on left side
        for (let i = row, j = col; j >= 0 && i < n; i++, j--) {
            if (board[i][j] === 1) return false;
        }

        return true;
    };

    const solveNQueens = async (col: number) => {
        if (stopRef.current) return false;

        if (col >= n) {
            setSolutionCount(prev => prev + 1);
            setMessage(`Found a solution! Total: ${solutionCount + 1}`);
            await sleep(speedRef.current * 2);
            return true; // Return true to stop after first solution, or false to find all
        }

        for (let i = 0; i < n; i++) {
            if (stopRef.current) return false;

            // Visualize checking
            setBoard(prev => {
                const newBoard = prev.map(row => [...row]);
                newBoard[i][col] = 2; // Checking
                return newBoard;
            });
            await sleep(speedRef.current / 2);

            if (isSafe(board, i, col)) {
                // Place Queen
                setBoard(prev => {
                    const newBoard = prev.map(row => [...row]);
                    newBoard[i][col] = 1; // Queen
                    return newBoard;
                });
                setMessage(`Placed Queen at (${i}, ${col})`);
                await sleep(speedRef.current);

                if (await solveNQueens(col + 1)) return true;

                // Backtrack
                if (stopRef.current) return false;
                setBoard(prev => {
                    const newBoard = prev.map(row => [...row]);
                    newBoard[i][col] = 0; // Remove
                    return newBoard;
                });
                setMessage(`Backtracking from (${i}, ${col})`);
                await sleep(speedRef.current);
            } else {
                // Conflict found
                setBoard(prev => {
                    const newBoard = prev.map(row => [...row]);
                    newBoard[i][col] = 0; // Reset checking
                    return newBoard;
                });
            }
        }
        return false;
    };

    const handleStart = async () => {
        if (isRunning) {
            stopRef.current = true;
            setIsRunning(false);
            return;
        }

        // Reset board but keep N
        const newBoard = Array(n).fill(0).map(() => Array(n).fill(0));
        setBoard(newBoard);
        setSolutionCount(0);

        stopRef.current = false;
        setIsRunning(true);
        setMessage('Starting N-Queens Solver...');

        await solveNQueens(0);

        if (!stopRef.current) {
            setIsRunning(false);
            setMessage(solutionCount > 0 ? `Finished! Found solution.` : 'No solution found.');
        }
    };

    return (
        <div className="space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center justify-center gap-3">
                    <Crown className="text-indigo-600" size={40} />
                    N-Queens Visualizer
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    The N-Queens puzzle is the problem of placing N chess queens on an N×N chessboard so that no two queens threaten each other.
                </p>
            </div>

            {/* Controls */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-center gap-6">
                <div className="flex items-center gap-3">
                    <Grid3X3 className="text-slate-500" size={20} />
                    <span className="text-slate-700 font-medium">Board Size (N):</span>
                    <select
                        value={n}
                        onChange={(e) => setN(parseInt(e.target.value))}
                        disabled={isRunning}
                        className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                        {[4, 5, 6, 7, 8].map(size => (
                            <option key={size} value={size}>{size} x {size}</option>
                        ))}
                    </select>
                </div>

                <div className="h-8 w-px bg-slate-200 hidden sm:block" />

                <div className="flex items-center gap-3">
                    <span className="text-slate-700 font-medium">Speed:</span>
                    <input
                        type="range"
                        min="50"
                        max="1000"
                        step="50"
                        value={1050 - speed} // Invert so right is faster
                        onChange={(e) => setSpeed(1050 - parseInt(e.target.value))}
                        className="w-32 accent-indigo-600"
                    />
                </div>

                <div className="h-8 w-px bg-slate-200 hidden sm:block" />

                <button
                    onClick={handleStart}
                    className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${isRunning
                        ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                        }`}
                >
                    {isRunning ? <><Pause size={18} /> Stop</> : <><Play size={18} /> Start Solving</>}
                </button>

                <button
                    onClick={resetBoard}
                    disabled={isRunning}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                    <RotateCcw size={18} /> Reset
                </button>
            </div>

            {/* Visualization Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Board Container */}
                <div className="lg:col-span-2 bg-slate-900 rounded-2xl p-8 min-h-[500px] flex flex-col items-center justify-center">
                    <div className="relative bg-white p-1 rounded shadow-2xl">
                        <div
                            className="grid gap-0.5 bg-slate-800 border-2 border-slate-800"
                            style={{
                                gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
                                width: 'min(100%, 500px)',
                                aspectRatio: '1/1'
                            }}
                        >
                            {board.map((row, rIdx) => (
                                row.map((cell, cIdx) => {
                                    const isBlack = (rIdx + cIdx) % 2 === 1;
                                    return (
                                        <div
                                            key={`${rIdx}-${cIdx}`}
                                            className={`
                                                relative flex items-center justify-center
                                                ${isBlack ? 'bg-slate-400' : 'bg-slate-200'}
                                                ${cell === 2 ? 'ring-inset ring-4 ring-rose-400' : ''} // Checking highlight
                                            `}
                                        >
                                            <AnimatePresence>
                                                {cell === 1 && (
                                                    <motion.div
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                    >
                                                        <Crown size={32} className="text-indigo-900 drop-shadow-lg" fill="currentColor" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>

                                            {/* Coordinate labels for first row/col */}
                                            {cIdx === 0 && (
                                                <span className="absolute left-1 top-1 text-[10px] text-slate-500 font-mono opacity-50">{rIdx}</span>
                                            )}
                                            {rIdx === n - 1 && (
                                                <span className="absolute right-1 bottom-1 text-[10px] text-slate-500 font-mono opacity-50">{cIdx}</span>
                                            )}
                                        </div>
                                    );
                                })
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
                        <h3 className="font-bold text-slate-900 mb-4">Algorithm Details</h3>
                        <div className="space-y-3 text-sm text-slate-600">
                            <p>
                                <strong className="text-slate-900">Backtracking:</strong> The algorithm places a queen in a column, checks if it's safe, and recursively tries to place queens in subsequent columns.
                            </p>
                            <p>
                                <strong className="text-slate-900">Pruning:</strong> If a placement leads to no solution, the algorithm "backtracks" (removes the queen) and tries the next row.
                            </p>
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <div className="flex justify-between">
                                    <span>Time Complexity</span>
                                    <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">O(N!)</span>
                                </div>
                                <div className="flex justify-between mt-2">
                                    <span>Space Complexity</span>
                                    <span className="font-mono text-indigo-600 bg-indigo-50 px-2 py-1 rounded">O(N)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
