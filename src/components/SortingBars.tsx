import React from 'react';
import { motion } from 'framer-motion';

interface SortingBarsProps {
    array: number[];
    comparing: number[];
    swapping: number[];
    sorted: number[];
}

export const SortingBars: React.FC<SortingBarsProps> = ({ array, comparing, swapping, sorted }) => {
    const maxValue = Math.max(...array, 100);

    return (
        <div className="flex items-end justify-center gap-1 h-full w-full px-4">
            {array.map((value, index) => {
                let colorClass = 'bg-indigo-400';

                if (sorted.includes(index)) {
                    colorClass = 'bg-green-500';
                } else if (swapping.includes(index)) {
                    colorClass = 'bg-amber-500';
                } else if (comparing.includes(index)) {
                    colorClass = 'bg-blue-500';
                }

                const heightPercentage = (value / maxValue) * 100;

                return (
                    <motion.div
                        key={index}
                        layout
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPercentage}%` }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`w-4 sm:w-6 md:w-8 rounded-t-md shadow-sm transition-colors duration-200 ${colorClass} relative group`}
                    >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs px-2 py-1 rounded pointer-events-none">
                            {value}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};
