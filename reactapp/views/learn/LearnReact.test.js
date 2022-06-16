import { render, screen } from '@testing-library/react';

import { AppContext } from 'components/context';

import LearnReact from 'views/learn/LearnReact';

it('Renders the learn more react link', () => {
  const mockContext = {
    tethysApp:{
      color: "#ff9900"
    }
  };
  render(<AppContext.Provider value={mockContext}><LearnReact /></AppContext.Provider>);
  const linkElement = screen.getByText(/Click Here to Learn React!/i);
  expect(linkElement).toBeInTheDocument();
});