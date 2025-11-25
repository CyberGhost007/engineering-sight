import React from 'react';
import { BrainCircuit } from 'lucide-react';

export const Navbar: React.FC = () => {
    return (
        <nav className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 flex items-center px-6">
            <div className="flex items-center gap-2 text-indigo-600">
                <BrainCircuit size={32} />
                <span className="text-xl font-bold tracking-tight">AlgoVisual</span>
            </div>
            <div className="ml-auto">
                {/* Placeholder for future controls or links */}
            </div>
        </nav>
    );
};
