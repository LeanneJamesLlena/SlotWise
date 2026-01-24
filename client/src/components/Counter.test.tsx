import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { expect, test } from 'vitest';
import Counter from '@/components/Counter';

test('increments count when button is clicked', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  expect(screen.getByText('Count: 0')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Increment' }));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Increment' }));
  expect(screen.getByText('Count: 2')).toBeInTheDocument();
});

test('resets count to zero', async () => {
  const user = userEvent.setup();
  render(<Counter />);

  await user.click(screen.getByRole('button', { name: 'Increment' }));
  await user.click(screen.getByRole('button', { name: 'Reset' }));

  expect(screen.getByText('Count: 0')).toBeInTheDocument();
});
