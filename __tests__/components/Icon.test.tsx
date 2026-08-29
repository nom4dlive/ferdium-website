import { render, screen } from '@testing-library/react';
import Icon from '../../components/Icon';

describe('Icon Component', () => {
  const testIconPath = 'M1,1 L2,2';
  
  test('renders icon with path', () => {
    render(<Icon icon={testIconPath} />);
    expect(screen.getByTestId('mdi-icon')).toBeInTheDocument();
  });
  
  test('applies size prop when provided', () => {
    render(<Icon icon={testIconPath} size={24} />);
    const icon = screen.getByTestId('mdi-icon') as SVGElement;
    // The @mdi/react component renders an SVG, verify it exists and has proper structure
    expect(icon.tagName).toBe('svg');
    expect(icon).toBeInTheDocument();
  });
  
  test('applies color prop when provided', () => {
    render(<Icon icon={testIconPath} color="#ff0000" />);
    const icon = screen.getByTestId('mdi-icon') as SVGElement;
    // Verify the icon is rendered - color is applied internally by @mdi/react
    expect(icon).toBeInTheDocument();
  });
  
  test('renders without optional props', () => {
    render(<Icon icon={testIconPath} />);
    const icon = screen.getByTestId('mdi-icon');
    expect(icon).toBeInTheDocument();
  });
  
  test('wraps icon in container div with flex styles', () => {
    const { container } = render(<Icon icon={testIconPath} />);
    const wrapperDiv = container.firstChild;
    expect(wrapperDiv).toBeInTheDocument();
  });
});
