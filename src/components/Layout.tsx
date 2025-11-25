import React from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
    activeCategory: string;
    activeAlgorithm: string;
    onSelect: (category: string, algorithm: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    activeCategory,
    activeAlgorithm,
    onSelect
}) => {
    return (
        <div className="flex h-full">
            <Sidebar
                activeCategory={activeCategory}
                activeAlgorithm={activeAlgorithm}
                onSelect={onSelect}
            />
            <main className="flex-1 overflow-y-auto bg-slate-50 p-8 ml-64">
                <div className="max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};
