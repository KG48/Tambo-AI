# Tambo AI Workspace - Complete Implementation Guide

## 🚀 Quick Start

This guide provides everything you need to build a production-ready Generative UI application using the custom Tambo framework.

---

## 📁 Complete Project Structure

```
tambo-ai-workspace/
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── tambo/                          # Tambo Framework Core
│   │   ├── core/
│   │   │   ├── TamboEngine.ts          # Main orchestrator
│   │   │   ├── types.ts                # TypeScript definitions
│   │   │   ├── SchemaValidator.ts      # Schema validation
│   │   │   └── EvolutionEngine.ts      # UI evolution logic
│   │   ├── registry/
│   │   │   ├── ComponentRegistry.ts    # Component registry
│   │   │   └── components/
│   │   │       ├── index.tsx           # Built-in components
│   │   │       ├── StatCard.tsx
│   │   │       ├── Chart.tsx
│   │   │       ├── Table.tsx
│   │   │       ├── Form.tsx
│   │   │       └── ... (more components)
│   │   ├── ai/
│   │   │   ├── AIOrchestrator.ts       # AI integration
│   │   │   ├── PromptTemplates.ts      # Prompt engineering
│   │   │   └── IntentDetector.ts       # Intent detection
│   │   ├── renderer/
│   │   │   ├── TamboRenderer.tsx       # React renderer
│   │   │   └── LayoutEngine.ts         # Layout system
│   │   └── index.ts                    # Public API exports
│   ├── app/
│   │   ├── components/
│   │   │   ├── ChatInterface.tsx       # Chat UI
│   │   │   ├── GeneratedUI.tsx         # UI display area
│   │   │   ├── CommandPalette.tsx      # Cmd+K interface
│   │   │   ├── SuggestionsPanel.tsx    # AI suggestions
│   │   │   └── ThemeToggle.tsx         # Dark mode toggle
│   │   ├── hooks/
│   │   │   ├── useTambo.ts            # Main Tambo hook
│   │   │   ├── useConversation.ts     # Chat management
│   │   │   └── useSchemaHistory.ts    # UI history
│   │   ├── store/
│   │   │   ├── tamboStore.ts          # Zustand store
│   │   │   └── types.ts               # Store types
│   │   └── utils/
│   │       ├── storage.ts             # LocalStorage wrapper
│   │       └── helpers.ts             # Utility functions
│   ├── pages/
│   │   ├── _app.tsx                   # Next.js app wrapper
│   │   ├── index.tsx                  # Main page
│   │   └── api/
│   │       └── generate-ui.ts         # API route for AI
│   └── styles/
│       ├── globals.css                # Global styles
│       └── tambo.css                  # Tambo-specific styles
├── tests/
│   ├── tambo/
│   │   ├── TamboEngine.test.ts
│   │   ├── ComponentRegistry.test.ts
│   │   └── AIOrchestrator.test.ts
│   └── integration/
│       └── workflow.test.tsx
├── docs/
│   ├── architecture.md
│   ├── api-reference.md
│   └── examples/
├── .env.local                         # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## 🔧 Setup Instructions

### 1. Initialize Project

```bash
# Create Next.js project with TypeScript
npx create-next-app@latest tambo-ai-workspace --typescript --tailwind --app

cd tambo-ai-workspace

# Install dependencies
npm install framer-motion zustand
npm install --save-dev @types/node
```

### 2. Environment Variables

Create `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Tailwind Configuration

Update `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

---

## 💻 Core Implementation

### Main Application Component

```typescript
// src/pages/index.tsx
import React, { useState } from 'react';
import { TamboEngine } from '@/tambo/core/TamboEngine';
import { ComponentRegistry } from '@/tambo/registry/ComponentRegistry';
import { registerBuiltInComponents } from '@/tambo/registry/components';
import { AIOrchestrator } from '@/tambo/ai/AIOrchestrator';
import { TamboRenderer } from '@/tambo/renderer/TamboRenderer';
import ChatInterface from '@/app/components/ChatInterface';
import { useTambo } from '@/app/hooks/useTambo';

// Initialize Tambo
const registry = new ComponentRegistry();
registerBuiltInComponents(registry);

const tamboEngine = new TamboEngine(registry);

const aiOrchestrator = new AIOrchestrator({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY!,
  model: 'gpt-4-turbo-preview',
});

export default function Home() {
  const {
    currentSchema,
    messages,
    loading,
    sendMessage,
    handleAction,
    rewind,
  } = useTambo(tamboEngine, aiOrchestrator);

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Chat Sidebar */}
      <div className="w-96 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <ChatInterface
          messages={messages}
          onSendMessage={sendMessage}
          loading={loading}
        />
      </div>

      {/* Generated UI Area */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Generated Interface
            </h1>
            <button
              onClick={rewind}
              className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              ← Rewind
            </button>
          </div>

          <TamboRenderer
            schema={currentSchema}
            registry={registry}
            onAction={handleAction}
          />
        </div>
      </div>
    </div>
  );
}
```

### Custom Hook

```typescript
// src/app/hooks/useTambo.ts
import { useState, useCallback, useEffect } from 'react';
import { TamboEngine } from '@/tambo/core/TamboEngine';
import { AIOrchestrator } from '@/tambo/ai/AIOrchestrator';
import { TamboSchema, Message, ActionSchema } from '@/tambo/core/types';

