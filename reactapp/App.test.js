import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

it('Renders the Loading message', async () => {
  render(<App />);
  // "find" queries wait until element matching description is found
  const loadingMessage = await screen.findByText(/Loading.../i);
  expect(loadingMessage).toBeInTheDocument();
});

it('Renders app title', async () => {
  render(<App />);
  // "find" queries wait until element matching description is found
  const linkElement = await screen.findByText(/My React App/i);
  expect(linkElement).toBeInTheDocument();
});

it('Has Home and Learn React items in the navigation menu', async () => {
  const user = userEvent.setup();
  render(<App />);
  // "find" queries wait until element matching description is found
  const navButton = await screen.findByRole('button', {name: /show navigation/i});
  expect(navButton).toBeInTheDocument();
  user.click(navButton);

  const homeNavLink = await screen.findByRole('link', {name: /Home/i});
  const learnNavLink = await screen.findByRole('link', {name: /Learn React/i});
  expect(homeNavLink).toBeVisible();
  expect(learnNavLink).toBeVisible();
});
