import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

// TODO: Get this from Fetch/WebSocket Call
let tethysApp = {
  title: 'My React App',
  color: '#c0392b',
  icon: '/static/my_react_app/images/icon.gif',
  settingsUrl: '/admin/tethys_apps/tethysapp/55/change/',
  exitUrl: '/apps/',
  rootUrl: '/apps/my-react-app/'
};

const root = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <App tethysApp={tethysApp} />
  </React.StrictMode>,
  root
);

if (module.hot) {
    module.hot.accept();
}
