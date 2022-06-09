import { render, screen } from '@testing-library/react';

import LearnReact from './LearnReact';

it('Renders the learn more react link', () => {
  render(<LearnReact />);
  const linkElement = screen.getByText(/Click Here to Learn React!/i);
  expect(linkElement).toBeInTheDocument();
});