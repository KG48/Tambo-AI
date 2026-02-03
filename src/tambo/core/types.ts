// src/tambo/core/types.ts
/**
 * Core type definitions for Tambo Generative UI Framework
 */

import { ReactNode } from 'react';

// ==================== SCHEMA TYPES ====================

export interface TamboSchema {
  id: string;
  version: string;
  type: 'screen' | 'component';
  layout: LayoutConfig;
  components: ComponentSchema[];
  metadata: SchemaMetadata;
  theme?: ThemeConfig;
}

export interface ComponentSchema {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  children?: ComponentSchema[];
  actions?: ActionSchema[];
  conditions?: ConditionSchema[];
  style?: StyleConfig;
}

export interface LayoutConfig {
  mode: 'grid' | 'flex' | 'stack' | 'masonry' | 'split';
  columns?: number;
  rows?: number;
  gap?: string;
  padding?: string;
  responsive?: ResponsiveConfig;
  areas?: string[][];
}

export interface ResponsiveConfig {
  mobile?: Partial<LayoutConfig>;
  tablet?: Partial<LayoutConfig>;
  desktop?: Partial<LayoutConfig>;
}

export interface SchemaMetadata {
  intent: string;
  timestamp: string;
  conversationId: string;
  userId?: string;
  processedAt?: string;
  engineVersion?: string;
  tags?: string[];
}

export interface ThemeConfig {
  mode: 'light' | 'dark' | 'auto';
  primaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
}

// ==================== COMPONENT TYPES ====================

export type ComponentType =
  // Data Display
  | 'stat-card'
  | 'table'
  | 'chart'
  | 'timeline'
  | 'kanban'
  | 'list'
  | 'badge'
  | 'avatar'
  // Input
  | 'form'
  | 'search-bar'
  | 'filter-panel'
  | 'command-palette'
  | 'input'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'slider'
  // Layout
  | 'card'
  | 'tabs'
  | 'accordion'
  | 'grid'
  | 'split-view'
  | 'container'
  | 'divider'
  // Feedback
  | 'alert'
  | 'modal'
  | 'toast'
  | 'skeleton'
  | 'empty-state'
  | 'loading'
  | 'progress'
  // Navigation
  | 'button'
  | 'link'
  | 'breadcrumb'
  | 'pagination'
  | 'menu'
  // Custom
  | string;

export interface ActionSchema {
  id: string;
  type: 'click' | 'submit' | 'change' | 'hover' | 'focus' | 'custom';
  intent: string;
  handler?: string;
  updates?: SchemaUpdate[];
  validation?: ValidationRule[];
  feedback?: FeedbackConfig;
}

export interface SchemaUpdate {
  target: string; // Component ID or selector
  operation: 'add' | 'remove' | 'update' | 'morph';
  schema?: Partial<ComponentSchema>;
  animation?: AnimationConfig;
}

export interface ConditionSchema {
  id: string;
  type: 'visibility' | 'enabled' | 'style';
  expression: string;
  trueValue: any;
  falseValue: any;
}

export interface StyleConfig {
  className?: string;
  css?: Record<string, string>;
  animation?: AnimationConfig;
}

export interface AnimationConfig {
  type: 'fade' | 'slide' | 'scale' | 'morph' | 'none';
  duration?: number;
  delay?: number;
  easing?: string;
  stagger?: number;
}

// ==================== VALIDATION TYPES ====================

export interface ValidationResult {
  valid: boolean;
  schema?: TamboSchema;
  errors: string[];
  warnings?: string[];
}

export interface ValidationRule {
  type: 'required' | 'pattern' | 'min' | 'max' | 'custom';
  value?: any;
  message: string;
}

export interface FeedbackConfig {
  success?: string;
  error?: string;
  loading?: string;
}

// ==================== COMPONENT REGISTRY TYPES ====================

export interface ComponentDefinition {
  component: React.ComponentType<any>;
  validator: (props: any) => boolean;
  defaultProps?: Record<string, any>;
  variants?: ComponentVariant[];
  category?: ComponentCategory;
  description?: string;
}

export interface ComponentVariant {
  name: string;
  props: Record<string, any>;
}

export type ComponentCategory = 
  | 'data-display'
  | 'input'
  | 'layout'
  | 'feedback'
  | 'navigation'
  | 'custom';

// ==================== EVOLUTION TYPES ====================

export interface EvolutionAction {
  type: 'add' | 'remove' | 'update' | 'morph' | 'reorder';
  target?: string;
  schema?: ComponentSchema;
  position?: number;
  animation?: AnimationConfig;
}

export interface EvolutionRule {
  trigger: string;
  condition?: (schema: TamboSchema) => boolean;
  action: EvolutionAction;
}

export interface EvolutionContext {
  userIntent?: string;
  previousIntent?: string;
  conversationTurn?: number;
  userPreferences?: Record<string, any>;
}

// ==================== AI TYPES ====================

export interface AIRequest {
  message: string;
  context: ConversationContext;
  intent?: string;
  options?: AIOptions;
}

export interface AIResponse {
  schema: TamboSchema;
  explanation?: string;
  suggestions?: string[];
  confidence?: number;
}

export interface ConversationContext {
  messages: Message[];
  currentSchema?: TamboSchema;
  userProfile?: UserProfile;
  sessionData?: Record<string, any>;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  intent?: string;
  schemaId?: string;
}

export interface UserProfile {
  id: string;
  preferences: UserPreferences;
  history: InteractionHistory[];
}

export interface UserPreferences {
  theme?: 'light' | 'dark' | 'auto';
  density?: 'compact' | 'comfortable' | 'spacious';
  animations?: boolean;
  defaultView?: string;
  language?: string;
}

export interface InteractionHistory {
  timestamp: string;
  action: string;
  componentId: string;
  schemaId: string;
}

export interface AIOptions {
  temperature?: number;
  maxTokens?: number;
  model?: string;
  timeout?: number;
}

// ==================== RENDERING TYPES ====================

export interface RenderContext {
  schema: TamboSchema;
  registry: any; // ComponentRegistry
  onAction: (action: ActionSchema) => void;
  state?: Record<string, any>;
}

export interface LayoutProps {
  config: LayoutConfig;
  children: ReactNode;
  className?: string;
}

// ==================== STATE TYPES ====================

export interface TamboState {
  conversation: {
    messages: Message[];
    context: ConversationContext;
    loading: boolean;
  };
  ui: {
    currentSchema: TamboSchema | null;
    history: TamboSchema[];
    loading: boolean;
    error?: string;
  };
  user: {
    profile: UserProfile;
    preferences: UserPreferences;
  };
  system: {
    initialized: boolean;
    error?: string;
  };
}

// ==================== ERROR TYPES ====================

export class TamboError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'TamboError';
  }
}

export class ValidationError extends TamboError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class RenderError extends TamboError {
  constructor(message: string, details?: any) {
    super(message, 'RENDER_ERROR', details);
    this.name = 'RenderError';
  }
}

export class AIError extends TamboError {
  constructor(message: string, details?: any) {
    super(message, 'AI_ERROR', details);
    this.name = 'AIError';
  }
}

// ==================== UTILITY TYPES ====================

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
