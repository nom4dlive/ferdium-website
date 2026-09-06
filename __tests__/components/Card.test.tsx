import { render, screen } from '@testing-library/react';
import Card from '../../components/Card';

describe('Card Component', () => {
  test('renders card with children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  test('renders icon when provided', () => {
    render(<Card icon={<span data-testid="test-icon">Icon</span>}>Card with Icon</Card>);
    expect(screen.getByTestId('test-icon')).toBeInTheDocument();
  });

  test('does not render icon when not provided', () => {
    render(<Card>No Icon</Card>);
    expect(screen.queryByTestId('test-icon')).not.toBeInTheDocument();
  });

  test('applies correct structure with content div', () => {
    const { container } = render(<Card>Content</Card>);
    const cardElement = container.firstChild;
    expect(cardElement).toBeInTheDocument();
  });
});
