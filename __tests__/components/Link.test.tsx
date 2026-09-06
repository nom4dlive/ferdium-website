import { render, screen } from '@testing-library/react';
import Link from '../../components/Link';
import styles from '../../styles/components/Link.module.scss';

describe('Link Component', () => {
  test('renders link with children', () => {
    render(<Link href="/test">Link Text</Link>);
    expect(screen.getByText('Link Text')).toBeInTheDocument();
  });
  
  test('renders as anchor tag with correct href', () => {
    render(<Link href="/about">About</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/about');
  });
  
  test('applies aria-label when provided', () => {
    render(
      <Link href="/test" aria-label="Test Link">
        Link
      </Link>
    );
    expect(screen.getByRole('link')).toHaveAttribute('aria-label', 'Test Link');
  });
  
  test('does not apply neutral class by default', () => {
    render(<Link href="/test">Normal Link</Link>);
    const link = screen.getByRole('link');
    // Neutral class should not be present by default
    expect(link.className).not.toContain(styles.neutral);
  });
  
  test('applies neutral class when neutral prop is true', () => {
    render(
      <Link href="/test" neutral>
        Neutral Link
      </Link>
    );
    const link = screen.getByRole('link');
    expect(link.className).toContain(styles.neutral);
  });
  
  test('renders with external href correctly', () => {
    render(<Link href="https://example.com">External</Link>);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
