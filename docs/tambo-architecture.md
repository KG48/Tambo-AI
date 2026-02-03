# Tambo: Custom Generative UI Framework
## Architecture & Design Document

---

## 🎯 Executive Summary

**Tambo** is a custom-built generative UI framework that bridges conversational AI and dynamic interface generation. It translates natural language intent into structured UI schemas, then renders them as React components that evolve throughout the conversation.

---

## 🏗️ System Architecture

### High-Level Flow

```
User Input → AI Processing → UI Schema Generation → Component Registry → React Rendering → User Interaction → Context Update → Loop
```

### Core Layers

#### 1. **Conversation Layer**
- Handles user messages
- Maintains conversation history
- Tracks user intent and context

#### 2. **AI Orchestration Layer**
- Sends context to LLM
- Extracts structured UI schemas from responses
- Manages prompt templates
- Handles AI errors/fallbacks

#### 3. **Tambo Core (Schema Engine)**
- Validates UI schemas
- Resolves component types
- Manages state transitions
- Handles UI evolution logic

#### 4. **Component Registry**
- Maps schema types to React components
- Provides component library
- Handles dynamic imports
- Manages component versioning

#### 5. **Rendering Engine**
- Converts schemas to React elements
- Manages layout composition
- Handles animations/transitions
- Optimizes re-renders

---

## 📋 Tambo UI Schema Format

### Schema Structure

```typescript
interface TamboSchema {
  id: string;                    // Unique identifier
  version: string;               // Schema version
  type: 'screen' | 'component';  // Top-level or nested
  layout: LayoutConfig;          // Layout configuration
  components: ComponentSchema[]; // Array of components
  metadata: SchemaMetadata;      // Context & tracking
}

interface ComponentSchema {
  id: string;
  type: ComponentType;           // 'card', 'chart', 'table', etc.
  props: Record<string, any>;    // Component-specific props
  children?: ComponentSchema[];  // Nested components
  actions?: ActionSchema[];      // User interactions
  conditions?: ConditionSchema[]; // Visibility/enable logic
}

interface LayoutConfig {
  mode: 'grid' | 'flex' | 'stack';
  columns?: number;
  gap?: string;
  responsive?: ResponsiveConfig;
}

interface ActionSchema {
  id: string;
  type: 'click' | 'submit' | 'change';
  intent: string;                // What should happen
  updates?: SchemaUpdate[];      // UI updates on action
}
```

### Example Schema

```json
{
  "id": "dashboard-001",
  "version": "1.0",
  "type": "screen",
  "layout": {
    "mode": "grid",
    "columns": 3,
    "gap": "1rem"
  },
  "components": [
    {
      "id": "stats-card-1",
      "type": "stat-card",
      "props": {
        "title": "Total Tasks",
        "value": 24,
        "trend": "+12%",
        "icon": "tasks"
      }
    },
    {
      "id": "chart-1",
      "type": "line-chart",
      "props": {
        "title": "Productivity This Week",
        "data": [...],
        "xAxis": "day",
        "yAxis": "tasks"
      }
    }
  ],
  "metadata": {
    "intent": "show_productivity_dashboard",
    "timestamp": "2024-02-03T10:30:00Z",
    "conversationId": "conv-123"
  }
}
```

---

## 🧩 Component Registry Design

### Registry Structure

```typescript
class TamboRegistry {
  private components: Map<ComponentType, ComponentDefinition>;
  
  register(type: ComponentType, definition: ComponentDefinition): void;
  resolve(type: ComponentType): React.ComponentType;
  exists(type: ComponentType): boolean;
}

interface ComponentDefinition {
  component: React.ComponentType;
  validator: (props: any) => boolean;
  defaultProps?: Record<string, any>;
  variants?: string[];
}
```

### Built-in Components

1. **Data Display**
   - `stat-card` - Metrics with trends
   - `table` - Data tables with sorting/filtering
   - `chart` - Line, bar, pie, area charts
   - `timeline` - Event sequences
   - `kanban` - Task boards

2. **Input Components**
   - `form` - Dynamic forms
   - `search-bar` - Search interfaces
   - `filter-panel` - Filtering UI
   - `command-palette` - Keyboard shortcuts

3. **Layout Components**
   - `card` - Container with header/footer
   - `tabs` - Tab navigation
   - `accordion` - Collapsible sections
   - `grid` - Responsive grid
   - `split-view` - Resizable panels

4. **Feedback Components**
   - `alert` - Notifications
   - `modal` - Dialogs
   - `skeleton` - Loading states
   - `empty-state` - No data states

---

## 🤖 AI Prompt Engineering

### System Prompt Template

```
You are Tambo UI Generator, an AI that creates structured UI schemas.

Rules:
1. Output ONLY valid JSON matching the TamboSchema format
2. Choose appropriate component types based on user intent
3. Generate realistic, contextual data when needed
4. Consider previous conversation context
5. Make UI intuitive and action-oriented

Available Components: [component list]
Current Context: [conversation history]
User Intent: [detected intent]

Generate a UI schema that best serves the user's request.
```

### Intent Detection Prompts

```typescript
const intentPrompts = {
  dashboard: "User wants to see overview/summary → Use stat-cards, charts",
  tasks: "User wants to manage tasks → Use kanban, table, forms",
  analytics: "User wants insights → Use charts, metrics, comparisons",
  form: "User needs to input data → Use dynamic forms",
  report: "User wants detailed info → Use tables, exports, filters"
};
```

---

## 🔄 UI Evolution System

### Evolution Types

1. **Additive**: Add new components without removing existing
2. **Transformative**: Morph one component into another
3. **Reductive**: Remove components based on context
4. **Refinement**: Update component props in place

### Evolution Rules