export function useTambo(
  engine: TamboEngine,
  aiOrchestrator: AIOrchestrator
) {
  const [currentSchema, setCurrentSchema] = useState<TamboSchema | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Subscribe to schema changes
  useEffect(() => {
    const unsubscribe = engine.subscribe((schema) => {
      setCurrentSchema(schema);
    });
    return unsubscribe;
  }, [engine]);

  // Send message and generate UI
  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const context = {
        messages: [...messages, userMessage],
        currentSchema,
      };

      const response = await aiOrchestrator.generateSchema({
        message: content,
        context,
      });

      await engine.processSchema(response.schema);

      const assistantMessage: Message = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: response.explanation || 'UI generated successfully',
        timestamp: new Date().toISOString(),
        schemaId: response.schema.id,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating UI:', error);
      // Handle error
    } finally {
      setLoading(false);
    }
  }, [messages, currentSchema, engine, aiOrchestrator]);

  // Handle component actions
  const handleAction = useCallback(async (
    action: ActionSchema,
    componentId: string
  ) => {
    // Process action based on intent
    if (action.intent) {
      await sendMessage(action.intent);
    }
  }, [sendMessage]);

  // Rewind to previous state
  const rewind = useCallback(() => {
    engine.rewind();
  }, [engine]);

  return {
    currentSchema,
    messages,
    loading,
    sendMessage,
    handleAction,
    rewind,
  };
}
```

### API Route

```typescript
// src/pages/api/generate-ui.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { AIOrchestrator } from '@/tambo/ai/AIOrchestrator';

const orchestrator = new AIOrchestrator({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, context } = req.body;

    const response = await orchestrator.generateSchema({
      message,
      context,
    });

    res.status(200).json(response);
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ 
      error: 'Failed to generate UI',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
```

---

## 🎨 Styling

### Global Styles

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white;
  }
}

@layer components {
  .tambo-renderer {
    @apply min-h-screen;
  }

  .chat-message {
    @apply p-4 rounded-lg mb-3 max-w-3xl;
  }

  .chat-message.user {
    @apply bg-indigo-600 text-white ml-auto;
  }

  .chat-message.assistant {
    @apply bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700;
  }

  .glass-morphism {
    @apply bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg;
  }
}
```

---

## 📊 Example Usage Scenarios

### 1. Generate Dashboard

```typescript
User: "Show me a productivity dashboard"

AI Output:
{
  "id": "dashboard-001",
  "type": "screen",
  "layout": { "mode": "grid", "columns": 3 },
  "components": [
    { "type": "stat-card", "props": { "title": "Tasks", "value": 24 } },
    { "type": "chart", "props": { "type": "line", "data": [...] } }
  ]
}
```

### 2. Evolve UI

```typescript
User: "Add a table showing task details"

AI: Adds table component to existing dashboard
```

### 3. Transform View

```typescript
User: "Convert this to a kanban board"

AI: Morphs current components into kanban layout
```

---

## 🧪 Testing

```typescript
// tests/tambo/TamboEngine.test.ts
import { TamboEngine } from '@/tambo/core/TamboEngine';
import { ComponentRegistry } from '@/tambo/registry/ComponentRegistry';

describe('TamboEngine', () => {
  let engine: TamboEngine;
  let registry: ComponentRegistry;

  beforeEach(() => {
    registry = new ComponentRegistry();
    engine = new TamboEngine(registry);
  });

  test('processes valid schema', async () => {
    const schema = {
      id: 'test-1',
      version: '1.0',
      type: 'screen',
      layout: { mode: 'stack' },
      components: [],
      metadata: { intent: 'test', timestamp: new Date().toISOString(), conversationId: '1' }
    };

    const result = await engine.processSchema(schema);
    expect(result).toBeDefined();
    expect(result.id).toBe('test-1');
  });

  test('validates schema structure', async () => {
    const invalidSchema = { invalid: 'schema' };
    
    await expect(engine.processSchema(invalidSchema)).rejects.toThrow();
  });
});
```

---

## 🚀 Deployment

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables on Vercel

1. Go to Project Settings
2. Add Environment Variables:
   - `OPENAI_API_KEY`
   - `NEXT_PUBLIC_APP_URL`

### Build Configuration

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 📈 Performance Optimization

1. **Lazy Loading**: Components load on-demand
2. **Memoization**: React.memo for expensive renders
3. **Code Splitting**: Route-based splitting
4. **Caching**: Schema caching with TTL
5. **Debouncing**: User input handling

---

## 🔒 Security Best Practices

1. **Input Sanitization**: All AI-generated content sanitized
2. **Schema Validation**: Strict validation before rendering
3. **Rate Limiting**: Prevent API abuse
4. **API Key Security**: Never expose keys client-side
5. **CSP Headers**: Prevent XSS attacks

---

## 📚 Next Steps

1. Add more built-in components
2. Implement undo/redo system
3. Add export functionality
4. Build template library
5. Add collaborative features
6. Implement analytics tracking

---

## 🤝 Contributing

See CONTRIBUTING.md for development guidelines.

---

## 📄 License

MIT License - See LICENSE file for details.
