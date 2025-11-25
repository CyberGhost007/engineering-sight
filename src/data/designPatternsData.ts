import { Smartphone, Globe, Server } from 'lucide-react';

export interface DiagramNode {
    id: string;
    label: string;
    type: 'component' | 'database' | 'user' | 'server' | 'mobile' | 'web';
    x: number;
    y: number;
}

export interface DiagramEdge {
    source: string;
    target: string;
    label?: string;
}

export interface PatternItem {
    id: string;
    title: string;
    description: string;
    useCase: string;
    pros: string[];
    cons: string[];
    visualDescription: string;
    folderStructure: string;
    diagramData: {
        nodes: DiagramNode[];
        edges: DiagramEdge[];
    };
}

export interface PatternCategory {
    id: string;
    title: string;
    icon: any;
    patterns: PatternItem[];
}

export const designPatternsData: PatternCategory[] = [
    {
        id: 'mobile',
        title: 'Mobile Patterns',
        icon: Smartphone,
        patterns: [
            {
                id: 'mvvm',
                title: 'MVVM (Model-View-ViewModel)',
                description: 'Separates the user interface (View) from the business logic and data (Model) using a ViewModel as an intermediary.',
                useCase: 'Complex UI screens with dynamic data (e.g., Social Media Feed).',
                pros: ['Separation of concerns', 'Testability', 'Data binding support'],
                cons: ['Overhead for simple screens', 'Learning curve'],
                visualDescription: 'Diagram showing View binding to ViewModel, which interacts with Model.',
                folderStructure: `src/
  ├── models/
  │   └── User.kt
  ├── views/
  │   └── UserProfileActivity.kt
  └── viewmodels/
      └── UserProfileViewModel.kt`,
                diagramData: {
                    nodes: [
                        { id: 'view', label: 'View', type: 'mobile', x: 50, y: 100 },
                        { id: 'vm', label: 'ViewModel', type: 'component', x: 250, y: 100 },
                        { id: 'model', label: 'Model', type: 'database', x: 450, y: 100 }
                    ],
                    edges: [
                        { source: 'view', target: 'vm', label: 'Observes' },
                        { source: 'vm', target: 'model', label: 'Requests Data' }
                    ]
                }
            },
            {
                id: 'singleton',
                title: 'Singleton',
                description: 'Ensures a class has only one instance and provides a global point of access to it.',
                useCase: 'Database connections, Network managers, Configuration settings.',
                pros: ['Controlled access to sole instance', 'Reduced namespace pollution'],
                cons: ['Global state can be hard to test', 'Concurrency issues if not handled correctly'],
                visualDescription: 'Single object instance being accessed by multiple clients.',
                folderStructure: `src/
  └── utils/
      └── DatabaseConnection.java`,
                diagramData: {
                    nodes: [
                        { id: 'client1', label: 'Client A', type: 'component', x: 50, y: 50 },
                        { id: 'client2', label: 'Client B', type: 'component', x: 50, y: 150 },
                        { id: 'instance', label: 'Singleton Instance', type: 'server', x: 300, y: 100 }
                    ],
                    edges: [
                        { source: 'client1', target: 'instance', label: 'getInstance()' },
                        { source: 'client2', target: 'instance', label: 'getInstance()' }
                    ]
                }
            },
            {
                id: 'builder',
                title: 'Builder Pattern',
                description: 'Constructs complex objects step by step. Allows producing different types and representations of an object using the same construction code.',
                useCase: 'Creating complex UI configurations or API requests.',
                pros: ['Clear separation of construction and representation', 'Better control over construction process'],
                cons: ['Requires creating a separate ConcreteBuilder for each type of product'],
                visualDescription: 'Assembly line constructing an object piece by piece.',
                folderStructure: `src/
  ├── product/
  │   └── Pizza.java
  └── builder/
      ├── PizzaBuilder.java
      └── SpicyPizzaBuilder.java`,
                diagramData: {
                    nodes: [
                        { id: 'director', label: 'Director', type: 'user', x: 50, y: 100 },
                        { id: 'builder', label: 'Builder', type: 'component', x: 250, y: 100 },
                        { id: 'product', label: 'Product', type: 'component', x: 450, y: 100 }
                    ],
                    edges: [
                        { source: 'director', target: 'builder', label: 'Constructs' },
                        { source: 'builder', target: 'product', label: 'Builds' }
                    ]
                }
            },
            {
                id: 'factory-method',
                title: 'Factory Method',
                description: 'Defines an interface for creating an object, but lets subclasses decide which class to instantiate.',
                useCase: 'Dependency Injection, Cross-platform UI components.',
                pros: ['Decoupling', 'Flexibility', 'Single Responsibility Principle'],
                cons: ['Can lead to many subclasses', 'Code complexity'],
                visualDescription: 'Factory producing different types of products based on input.',
                folderStructure: `src/
  ├── factory/
  │   ├── DialogFactory.java
  │   ├── WindowsDialog.java
  │   └── WebDialog.java
  └── Main.java`,
                diagramData: {
                    nodes: [
                        { id: 'creator', label: 'Creator', type: 'component', x: 50, y: 100 },
                        { id: 'productA', label: 'Product A', type: 'component', x: 300, y: 50 },
                        { id: 'productB', label: 'Product B', type: 'component', x: 300, y: 150 }
                    ],
                    edges: [
                        { source: 'creator', target: 'productA', label: 'Creates' },
                        { source: 'creator', target: 'productB', label: 'Creates' }
                    ]
                }
            },
            {
                id: 'adapter',
                title: 'Adapter Pattern',
                description: 'Allows objects with incompatible interfaces to collaborate.',
                useCase: 'Integrating legacy code or 3rd party libraries.',
                pros: ['Reusability', 'Flexibility', 'Single Responsibility Principle'],
                cons: ['Complexity due to new interfaces and classes'],
                visualDescription: 'Plug adapter connecting a square peg to a round hole.',
                folderStructure: `src/
  ├── legacy/
  │   └── OldPaymentSystem.java
  ├── adapter/
  │   └── PaymentAdapter.java
  └── client/
      └── Checkout.java`,
                diagramData: {
                    nodes: [
                        { id: 'client', label: 'Client', type: 'user', x: 50, y: 100 },
                        { id: 'adapter', label: 'Adapter', type: 'component', x: 250, y: 100 },
                        { id: 'adaptee', label: 'Adaptee', type: 'server', x: 450, y: 100 }
                    ],
                    edges: [
                        { source: 'client', target: 'adapter', label: 'Uses' },
                        { source: 'adapter', target: 'adaptee', label: 'Translates' }
                    ]
                }
            },
            {
                id: 'clean-architecture',
                title: 'Clean Architecture',
                description: 'Separates software into layers (Entities, Use Cases, Interface Adapters, Frameworks) with dependency rule pointing inwards.',
                useCase: 'Large-scale mobile apps requiring maintainability and testability.',
                pros: ['Independence of Frameworks', 'Testable', 'Independent of UI'],
                cons: ['Steep learning curve', 'Boilerplate code'],
                visualDescription: 'Concentric circles with dependencies pointing inwards.',
                folderStructure: `src/
  ├── domain/ (Entities, Use Cases)
  ├── data/ (Repositories, API)
  └── presentation/ (ViewModels, UI)`,
                diagramData: {
                    nodes: [
                        { id: 'ui', label: 'UI / Web', type: 'web', x: 50, y: 100 },
                        { id: 'presenters', label: 'Presenters', type: 'component', x: 200, y: 100 },
                        { id: 'usecases', label: 'Use Cases', type: 'component', x: 350, y: 100 },
                        { id: 'entities', label: 'Entities', type: 'database', x: 500, y: 100 }
                    ],
                    edges: [
                        { source: 'ui', target: 'presenters', label: 'Depends' },
                        { source: 'presenters', target: 'usecases', label: 'Depends' },
                        { source: 'usecases', target: 'entities', label: 'Depends' }
                    ]
                }
            }
        ]
    },
    {
        id: 'web',
        title: 'Web Patterns',
        icon: Globe,
        patterns: [
            {
                id: 'mvc',
                title: 'MVC (Model-View-Controller)',
                description: 'Divides the application into three interconnected parts: Model (data), View (UI), and Controller (logic).',
                useCase: 'Traditional web applications (e.g., Ruby on Rails, Django apps).',
                pros: ['Simultaneous development', 'High cohesion', 'Multiple views for a model'],
                cons: ['Code navigation can be complex', 'View and Controller are tightly coupled'],
                visualDescription: 'User interacts with Controller, which updates Model, which updates View.',
                folderStructure: `app/
  ├── controllers/
  │   └── UserController.rb
  ├── models/
  │   └── User.rb
  └── views/
      └── user/
          └── index.html.erb`,
                diagramData: {
                    nodes: [
                        { id: 'user', label: 'User', type: 'user', x: 50, y: 50 },
                        { id: 'controller', label: 'Controller', type: 'component', x: 200, y: 50 },
                        { id: 'model', label: 'Model', type: 'database', x: 350, y: 150 },
                        { id: 'view', label: 'View', type: 'web', x: 200, y: 150 }
                    ],
                    edges: [
                        { source: 'user', target: 'controller', label: 'Uses' },
                        { source: 'controller', target: 'model', label: 'Updates' },
                        { source: 'model', target: 'view', label: 'Updates' },
                        { source: 'view', target: 'user', label: 'Sees' }
                    ]
                }
            },
            {
                id: 'flux',
                title: 'Flux / Redux',
                description: 'Unidirectional data flow architecture. View triggers Action, Action goes to Dispatcher, Dispatcher updates Store, Store updates View.',
                useCase: 'Complex Single Page Applications (SPAs) with shared state (e.g., React apps).',
                pros: ['Predictable state updates', 'Easier debugging (Time travel)', 'Centralized state'],
                cons: ['Boilerplate code', 'Complexity for small apps'],
                visualDescription: 'Circular flow: Action -> Dispatcher -> Store -> View -> Action.',
                folderStructure: `src/
  ├── actions/
  ├── reducers/
  ├── store/
  └── components/`,
                diagramData: {
                    nodes: [
                        { id: 'action', label: 'Action', type: 'component', x: 50, y: 50 },
                        { id: 'dispatcher', label: 'Dispatcher', type: 'component', x: 250, y: 50 },
                        { id: 'store', label: 'Store', type: 'database', x: 450, y: 150 },
                        { id: 'view', label: 'View', type: 'web', x: 250, y: 150 }
                    ],
                    edges: [
                        { source: 'action', target: 'dispatcher', label: 'Dispatches' },
                        { source: 'dispatcher', target: 'store', label: 'Updates' },
                        { source: 'store', target: 'view', label: 'Notifies' },
                        { source: 'view', target: 'action', label: 'Triggers' }
                    ]
                }
            },
            {
                id: 'micro-frontends',
                title: 'Micro-Frontends',
                description: 'Architectural style where independently deliverable frontend applications are composed into a greater whole.',
                useCase: 'Large scale web apps with multiple teams working on different features.',
                pros: ['Independent deployment', 'Technology agnostic', 'Scalable teams'],
                cons: ['Complexity in integration', 'Performance overhead', 'Consistent styling challenges'],
                visualDescription: 'Main container app hosting multiple smaller sub-apps.',
                folderStructure: `packages/
  ├── container-app/
  ├── product-app/
  └── checkout-app/`,
                diagramData: {
                    nodes: [
                        { id: 'container', label: 'Container', type: 'web', x: 250, y: 50 },
                        { id: 'app1', label: 'App A', type: 'component', x: 100, y: 150 },
                        { id: 'app2', label: 'App B', type: 'component', x: 250, y: 150 },
                        { id: 'app3', label: 'App C', type: 'component', x: 400, y: 150 }
                    ],
                    edges: [
                        { source: 'container', target: 'app1', label: 'Loads' },
                        { source: 'container', target: 'app2', label: 'Loads' },
                        { source: 'container', target: 'app3', label: 'Loads' }
                    ]
                }
            },
            {
                id: 'observer',
                title: 'Observer Pattern',
                description: 'Defines a subscription mechanism to notify multiple objects about any events that happen to the object they\'re observing.',
                useCase: 'Event handling, DOM events, State management updates.',
                pros: ['Open/Closed Principle', 'Runtime relationships'],
                cons: ['Memory leaks if not unsubscribed', 'Update order not guaranteed'],
                visualDescription: 'Subject notifying multiple Observers of a state change.',
                folderStructure: `src/
  ├── observers/
  │   ├── EmailNotifier.ts
  │   └── Logger.ts
  └── subject/
      └── EventManager.ts`,
                diagramData: {
                    nodes: [
                        { id: 'subject', label: 'Subject', type: 'component', x: 100, y: 100 },
                        { id: 'obs1', label: 'Observer A', type: 'user', x: 350, y: 50 },
                        { id: 'obs2', label: 'Observer B', type: 'user', x: 350, y: 150 }
                    ],
                    edges: [
                        { source: 'subject', target: 'obs1', label: 'Notifies' },
                        { source: 'subject', target: 'obs2', label: 'Notifies' }
                    ]
                }
            },
            {
                id: 'module',
                title: 'Module Pattern',
                description: 'Encapsulates "private" and "public" methods and variables, protecting pieces from the global scope.',
                useCase: 'Structuring JavaScript code, creating libraries.',
                pros: ['Cleaner global namespace', 'Encapsulation'],
                cons: ['Private methods are harder to unit test', 'Harder to extend'],
                visualDescription: 'Public interface exposing access to private internal logic.',
                folderStructure: `src/
  └── modules/
      └── Calculator.js`,
                diagramData: {
                    nodes: [
                        { id: 'public', label: 'Public API', type: 'web', x: 100, y: 100 },
                        { id: 'private', label: 'Private Logic', type: 'component', x: 350, y: 100 }
                    ],
                    edges: [
                        { source: 'public', target: 'private', label: 'Accesses' }
                    ]
                }
            },
            {
                id: 'bff',
                title: 'Backend for Frontend (BFF)',
                description: 'Creates separate backend services to be consumed by specific frontend applications or interfaces.',
                useCase: 'Optimizing APIs for different clients (Mobile vs Web).',
                pros: ['Optimized performance', 'Decoupling', 'Team autonomy'],
                cons: ['Code duplication', 'Maintenance overhead'],
                visualDescription: 'Specific API Gateway for Web, another for Mobile.',
                folderStructure: `services/
  ├── web-bff/
  ├── mobile-bff/
  └── core-api/`,
                diagramData: {
                    nodes: [
                        { id: 'web', label: 'Web App', type: 'web', x: 50, y: 50 },
                        { id: 'mobile', label: 'Mobile App', type: 'mobile', x: 50, y: 150 },
                        { id: 'webBff', label: 'Web BFF', type: 'server', x: 250, y: 50 },
                        { id: 'mobileBff', label: 'Mobile BFF', type: 'server', x: 250, y: 150 },
                        { id: 'service', label: 'Core Service', type: 'database', x: 450, y: 100 }
                    ],
                    edges: [
                        { source: 'web', target: 'webBff', label: 'Calls' },
                        { source: 'mobile', target: 'mobileBff', label: 'Calls' },
                        { source: 'webBff', target: 'service', label: 'Proxies' },
                        { source: 'mobileBff', target: 'service', label: 'Proxies' }
                    ]
                }
            }
        ]
    },
    {
        id: 'backend',
        title: 'Backend Patterns',
        icon: Server,
        patterns: [
            {
                id: 'microservices',
                title: 'Microservices',
                description: 'Structuring an application as a collection of loosely coupled services.',
                useCase: 'Large, complex applications requiring high scalability and independent deployment.',
                pros: ['Scalability', 'Fault isolation', 'Tech stack flexibility'],
                cons: ['Complexity in deployment', 'Data consistency challenges', 'Network latency'],
                visualDescription: 'Multiple small services communicating via API Gateway.',
                folderStructure: `services/
  ├── order-service/
  ├── user-service/
  └── payment-service/`,
                diagramData: {
                    nodes: [
                        { id: 'gateway', label: 'API Gateway', type: 'server', x: 100, y: 100 },
                        { id: 'svc1', label: 'Service A', type: 'component', x: 300, y: 50 },
                        { id: 'svc2', label: 'Service B', type: 'component', x: 300, y: 150 }
                    ],
                    edges: [
                        { source: 'gateway', target: 'svc1', label: 'Routes' },
                        { source: 'gateway', target: 'svc2', label: 'Routes' }
                    ]
                }
            },
            {
                id: 'cqrs',
                title: 'CQRS (Command Query Responsibility Segregation)',
                description: 'Separates read and write operations for a data store.',
                useCase: 'Systems with high read/write disparity or complex domain logic.',
                pros: ['Optimized read/write performance', 'Scalability', 'Security'],
                cons: ['Increased complexity', 'Eventual consistency'],
                visualDescription: 'Separate models and databases for Reading and Writing data.',
                folderStructure: `src/
  ├── commands/ (Write)
  ├── queries/ (Read)
  └── domain/`,
                diagramData: {
                    nodes: [
                        { id: 'ui', label: 'UI', type: 'web', x: 50, y: 100 },
                        { id: 'command', label: 'Command', type: 'component', x: 200, y: 50 },
                        { id: 'query', label: 'Query', type: 'component', x: 200, y: 150 },
                        { id: 'writeDb', label: 'Write DB', type: 'database', x: 400, y: 50 },
                        { id: 'readDb', label: 'Read DB', type: 'database', x: 400, y: 150 }
                    ],
                    edges: [
                        { source: 'ui', target: 'command', label: 'Writes' },
                        { source: 'ui', target: 'query', label: 'Reads' },
                        { source: 'command', target: 'writeDb', label: 'Updates' },
                        { source: 'query', target: 'readDb', label: 'Fetches' },
                        { source: 'writeDb', target: 'readDb', label: 'Syncs' }
                    ]
                }
            },
            {
                id: 'repository',
                title: 'Repository Pattern',
                description: 'Mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects.',
                useCase: 'Decoupling business logic from data access logic.',
                pros: ['Decoupling', 'Testability', 'Centralized data access logic'],
                cons: ['Additional layer of abstraction', 'Performance overhead if not careful'],
                visualDescription: 'Business Logic -> Repository Interface -> Data Source.',
                folderStructure: `src/
  ├── domain/
  ├── repositories/
  │   ├── IUserRepository.ts
  │   └── UserRepository.ts
  └── data/`,
                diagramData: {
                    nodes: [
                        { id: 'logic', label: 'Business Logic', type: 'component', x: 50, y: 100 },
                        { id: 'repo', label: 'Repository', type: 'component', x: 250, y: 100 },
                        { id: 'db', label: 'Database', type: 'database', x: 450, y: 100 }
                    ],
                    edges: [
                        { source: 'logic', target: 'repo', label: 'Calls' },
                        { source: 'repo', target: 'db', label: 'Queries' }
                    ]
                }
            },
            {
                id: 'circuit-breaker',
                title: 'Circuit Breaker',
                description: 'Prevents an application from repeatedly trying to execute an operation that\'s likely to fail.',
                useCase: 'Microservices communication, External API calls.',
                pros: ['Fault tolerance', 'Prevents cascading failures', 'Fail fast'],
                cons: ['Testing complexity', 'Requires monitoring'],
                visualDescription: 'Switch that opens (stops flow) when too many errors occur.',
                folderStructure: `src/
  └── resilience/
      └── CircuitBreaker.ts`,
                diagramData: {
                    nodes: [
                        { id: 'client', label: 'Client', type: 'component', x: 50, y: 100 },
                        { id: 'breaker', label: 'Circuit Breaker', type: 'component', x: 250, y: 100 },
                        { id: 'service', label: 'Service', type: 'server', x: 450, y: 100 }
                    ],
                    edges: [
                        { source: 'client', target: 'breaker', label: 'Calls' },
                        { source: 'breaker', target: 'service', label: 'Proxies' }
                    ]
                }
            },
            {
                id: 'saga',
                title: 'Saga Pattern',
                description: 'Manages data consistency across microservices in distributed transaction scenarios.',
                useCase: 'Distributed transactions (e.g., Order -> Payment -> Inventory).',
                pros: ['Data consistency', 'Rollback capabilities'],
                cons: ['Complex implementation', 'Hard to debug'],
                visualDescription: 'Sequence of local transactions with compensating actions.',
                folderStructure: `src/
  ├── saga/
  │   └── OrderSaga.ts
  └── events/`,
                diagramData: {
                    nodes: [
                        { id: 'orch', label: 'Orchestrator', type: 'component', x: 250, y: 50 },
                        { id: 'svc1', label: 'Order Svc', type: 'server', x: 100, y: 150 },
                        { id: 'svc2', label: 'Payment Svc', type: 'server', x: 400, y: 150 }
                    ],
                    edges: [
                        { source: 'orch', target: 'svc1', label: 'Step 1' },
                        { source: 'orch', target: 'svc2', label: 'Step 2' }
                    ]
                }
            },
            {
                id: 'strangler-fig',
                title: 'Strangler Fig Pattern',
                description: 'Incrementally migrates a legacy system by gradually replacing specific pieces of functionality with new applications and services.',
                useCase: 'Migrating Monolith to Microservices.',
                pros: ['Low risk migration', 'Incremental value delivery'],
                cons: ['Complexity of running two systems', 'Routing logic overhead'],
                visualDescription: 'New system growing around and eventually replacing the old one.',
                folderStructure: `system/
  ├── legacy-app/
  ├── new-service-a/
  └── proxy/`,
                diagramData: {
                    nodes: [
                        { id: 'proxy', label: 'Proxy', type: 'server', x: 250, y: 50 },
                        { id: 'legacy', label: 'Legacy App', type: 'database', x: 100, y: 150 },
                        { id: 'new', label: 'New Service', type: 'component', x: 400, y: 150 }
                    ],
                    edges: [
                        { source: 'proxy', target: 'legacy', label: 'Old Routes' },
                        { source: 'proxy', target: 'new', label: 'New Routes' }
                    ]
                }
            },
            {
                id: 'event-sourcing',
                title: 'Event Sourcing',
                description: 'Stores the state of a business entity as a sequence of state-changing events.',
                useCase: 'Audit trails, Complex domains, Replaying state.',
                pros: ['Complete audit log', 'Temporal queries', 'High performance writes'],
                cons: ['Event schema evolution', 'Storage growth', 'Learning curve'],
                visualDescription: 'Timeline of events reconstructing the current state.',
                folderStructure: `src/
  ├── events/
  │   ├── AccountCreated.ts
  │   └── MoneyDeposited.ts
  └── store/
      └── EventStore.ts`,
                diagramData: {
                    nodes: [
                        { id: 'cmd', label: 'Command', type: 'component', x: 50, y: 100 },
                        { id: 'store', label: 'Event Store', type: 'database', x: 250, y: 100 },
                        { id: 'state', label: 'Current State', type: 'component', x: 450, y: 100 }
                    ],
                    edges: [
                        { source: 'cmd', target: 'store', label: 'Appends' },
                        { source: 'store', target: 'state', label: 'Replays' }
                    ]
                }
            }
        ]
    }
];