```typescript
interface EvolutionRule {
  trigger: string;              // What causes evolution
  target: string;               // Component ID or selector
  action: 'add' | 'remove' | 'update' | 'morph';
  schema: Partial<ComponentSchema>;
  animation?: AnimationConfig;
}
```

### Example Evolution

```
User: "Show me my tasks"
→ Generates kanban board

User: "Now show me as a table with deadlines"
→ Morphs kanban into sortable table with deadline column

User: "Add a chart showing completion rate"
→ Adds chart component above table
```

---

## 🎨 Layout & Composition Engine

### Layout Algorithms

1. **Grid**: Responsive columns with auto-placement
2. **Flex**: Horizontal/vertical flex layouts
3. **Stack**: Vertical stacking with spacing
4. **Masonry**: Pinterest-style layouts
5. **Split**: Resizable dual-pane

### Composition Rules

- Chat always visible (sticky or split)
- Generated UI takes 60-70% of screen
- Mobile: Stack vertically, chat collapsible
- Tablet: Side-by-side equal split
- Desktop: Optimal reading width

---

## ⚡ State Management

### State Architecture

```typescript
interface TamboState {
  conversation: {
    messages: Message[];
    context: ConversationContext;
  };
  ui: {
    currentSchema: TamboSchema | null;
    history: TamboSchema[];
    loading: boolean;
  };
  user: {
    preferences: UserPreferences;
    interactions: Interaction[];
  };
}
```

### State Synchronization

- Zustand for global state
- React Context for component-level state
- LocalStorage for persistence
- Optimistic updates for actions

---

## 🔒 Security & Validation

### Schema Validation

```typescript
class SchemaValidator {
  validate(schema: unknown): TamboSchema | ValidationError;
  sanitizeProps(props: Record<string, any>): Record<string, any>;
  checkPermissions(action: ActionSchema): boolean;
}
```

### Security Measures

- Sanitize all AI-generated content
- Validate schema structure before rendering
- Rate limit AI requests
- Escape user inputs in components
- CSP headers for XSS prevention

---

## 🚀 Performance Optimizations

1. **Lazy Loading**: Dynamic imports for components
2. **Memoization**: React.memo for expensive components
3. **Virtual Scrolling**: For large tables/lists
4. **Debouncing**: User input handling
5. **Code Splitting**: Route-based splitting
6. **Caching**: Schema caching with invalidation

---

## 📦 Project Structure

```
tambo-ai-workspace/
├── src/
│   ├── tambo/                    # Tambo Framework Core
│   │   ├── core/
│   │   │   ├── TamboEngine.ts   # Main orchestrator
│   │   │   ├── SchemaValidator.ts
│   │   │   └── EvolutionEngine.ts
│   │   ├── registry/
│   │   │   ├── ComponentRegistry.ts
│   │   │   └── components/      # Built-in components
│   │   ├── ai/
│   │   │   ├── AIOrchestrator.ts
│   │   │   ├── PromptTemplates.ts
│   │   │   └── IntentDetector.ts
│   │   └── renderer/
│   │       ├── TamboRenderer.tsx
│   │       └── LayoutEngine.ts
│   ├── app/
│   │   ├── components/          # App-specific components
│   │   ├── hooks/               # Custom hooks
│   │   ├── store/               # State management
│   │   └── utils/               # Utilities
│   └── pages/                   # Next.js pages
├── public/
├── tests/
└── docs/
```

---

## 🎯 Implementation Phases

### Phase 1: Core Foundation (Week 1)
- Tambo Engine skeleton
- Schema types & validation
- Component Registry
- Basic rendering

### Phase 2: AI Integration (Week 2)
- AI orchestrator
- Prompt engineering
- Intent detection
- Schema generation

### Phase 3: Component Library (Week 3)
- Build 10-15 core components
- Layout system
- Animation system
- Responsive design

### Phase 4: Evolution Engine (Week 4)
- UI evolution logic
- Transition animations
- State management
- Context tracking

### Phase 5: Polish & Deploy (Week 5)
- Error handling
- Performance optimization
- Testing
- Documentation
- Deployment

---

## 🎨 Design System

### Color Palette
- Primary: Indigo/Purple gradient
- Success: Emerald
- Warning: Amber
- Error: Rose
- Neutral: Slate

### Typography
- Headings: Inter Bold
- Body: Inter Regular
- Code: JetBrains Mono

### Spacing System
- Base: 4px
- Scale: 4, 8, 12, 16, 24, 32, 48, 64

### Animations
- Duration: 200-300ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)
- Stagger: 50ms between elements

---

## 🔮 Advanced Features

1. **AI Suggestions Panel**: Proactive UI recommendations
2. **Command Palette**: Cmd+K for quick actions
3. **UI Version Control**: Rewind/fast-forward UI states
4. **Collaborative Mode**: Multi-user schema editing
5. **Export Schemas**: Download generated UIs
6. **Template Library**: Pre-built schema templates
7. **A/B Testing**: Compare UI variations
8. **Analytics**: Track user interactions with generated UI

---

## 📊 Success Metrics

- Schema generation time < 2s
- UI render time < 100ms
- Zero layout shifts (CLS = 0)
- Lighthouse score > 90
- Conversation context retention: 10+ messages
- Component registry: 20+ components
- Schema validation success rate: 99%+

---

## 🎓 Key Design Decisions

### Why Custom Framework?
- Full control over schema format
- Optimized for conversational UI generation
- No vendor lock-in
- Portfolio differentiator

### Why Schema-Based?
- Separation of concerns (AI → Schema → UI)
- Easier to validate and test
- Version control friendly
- Portable across different renderers

### Why React?
- Component-based architecture
- Rich ecosystem
- Performance optimizations built-in
- Wide adoption

---

This architecture provides a solid foundation for building Tambo. Ready to implement?
