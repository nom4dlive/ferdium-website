# Ferdium Integration Guide

This guide explains how to integrate Ferdium components into other web applications.

## Table of Contents

1. [Quick Start](#quick-start)
2. [Integration Methods](#integration-methods)
3. [Web Components](#web-components)
4. [Cross-Window Communication](#cross-window-communication)
5. [Performance Optimization](#performance-optimization)
6. [API Reference](#api-reference)

## Quick Start

### Option 1: CDN Integration (Recommended for simple use cases)

```html
<!-- Add to your HTML -->
<ferdium-loader></ferdium-loader>

<script>
  window.ferdiumInit = [{
    appId: 'your-app-id',
    theme: 'system'
  }];
</script>
<script src="https://cdn.ferdium.org/integration/v1.js" async defer></script>
```

### Option 2: NPM Package

```bash
npm install @ferdium/integration
```

```typescript
import { initIntegration, useIntegration } from '@ferdium/integration';

// Initialize
const cleanup = initIntegration({
  appId: 'my-app',
  theme: 'dark',
  onMessage: (msg) => console.log(msg)
});

// Or use React hook
function MyComponent() {
  const { isReady, sendMessage } = useIntegration({ appId: 'my-app' });
  
  return isReady ? <div>Ready!</div> : <div>Loading...</div>;
}
```

## Integration Methods

### 1. Web Components

Ferdium components are available as native Web Components that work in any framework or vanilla JS:

```html
<!-- Loader Component -->
<ferdium-loader data-props='{"size": "large", "color": "#00ff00"}'></ferdium-loader>

<!-- Button Component -->
<ferdium-button data-props='{"label": "Click me", "variant": "primary"}'></ferdium-button>

<!-- Card Component -->
<ferdium-card data-props='{"title": "Hello", "content": "World"}'></ferdium-card>
```

### 2. React Components

Direct import and usage in React applications:

```tsx
import { Loader, Button, Card } from '@ferdium/components';

function App() {
  return (
    <div>
      <Loader size="medium" />
      <Button label="Submit" onClick={handleSubmit} />
    </div>
  );
}
```

### 3. iframe with postMessage

For isolated integration with full control:

```javascript
// Host application
const iframe = document.createElement('iframe');
iframe.src = 'https://ferdium.org/embed/loader';
iframe.id = 'ferdium-frame';

iframe.onload = () => {
  iframe.contentWindow.postMessage({
    type: 'ferdium:config',
    payload: { theme: 'dark' }
  }, 'https://ferdium.org');
};

// Listen for messages
window.addEventListener('message', (event) => {
  if (event.origin === 'https://ferdium.org') {
    console.log('Ferdium:', event.data);
  }
});
```

## Cross-Window Communication

### Message Types

| Type | Description | Payload |
|------|-------------|---------|
| `ferdium:ready` | Component initialized | `{ appId, version }` |
| `ferdium:theme_change` | Theme updated | `{ theme }` |
| `ferdium:locale_change` | Locale updated | `{ locale }` |
| `ferdium:error` | Error occurred | `{ code, message }` |
| `ferdium:custom` | Custom event | Any |

### Sending Messages

```typescript
import { MESSAGE_TYPES } from '@ferdium/integration';

// Send custom message
window.postMessage({
  type: MESSAGE_TYPES.CUSTOM,
  payload: { action: 'refresh' },
  timestamp: Date.now(),
  source: window.location.origin
}, '*');
```

### Receiving Messages

```typescript
import { initIntegration } from '@ferdium/integration';

initIntegration({
  appId: 'my-app',
  onMessage: (msg) => {
    switch (msg.type) {
      case 'ferdium:ready':
        console.log('Ferdium ready!', msg.payload);
        break;
      case 'ferdium:error':
        console.error('Ferdium error:', msg.payload);
        break;
    }
  }
});
```

## Performance Optimization

### Lazy Loading Components

```typescript
import { lazyLoad } from '@ferdium/utils/performance';

const HeavyComponent = lazyLoad(() => 
  import('@ferdium/components/HeavyComponent')
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Debouncing Events

```typescript
import { debounce } from '@ferdium/utils/performance';

const handleSearch = debounce((query) => {
  // Search logic
}, 300);

<input onChange={(e) => handleSearch(e.target.value)} />
```

### Image Optimization

```typescript
import { LazyImage } from '@ferdium/utils/performance';

<LazyImage 
  src="/hero.jpg"
  alt="Hero image"
  loading="lazy"
  placeholder="data:image/jpeg;base64,..."
/>
```

## API Reference

### initIntegration(config)

Initialize the integration layer.

**Parameters:**
- `config.appId` (string, required): Unique identifier for your application
- `config.baseUrl` (string, optional): Base URL for API calls
- `config.theme` ('light' | 'dark' | 'system', optional): Theme preference
- `config.locale` (string, optional): Locale for i18n
- `config.onMessage` (function, optional): Callback for received messages
- `config.debug` (boolean, optional): Enable debug logging

**Returns:** Cleanup function

### useIntegration(config)

React hook for integration management.

**Returns:**
- `isReady` (boolean): Whether integration is initialized
- `messages` (array): History of received messages
- `error` (string | null): Current error state
- `sendMessage` (function): Send messages to host
- `clearMessages` (function): Clear message history

### validateConfig(config)

Validate integration configuration.

**Returns:** `{ valid: boolean, errors: string[] }`

### generateEmbedCode(componentType, options)

Generate embeddable HTML snippet.

**Parameters:**
- `componentType` (string): Type of component to embed
- `options.containerId` (string): Container element ID
- `options.props` (object, optional): Component props

**Returns:** HTML string

## Best Practices

1. **Always validate configuration** before initializing
2. **Use cleanup functions** to prevent memory leaks
3. **Implement error handling** for cross-origin messages
4. **Lazy load heavy components** for better performance
5. **Use appropriate message types** for clear communication
6. **Test in multiple browsers** for compatibility

## Security Considerations

- Validate all incoming messages
- Use specific origins instead of '*' in production
- Sanitize user-generated content
- Implement rate limiting for sensitive operations
- Use HTTPS for all communications

## Troubleshooting

### Common Issues

**Component not rendering:**
- Check if script loaded correctly
- Verify container element exists
- Check browser console for errors

**Messages not received:**
- Ensure same origin or proper CORS setup
- Verify message format matches expected structure
- Check if event listener is attached before messages sent

**Performance issues:**
- Enable lazy loading for components
- Use debounce/throttle for frequent events
- Check bundle size and optimize imports

## Support

For issues and feature requests, please visit our [GitHub repository](https://github.com/ferdium/ferdium-website).
