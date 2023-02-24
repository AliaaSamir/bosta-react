import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Bosta link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bosta/i);
  expect(linkElement).toBeInTheDocument();
});
