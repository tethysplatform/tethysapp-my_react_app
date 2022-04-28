# React Tethys App

This is an experimental example of integrating React into a Tethys App. The goal would be to use React to create the frontend of the app and Tethys to create the backend/API.

## Development Installation

1. Install the app in Tethys Platform

```
conda activate tethys
cd tethysapp-my_react_app
tethys install -d
```

2. Install the node and depedencies

```
conda install -c conda-forge nodejs
cd tethysapp-my_react_app
npm install
```

## Development

The webpack dev server is configured to proxy the Tethys development server (see `webpack.config.js`). The app endpoint will be handled by the webpack development server and all other endpoints will be handled by the Tethys (Django) development server. As such, you will need to start both in separate terminals.

1. Start Tethys development server

```
tethys manage start
```

2. Start webpack development server (in separate terminal)

```
npm start
```

## Build

Webpack is configured to bundle and build the React app into the `public/frontend` directory. Before building a Python distribution, you should run the `npm run build` to update the build.

## Acknowledgements

This implementation is based on the excellent work done by @Jitensid that can be found on GitHub here: [Jitensid/django-webpack-dev-server](https://github.com/Jitensid/django-webpack-dev-server).

Some resources and source code is also derived from projects generated using [Create React App](https://create-react-app.dev/).