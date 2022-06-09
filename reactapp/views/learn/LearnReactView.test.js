import { render, screen } from '@testing-library/react';

import LearnReactView from './LearnReactView';

it('renders the learn more react link', () => {
  render(<LearnReactView />);
  const linkElement = screen.getByText(/Click Here to Learn React!/i);
  expect(linkElement).toBeInTheDocument();
});