import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from 'App';

let container = null;

document.addEventListener('DOMContentLoaded', () => {
  if (!container) {
    container = document.getElementById('root');
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <BrowserRouter basename='/apps/my-react-app/'>
          <App />
        </BrowserRouter>
      </StrictMode>
    );

    if (module.hot) {
        module.hot.accept();
    }
  }
});