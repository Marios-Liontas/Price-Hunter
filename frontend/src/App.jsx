import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import Deals from './pages/Deals';

//Page importing here


const App = () => {
  return (
    <Router>
      <Routes>

        <Route
          path='/'
          element={
            <Layout>
              Home Page
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

      </Routes>
    </Router>
  )
};

export default App;