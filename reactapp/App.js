import { HashRouter, Route, Routes } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Loader from './components/loader/Loader';

import LearnReact from './views/learn/LearnReact';
import Home from './views/home/Home';

import './App.scss';

function App() {
  return (
    <div>
      <Loader>
        <HashRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/learn-react" element={<LearnReact />}/>
            </Routes>
          </Layout>
        </HashRouter>
      </Loader>
    </div>
  );
}

export default App;