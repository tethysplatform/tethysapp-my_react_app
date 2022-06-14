import { render, screen } from '@testing-library/react';

import { TethysAppContext } from '../../components/context';

import LearnReact from './LearnReact';

it('Renders the learn more react link', () => {
  render(<TethysAppContext.Provider value={{color: "#ff9900"}}><LearnReact /></TethysAppContext.Provider>);
  const linkElement = screen.getByText(/Click Here to Learn React!/i);
  expect(linkElement).toBeInTheDocument();
});