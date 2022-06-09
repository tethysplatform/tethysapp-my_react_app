import { render, screen } from '@testing-library/react';

import mockTethysAPI from './test/mockTethysAPI';

import App from './App';

it('Renders app title', async () => {
  mockTethysAPI.validResponses();
  render(<App />);
  const linkElement = await screen.findByText(/My React App/i);
  expect(linkElement).toBeInTheDocument();
});
