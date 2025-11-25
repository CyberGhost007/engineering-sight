import React, { useState } from 'react';
import { DocsSidebar } from './DocsSidebar';
import { DocsContent } from './DocsContent';
import { docsData } from '../data/docsData';
import type { DocItem } from '../data/docsData';

export const DocsLayout: React.FC = () => {
    const [activeItem, setActiveItem] = useState<DocItem | null>(docsData[0].items[0]);

    return (
        <div className="flex h-full bg-slate-50">
            <DocsSidebar
                categories={docsData}
                activeItem={activeItem}
                onSelect={setActiveItem}
            />
            <DocsContent item={activeItem} />
        </div>
    );
};
