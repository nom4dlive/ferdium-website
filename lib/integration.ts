/**
 * Integration utilities for embedding Ferdium components in other web applications
 * Supports multiple integration methods: Web Components, iframe messaging, and CDN exports
 */

export interface IntegrationConfig {
  /** Unique identifier for the host application */
  appId: string;
  /** Base URL for API calls */
  baseUrl?: string;
  /** Theme preference: 'light', 'dark', or 'system' */
  theme?: 'light' | 'dark' | 'system';
  /** Locale for internationalization */
  locale?: string;
  /** Callback for cross-origin messages */
  onMessage?: (data: IntegrationMessage) => void;
  /** Enable debug mode */
  debug?: boolean;
}

export interface IntegrationMessage {
  type: string;
  payload: unknown;
  timestamp: number;
  source: string;
}

export interface EmbedOptions {
  containerId: string;
  componentType: 'loader' | 'button' | 'card' | 'icon';
  props?: Record<string, unknown>;
}

/**
 * Default configuration for integrations
 */
const DEFAULT_CONFIG: Partial<IntegrationConfig> = {
  theme: 'system',
  locale: 'en-US',
  debug: false,
};

/**
 * Message types for cross-window communication
 */
export const MESSAGE_TYPES = {
  READY: 'ferdium:ready',
  THEME_CHANGE: 'ferdium:theme_change',
  LOCALE_CHANGE: 'ferdium:locale_change',
  ERROR: 'ferdium:error',
  CUSTOM: 'ferdium:custom',
} as const;

/**
 * Initialize integration with host application
 * Sets up postMessage listeners and dispatches ready event
 */
export function initIntegration(config: IntegrationConfig): () => void {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  
  const handleMessage = (event: MessageEvent) => {
    if (!event.data || !event.data.type) return;
    
    const message: IntegrationMessage = {
      type: event.data.type,
      payload: event.data.payload,
      timestamp: Date.now(),
      source: event.origin,
    };
    
    if (mergedConfig.debug) {
      console.log('[Ferdium Integration] Received message:', message);
    }
    
    mergedConfig.onMessage?.(message);
  };
  
  window.addEventListener('message', handleMessage);
  
  // Dispatch ready event
  const readyMessage: IntegrationMessage = {
    type: MESSAGE_TYPES.READY,
    payload: { appId: config.appId, version: '1.0.0' },
    timestamp: Date.now(),
    source: window.location.origin,
  };
  
  window.postMessage(readyMessage, '*');
  
  // Return cleanup function
  return () => {
    window.removeEventListener('message', handleMessage);
  };
}

/**
 * Create a custom element wrapper for React components
 * Enables usage as native HTML elements in any web application
 */
export function createWebComponent(
  tagName: string,
  renderFn: (props: Record<string, unknown>, container: HTMLElement) => void
): void {
  if (typeof window === 'undefined' || customElements.get(tagName)) {
    return;
  }
  
  class FerdiumElement extends HTMLElement {
    private _props: Record<string, unknown> = {};
    
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
    
    static get observedAttributes(): string[] {
      return ['data-props'];
    }
    
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
      if (name === 'data-props' && newValue) {
        try {
          this._props = JSON.parse(newValue);
          this.render();
        } catch (e) {
          console.error('[Ferdium Element] Invalid props JSON:', e);
        }
      }
    }
    
    connectedCallback(): void {
      this.render();
    }
    
    private render(): void {
      if (!this.shadowRoot) return;
      
      this.shadowRoot.innerHTML = '<div data-root></div>';
      const container = this.shadowRoot.querySelector('[data-root]') as HTMLElement;
      if (container) {
        renderFn(this._props, container);
      }
    }
  }
  
  customElements.define(tagName, FerdiumElement);
}

/**
 * Generate embed code snippet for documentation
 * Returns HTML/JS snippet that can be copied to integrate components
 */
export function generateEmbedCode(
  componentType: string,
  options: EmbedOptions
): string {
  const propsString = options.props 
    ? ` data-props='${JSON.stringify(options.props)}'`
    : '';
  
  return `<!-- Ferdium ${componentType} Component -->
<ferdium-${componentType}${propsString}></ferdium-${componentType}>

<script>
  // Initialize Ferdium integration
  window.ferdiumInit = window.ferdiumInit || [];
  window.ferdiumInit.push({
    appId: '${options.containerId}',
    theme: 'system',
    onMessage: (msg) => console.log('Received:', msg)
  });
</script>
<script src="https://cdn.ferdium.org/integration/v1.js" async defer></script>`;
}

/**
 * Validate integration configuration
 * Ensures required fields are present and valid
 */
export function validateConfig(config: IntegrationConfig): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!config.appId || typeof config.appId !== 'string') {
    errors.push('appId is required and must be a string');
  }
  
  if (config.theme && !['light', 'dark', 'system'].includes(config.theme)) {
    errors.push('theme must be one of: light, dark, system');
  }
  
  if (config.baseUrl) {
    try {
      new URL(config.baseUrl);
    } catch {
      errors.push('baseUrl must be a valid URL');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Utility for cross-origin resource sharing setup
 * Configures CORS headers and allowed origins
 */
export function setupCORS(allowedOrigins: string[]): void {
  if (typeof document === 'undefined') return;
  
  const meta = document.createElement('meta');
  meta.name = 'ferdium-cors-origins';
  meta.content = allowedOrigins.join(',');
  document.head.appendChild(meta);
}

export default {
  initIntegration,
  createWebComponent,
  generateEmbedCode,
  validateConfig,
  setupCORS,
  MESSAGE_TYPES,
};
