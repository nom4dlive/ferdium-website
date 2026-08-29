import React from 'react';
import '@testing-library/jest-dom';

// Mock next/image
jest.mock('next/image', () => {
  return {
    __esModule: true,
    default: (props: any) => {
      // eslint-disable-next-line @next/next/no-img-element
      return React.createElement('img', props);
    },
  };
});

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, ...rest }: any) => {
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    return React.createElement('a', rest, children);
  };
});

// Mock @mdi/react
jest.mock('@mdi/react', () => {
  return ({ path, size, color, ...rest }: any) => {
    return React.createElement('svg', { 'data-testid': 'mdi-icon', ...rest });
  };
});
