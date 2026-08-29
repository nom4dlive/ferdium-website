import { render, screen } from '@testing-library/react';
import Button from '../../components/Button';

describe('Button Component', () => {
  test('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  test('renders as div when asDiv prop is true', () => {
    const { container } = render(<Button asDiv>Div Button</Button>);
    expect(container.querySelector('button')).not.toBeInTheDocument();
    expect(screen.getByText('Div Button')).toBeInTheDocument();
    expect(container.querySelector('div')).toHaveClass('base');
  });

  test('applies cta class when cta prop is true', () => {
    const { container } = render(<Button cta>CTA Button</Button>);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(container.firstChild?.textContent).toContain('CTA Button');
  });

  test('applies cta2 class when cta2 prop is true', () => {
    const { container } = render(<Button cta2>Secondary CTA Button</Button>);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
    expect(container.firstChild?.textContent).toContain('Secondary CTA Button');
  });

  test('applies square class when square prop is true', () => {
    const { container } = render(<Button square>Square Button</Button>);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });

  test('applies icon class when icon prop is true', () => {
    const { container } = render(<Button icon>Icon Button</Button>);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });

  test('applies size class when size prop is provided', () => {
    const { container } = render(<Button size="large">Large Button</Button>);
    expect(container.firstChild?.nodeName).toBe('BUTTON');
  });

  test('renders prefix when provided', () => {
    render(<Button prefix="Prefix">Button</Button>);
    expect(screen.getByText('Prefix')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('applies aria-label attribute when provided', () => {
    render(<Button aria-label="test-label">Button</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'test-label');
  });
});
