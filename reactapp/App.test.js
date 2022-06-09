import { render, screen } from '@testing-library/react';

import App from './App';

it('Renders app title', async () => {
  render(<App />);
  const linkElement = await screen.findByText(/My React App/i);
  expect(linkElement).toBeInTheDocument();
});
