import { useState } from 'react';
import { Layout } from './components/Layout';
import { DocsLayout } from './components/DocsLayout';
import { BubbleSort } from './algorithms/sorting/BubbleSort';
import { QuickSort } from './algorithms/sorting/QuickSort';
import { MergeSort } from './algorithms/sorting/MergeSort';
import { InsertionSort } from './algorithms/sorting/InsertionSort';
import { SelectionSort } from './algorithms/sorting/SelectionSort';
import { HeapSort } from './algorithms/sorting/HeapSort';
import { ShellSort } from './algorithms/sorting/ShellSort';
import { CocktailShakerSort } from './algorithms/sorting/CocktailShakerSort';
import { LinearSearch } from './algorithms/searching/LinearSearch';
import { BinarySearch } from './algorithms/searching/BinarySearch';
import { JumpSearch } from './algorithms/searching/JumpSearch';
import { InterpolationSearch } from './algorithms/searching/InterpolationSearch';
import { BFS } from './algorithms/graphs/BFS';
import { DFS } from './algorithms/graphs/DFS';
import { Dijkstra } from './algorithms/graphs/Dijkstra';
import { Prim } from './algorithms/graphs/Prim';
import { BST } from './algorithms/trees/BST';
import { TreeTraversal } from './algorithms/trees/TreeTraversal';
import { StackVisualizer } from './algorithms/datastructures/StackVisualizer';
import { QueueVisualizer } from './algorithms/datastructures/QueueVisualizer';
import { NQueensVisualizer } from './algorithms/backtracking/NQueensVisualizer';
import { KnapsackVisualizer } from './algorithms/dynamicprogramming/KnapsackVisualizer';
import { DesignPatternsLayout } from './components/DesignPatternsLayout';
import { Activity, BookOpen, Layers } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<'visualize' | 'docs' | 'patterns'>('visualize');
  const [activeCategory, setActiveCategory] = useState('sorting');
  const [activeAlgorithm, setActiveAlgorithm] = useState('Bubble Sort');

  const renderVisualizerContent = () => {
    if (activeAlgorithm === 'Bubble Sort') return <BubbleSort />;
    if (activeAlgorithm === 'Quick Sort') return <QuickSort />;
    if (activeAlgorithm === 'Merge Sort') return <MergeSort />;
    if (activeAlgorithm === 'Insertion Sort') return <InsertionSort />;
    if (activeAlgorithm === 'Selection Sort') return <SelectionSort />;
    if (activeAlgorithm === 'Heap Sort') return <HeapSort />;
    if (activeAlgorithm === 'Shell Sort') return <ShellSort />;
    if (activeAlgorithm === 'Cocktail Shaker Sort') return <CocktailShakerSort />;
    if (activeAlgorithm === 'Linear Search') return <LinearSearch />;
    if (activeAlgorithm === 'Binary Search') return <BinarySearch />;
    if (activeAlgorithm === 'Jump Search') return <JumpSearch />;
    if (activeAlgorithm === 'Interpolation Search') return <InterpolationSearch />;
    if (activeAlgorithm === 'Breadth-First Search') return <BFS />;
    if (activeAlgorithm === 'Depth-First Search') return <DFS />;
    if (activeAlgorithm === "Dijkstra's Algorithm") return <Dijkstra />;
    if (activeAlgorithm === "Prim's Algorithm") return <Prim />;
    if (activeAlgorithm === 'BST Operations') return <BST />;
    if (activeAlgorithm === 'Tree Traversals') return <TreeTraversal />;
    if (activeAlgorithm === 'Stack') return <StackVisualizer />;
    if (activeAlgorithm === 'Queue') return <QueueVisualizer />;
    if (activeAlgorithm === 'N-Queens Problem') return <NQueensVisualizer />;
    if (activeAlgorithm === '0/1 Knapsack') return <KnapsackVisualizer />;

    return (
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">{activeAlgorithm}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Visualizing {activeAlgorithm} algorithm with step-by-step animation.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-[500px] flex items-center justify-center p-8">
          <p className="text-slate-400">Visualizer for {activeAlgorithm} coming soon...</p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between shrink-0 z-20 shadow-sm relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
            <Activity className="text-white" size={20} />
          </div>
          <span className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 tracking-tight">
            Engineering Sight
          </span>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('visualize')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'visualize'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            <Activity size={16} />
            Visualize
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'docs'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            <BookOpen size={16} />
            Docs & Use Cases
          </button>
          <button
            onClick={() => setActiveTab('patterns')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'patterns'
              ? 'bg-white text-indigo-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            <Layers size={16} />
            Design Patterns
          </button>
        </div>

        <div className="w-32"></div> {/* Spacer for balance */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'visualize' ? (
          <Layout
            activeCategory={activeCategory}
            activeAlgorithm={activeAlgorithm}
            onSelect={(cat, algo) => {
              setActiveCategory(cat);
              setActiveAlgorithm(algo);
            }}
          >
            {renderVisualizerContent()}
          </Layout>
        ) : activeTab === 'docs' ? (
          <DocsLayout />
        ) : (
          <DesignPatternsLayout />
        )}
      </div>
    </div>
  );
}

export default App;
