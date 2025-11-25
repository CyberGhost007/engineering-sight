import React from 'react';
import { Play, Pause, RotateCcw, FastForward } from 'lucide-react';

interface VisualizerContainerProps {
    title: string;
    children: React.ReactNode;
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
    onReset: () => void;
    onStepForward?: () => void;
    speed: number;
    onSpeedChange: (speed: number) => void;
    isSorted?: boolean;
}

export const VisualizerContainer: React.FC<VisualizerContainerProps> = ({
    title,
    children,
    isPlaying,
    onPlay,
    onPause,
    onReset,
    onStepForward,
    speed,
    onSpeedChange,
    isSorted
}) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h2 className="font-bold text-slate-700">{title}</h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Speed</span>
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={speed}
                            onChange={(e) => onSpeedChange(Number(e.target.value))}
                            className="w-24 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 p-8 bg-slate-50 relative min-h-[400px] flex items-center justify-center overflow-hidden">
                {children}

                {isSorted && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                        <div className="bg-green-100 text-green-700 px-6 py-3 rounded-full font-bold text-lg shadow-lg animate-bounce">
                            🎉 Sorted!
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-center gap-4">
                <button
                    onClick={onReset}
                    className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                    title="Reset"
                >
                    <RotateCcw size={20} />
                </button>

                <button
                    onClick={isPlaying ? onPause : onPlay}
                    className={`w-12 h-12 flex items-center justify-center rounded-full text-white shadow-md transition-all transform hover:scale-105 active:scale-95 ${isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-indigo-600 hover:bg-indigo-700'
                        }`}
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                </button>

                {onStepForward && (
                    <button
                        onClick={onStepForward}
                        disabled={isPlaying}
                        className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50"
                        title="Step Forward"
                    >
                        <FastForward size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};
