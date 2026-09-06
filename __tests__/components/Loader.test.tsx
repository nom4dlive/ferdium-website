import { render, screen } from '@testing-library/react';
import Loader from '../../components/Loader';

describe('Loader Component', () => {
  test('renders loader component with status role', () => {
    render(<Loader />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
  
  test('renders four div elements for animation', () => {
    const { container } = render(<Loader />);
    const divs = container.querySelectorAll('div');
    // Should have main container + 4 inner divs = 5 total or at least 4 inner divs
    expect(divs.length).toBeGreaterThanOrEqual(4);
  });
  
  test('applies lds-ring class', () => {
    const { container } = render(<Loader />);
    const loaderElement = container.firstChild as HTMLElement;
    expect(loaderElement.className).toContain('lds-ring');
  });

  test('accepts custom className prop', () => {
    render(<Loader className="custom-class" />);
    const loaderElement = screen.getByRole('status');
    expect(loaderElement).toHaveClass('custom-class');
  });

  test('displays aria-label for accessibility', () => {
    render(<Loader />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  test('supports different size props', () => {
    const { rerender } = render(<Loader size="small" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    
    rerender(<Loader size="large" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('supports color prop', () => {
    render(<Loader color="#ff0000" />);
    const loaderElement = screen.getByRole('status') as HTMLElement;
    expect(loaderElement.style.getPropertyValue('--loader-color')).toBe('#ff0000');
  });
});
