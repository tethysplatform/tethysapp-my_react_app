import { HashRouter, Route, Routes } from 'react-router-dom';

import ErrorBoundary from './components/error/ErrorBoundary';
import Layout from './components/layout/Layout';
import Loader from './components/loader/Loader';

import Hydrograph from './views/hydrograph/Hydrograph';
import LearnReact from './views/learn/LearnReact';
import Home from './views/home/Home';

import './App.scss';

function App() {
  return (
    <>
      <ErrorBoundary>
        <HashRouter>
          <Loader>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/hydrograph" element={<Hydrograph />}/>
                <Route path="/learn-react" element={<LearnReact />}/>
              </Routes>
            </Layout>
          </Loader>
        </HashRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;