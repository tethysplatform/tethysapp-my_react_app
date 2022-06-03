import { render, screen } from '@testing-library/react';
import App from '../../components/App';


test('renders loading page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Loading.../i);
  expect(linkElement).toBeInTheDocument();
});
