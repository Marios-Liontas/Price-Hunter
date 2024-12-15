import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Deals from './pages/Deals';
import SearchResults from './pages/SearchResults';
import Home from './pages/Home';

//Page importing here


const App = () => {
  return (
    <Router>
      <Routes>

        <Route
          path='/'
          element={
            <Layout>
              <Home/>
            </Layout>
          }
        />

        <Route
          path="/deals"
          element={
            <Layout>
              <Deals />
            </Layout>
          }
        />

        <Route
          path="/search"
          element={
            <Layout>
              <SearchResults
              />
            </Layout>
          }
        />

      </Routes>
    </Router>
  )
};

export default App;