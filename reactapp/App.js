import { HashRouter, Route, Routes } from 'react-router-dom';

import ErrorBoundary from 'components/error/ErrorBoundary';
import Layout from 'components/layout/Layout';
import Loader from 'components/loader/Loader';
import NotFound from 'components/error/NotFound';

import Home from 'views/home/Home';
import LearnReact from 'views/learn/LearnReact';

import 'App.scss';

function App() {
  return (
    <>
      <ErrorBoundary>
        <HashRouter>
          <Loader>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/learn-react" element={<LearnReact />}/>
                <Route path="*" element={<NotFound />}/>
              </Routes>
            </Layout>
          </Loader>
        </HashRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;