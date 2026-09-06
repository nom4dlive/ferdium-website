/**
 * Performance optimization utilities for Ferdium components
 * Includes lazy loading, memoization helpers, and rendering optimizations
 */

import { ComponentType, LazyExoticComponent, Suspense, createElement } from 'react';

/**
 * Lazy load a component with automatic code splitting
 * Reduces initial bundle size by deferring component loading
 */
export function lazyLoad<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
  return lazy(importFn);
}

// Re-export React.lazy for convenience
export { lazy } from 'react';

/**
 * Image lazy loading wrapper
 * Defers image loading until visible in viewport
 */
export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
}

export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholder,
  width,
  height,
  loading = 'lazy' 
}: LazyImageProps): JSX.Element {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      {...(placeholder && { 'data-placeholder': placeholder })}
    />
  );
}

/**
 * Debounce function for performance-sensitive operations
 * Useful for search inputs, resize handlers, scroll events
 */
export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function debounced(this: unknown, ...args: Parameters<T>) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Throttle function to limit execution rate
 * Prevents excessive calls during rapid events
 */
export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  
  return function throttled(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Check if browser supports Intersection Observer API
 * Used for progressive enhancement of lazy loading features
 */
export function supportsIntersectionObserver(): boolean {
  return typeof window !== 'undefined' && 'IntersectionObserver' in window;
}

/**
 * Memoize expensive calculations
 * Caches results based on input arguments
 */
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  resolver?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = resolver ? resolver(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    
    return result;
  }) as T;
}

/**
 * Request idle callback wrapper
 * Schedules non-critical work during browser idle periods
 */
export function scheduleIdleWork(
  callback: (deadline: IdleDeadline) => void,
  timeout?: number
): void {
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(callback, { timeout });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => callback({ 
      timeRemaining: () => 0,
      didTimeout: false 
    } as IdleDeadline), 1);
  }
}

/**
 * Preload critical resources
 * Hints to browser to fetch resources early
 */
export function preloadResource(href: string, as: string): void {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.setAttribute('as', as);
  document.head.appendChild(link);
}

/**
 * Measure component render time for performance monitoring
 */
export function measureRenderTime(componentName: string): () => void {
  const startTime = performance.now();
  
  return () => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${componentName}] Render time: ${duration.toFixed(2)}ms`);
    }
    
    // Report to analytics in production
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark?.(`${componentName}-render`);
    }
  };
}

export default {
  lazyLoad,
  LazyImage,
  debounce,
  throttle,
  supportsIntersectionObserver,
  memoize,
  scheduleIdleWork,
  preloadResource,
  measureRenderTime,
};
