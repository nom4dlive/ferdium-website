import { useEffect, useCallback, useState } from 'react';
import { 
  initIntegration, 
  validateConfig, 
  MESSAGE_TYPES,
  IntegrationConfig, 
  IntegrationMessage 
} from '../lib/integration';

/**
 * React hook for managing Ferdium integration lifecycle
 * Provides easy setup and cleanup for cross-app communication
 */
export function useIntegration(config: IntegrationConfig) {
  const [isReady, setIsReady] = useState(false);
  const [messages, setMessages] = useState<IntegrationMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Validate configuration on mount
  useEffect(() => {
    const validation = validateConfig(config);
    if (!validation.valid) {
      setError(validation.errors.join('; '));
      return;
    }
  }, [config]);

  // Initialize integration and handle messages
  useEffect(() => {
    if (error) return;

    const handleMessage = (msg: IntegrationMessage) => {
      setMessages(prev => [...prev, msg]);
      
      if (msg.type === MESSAGE_TYPES.READY) {
        setIsReady(true);
      }
      
      config.onMessage?.(msg);
    };

    const enhancedConfig = { ...config, onMessage: handleMessage };
    const cleanup = initIntegration(enhancedConfig);

    return cleanup;
  }, [config, error]);

  // Function to send messages to host application
  const sendMessage = useCallback((type: string, payload: unknown, targetOrigin = '*') => {
    const message: IntegrationMessage = {
      type,
      payload,
      timestamp: Date.now(),
      source: window.location.origin,
    };
    
    window.postMessage(message, targetOrigin);
    
    if (config.debug) {
      console.log('[useIntegration] Sent message:', message);
    }
  }, [config.debug]);

  // Clear message history
  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    isReady,
    messages,
    error,
    sendMessage,
    clearMessages,
  };
}

export default useIntegration;
