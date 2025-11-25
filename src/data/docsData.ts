export interface RealWorldExample {
    app: string;
    feature: string;
    description: string;
}

export interface FeatureMapping {
    feature: string;
    algo: string;
    reason: string;
}

export interface DocItem {
    id: string;
    title: string;
    description: string;
    bestFor: string[];
    worstFor: string[];
    realWorldExamples: RealWorldExample[];
    featureMapping: FeatureMapping[];
}

export interface DocCategory {
    id: string;
    title: string;
    items: DocItem[];
}

export const docsData: DocCategory[] = [
    {
        id: 'sorting',
        title: 'Sorting Algorithms',
        items: [
            {
                id: 'quick-sort',
                title: 'Quick Sort',
                description: 'A highly efficient sorting algorithm and is based on partitioning of array of data into smaller arrays.',
                bestFor: ['Large datasets', 'General purpose sorting', 'When average case performance matters'],
                worstFor: ['Already sorted data (if pivot is poor)', 'Small datasets (Insertion sort is better)'],
                realWorldExamples: [
                    {
                        app: 'V8 Engine (Chrome)',
                        feature: 'Array.prototype.sort()',
                        description: 'Used for sorting arrays with more than 10 elements (often a hybrid with Insertion Sort).'
                    },
                    {
                        app: 'E-commerce (Amazon)',
                        feature: 'Sort by Price: Low to High',
                        description: 'Quickly ordering millions of products based on price.'
                    }
                ],
                featureMapping: [
                    {
                        feature: 'Leaderboards',
                        algo: 'Quick Sort',
                        reason: 'Fast average-case performance for ranking players.'
                    }
                ]
            },
            {
                id: 'merge-sort',
                title: 'Merge Sort',
                description: 'A stable, divide and conquer algorithm that always guarantees O(n log n) performance.',
                bestFor: ['Linked Lists', 'External Sorting (Large data on disk)', 'Stable sorting requirements'],
                worstFor: ['Memory constrained systems (requires O(n) extra space)'],
                realWorldExamples: [
                    {
                        app: 'Instagram',
                        feature: 'Feed Generation',
                        description: 'Merging sorted lists of posts from different friends/interests by timestamp.'
                    },
                    {
                        app: 'Databases (PostgreSQL)',
                        feature: 'External Merge Sort',
                        description: 'Sorting data that is too large to fit in RAM.'
                    }
                ],
                featureMapping: [
                    {
                        feature: 'Activity Logs',
                        algo: 'Merge Sort',
                        reason: 'Stable sort ensures events with same timestamp keep original order.'
                    }
                ]
            }
        ]
    },
    {
        id: 'searching',
        title: 'Searching Algorithms',
        items: [
            {
                id: 'linear-search',
                title: 'Linear Search',
                description: 'The simplest search algorithm that checks every element in the list sequentially until a match is found.',
                bestFor: ['Unsorted small lists', 'When simplicity is preferred over speed'],
                worstFor: ['Large datasets (O(n) time complexity)'],
                realWorldExamples: [
                    {
                        app: 'Simple Lists',
                        feature: 'Finding an item in an unsorted grocery list',
                        description: 'Scanning through items one by one.'
                    }
                ],
                featureMapping: [
                    {
                        feature: 'Unsorted Data Lookup',
                        algo: 'Linear Search',
                        reason: 'Only option when data cannot be sorted beforehand.'
                    }
                ]
            },
            {
                id: 'binary-search',
                title: 'Binary Search',
                description: 'Efficiently finds an item from a sorted list by repeatedly dividing the search interval in half.',
                bestFor: ['Sorted Arrays', 'Large datasets where random access is cheap'],
                worstFor: ['Unsorted data', 'Linked Lists (no random access)'],
                realWorldExamples: [
                    {
                        app: 'Database Indexing',
                        feature: 'B-Trees / Binary Search',
                        description: 'Quickly locating a record by ID in a sorted index.'
                    },
                    {
                        app: 'Git',
                        feature: 'git bisect',
                        description: 'Finding the commit that introduced a bug by searching through history.'
                    }
                ],
                featureMapping: [
                    {
                        feature: 'Autocomplete',
                        algo: 'Binary Search',
                        reason: 'Quickly finding prefix matches in a sorted dictionary.'
                    }
                ]
            },
            {
                id: 'jump-search',
                title: 'Jump Search',
                description: 'Works on sorted arrays by jumping ahead by fixed steps and then performing a linear search.',
                bestFor: ['Sorted arrays where binary search is too expensive (e.g., jumping is cheaper than random access)'],
                worstFor: ['Unsorted arrays'],
                realWorldExamples: [
                    {
                        app: 'Video Streaming',
                        feature: 'Skipping ahead',
                        description: 'Jumping through video frames to find a specific scene.'
                    }
                ],
                featureMapping: [
                    {
                        feature: 'Pagination',
                        algo: 'Jump Search',
                        reason: 'Jumping to a specific page range before scanning.'
                    }
                ]
            },
            {
                id: 'interpolation-search',
                title: 'Interpolation Search',
                description: 'An improvement over Binary Search for uniformly distributed data, estimating the position of the target.',
                bestFor: ['Uniformly distributed sorted data (e.g., phone book)'],
                worstFor: ['Data with large outliers or non-uniform distribution'],
                realWorldExamples: [
                    {
                        app: 'Phone Book',
                        feature: 'Finding a Name',
                        description: 'Estimating where a name starts based on the letter (e.g., "Z" is at the end).'
                    }
                ],
                featureMapping: [
                    {
                        feature: 'Log Analysis',
                        algo: 'Interpolation Search',
                        reason: 'Finding a timestamp in evenly distributed log files.'
                    }
                ]
            }
        ]
    },
    {
        id: 'graphs',
        title: 'Graph Algorithms',
        items: [
            {
                id: 'bfs',
                title: 'Breadth-First Search (BFS)',
                description: 'Explores a graph layer by layer, visiting all neighbors before moving deeper.',
                bestFor: ['Shortest path in unweighted graphs', 'Social network connections', 'Web crawling'],
                worstFor: ['Pathfinding in weighted graphs (use Dijkstra)', 'Deep recursion (use DFS)'],
                realWorldExamples: [
                    {
                        app: 'Social Networks',
                        feature: 'Friend Suggestions',
                        description: 'Finding friends of friends (2nd degree connections).'
                    },
                    {
                        app: 'GPS',
                        feature: 'Nearby Places',
                        description: 'Finding all locations within a certain radius.'
                    }
                ],
                featureMapping: [
                    {
                        feature: 'Shortest Path (Unweighted)',
                        algo: 'BFS',
                        reason: 'Guarantees the shortest path in terms of number of edges.'
                    }
                ]
            },
            {
                id: 'dfs',
                title: 'Depth-First Search (DFS)',
                description: 'Explores as far as possible along each branch before backtracking.',
                bestFor: ['Maze solving', 'Topological sorting', 'Detecting cycles'],
                worstFor: ['Shortest path finding', 'Infinite graphs'],
                realWorldExamples: [
                    {
                        app: 'Maze Solver',
                        feature: 'Pathfinding',
                        description: 'Exploring one path until it hits a dead end, then backtracking.'
                    },
                    {
                        app: 'Compilers',
                        feature: 'Dependency Resolution',
                        description: 'Determining the order of compilation for dependent files.'
                    }
                ],
                featureMapping: [
                    {
                        feature: 'Cycle Detection',
                        algo: 'DFS',
                        reason: 'Efficiently tracks back edges to find cycles.'
                    }
                ]
            },
            {
                id: 'dijkstra',
                title: "Dijkstra's Algorithm",
                description: 'Finds the shortest path between nodes in a graph with non-negative edge weights.',
                bestFor: ['Maps', 'Network Routing', 'Pathfinding'],
                worstFor: ['Graphs with negative edge weights'],
                realWorldExamples: [
                    {
                        app: 'Google Maps',
                        feature: 'Navigation',
                        description: 'Calculating the shortest/fastest route from A to B.'
                    },
                    {
                        app: 'Computer Networks',
                        feature: 'OSPF Protocol',
                        description: 'Routing IP packets via the shortest path.'
                    }
                ],
                featureMapping: [
                    {
                        feature: 'Route Optimization',
                        algo: 'Dijkstra',
                        reason: 'Finds the optimal path considering distance/cost.'
                    }
                ]
            },
            {
                id: 'prim',
                title: "Prim's Algorithm",
                description: 'Finds a Minimum Spanning Tree (MST) for a weighted undirected graph.',
                bestFor: ['Network design', 'Laying cables/pipes with minimum cost'],
                worstFor: ['Directed graphs'],
                realWorldExamples: [
                    {
                        app: 'Telecommunications',
                        feature: 'Cable Layout',
                        description: 'Connecting all cities with the least amount of cable.'
                    }
                ],
                featureMapping: [
                    {
                        feature: 'Network Infrastructure',
                        algo: "Prim's",
                        reason: 'Minimizes total cost to connect all nodes.'
                    }
                ]
            }
        ]
    },
    {
        id: 'trees',
        title: 'Tree Algorithms',
        items: [
            {
                id: 'bst',
                title: 'Binary Search Tree (BST)',
                description: 'A tree data structure where each node has at most two children, with left < parent < right.',
                bestFor: ['Dynamic sorted data', 'Lookup tables'],
                worstFor: ['Static data (Arrays are better)', 'Unbalanced trees (degrades to Linked List)'],
                realWorldExamples: [
                    {
                        app: 'Databases',
                        feature: 'Indexing',
                        description: 'Organizing data for O(log n) search, insert, and delete.'
                    }
                ],
                featureMapping: [
                    {
                        feature: 'Symbol Tables',
                        algo: 'BST',
                        reason: 'Efficiently stores key-value pairs in compilers.'
                    }
                ]
            },
            {
                id: 'traversals',
                title: 'Tree Traversals',
                description: 'Methods for visiting every node in a tree: Inorder, Preorder, Postorder.',
                bestFor: ['Processing hierarchical data', 'Copying/Deleting trees'],
                worstFor: ['Linear data structures'],
                realWorldExamples: [
                    {
                        app: 'File System',
                        feature: 'Directory Size',
                        description: 'Postorder traversal to calculate total size of a folder (children first).'
                    },
                    {
                        app: 'DOM',
                        feature: 'Rendering',
                        description: 'Preorder traversal to render HTML elements.'
                    }
                ],
                featureMapping: [
                    {
                        feature: 'Expression Evaluation',
                        algo: 'Postorder Traversal',
                        reason: 'Evaluates mathematical expressions in syntax trees.'
                    }
                ]
            }
        ]
    }
];
