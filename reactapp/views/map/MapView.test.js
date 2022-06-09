import { render, screen } from '@testing-library/react';

import MapView from './MapView';

it('Component adds map container element.', async () => {
  render(<MapView />);
  const mapContainer = await screen.findByTestId('map-container');
  expect(mapContainer).toBeInTheDocument();
});

it('Has a zoom in and out buttons.', async () => {
    render(<MapView />);
    const zoomInButton = await screen.findByRole('button', {'name': '+'});
    const zoomOutButton = await screen.findByRole('button', {'name': '–'});
    expect(zoomInButton).toBeInTheDocument();
    expect(zoomOutButton).toBeInTheDocument();
});
