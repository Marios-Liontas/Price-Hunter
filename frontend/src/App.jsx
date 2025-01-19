import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout/Layout';
import Deals from './pages/Deals';
import SearchResults from './pages/SearchResults';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Register from './pages/Register';
import { useAuth } from './Contexts/AuthContext';


const App = () => {
  const { isSignedIn } = useAuth();

  return (
    <Router>
      <Routes>

        {/* Sign-In Page */}
        <Route
          path="/login"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {/* Register Page */}
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        {isSignedIn ? (
          <>
            <Route
              path="/deals"
              element={
                <Layout>
                  <Deals />
                </Layout>
              }
            />

            
            <Route
              path="/search-results"
              element={
                <Layout>
                  <SearchResults />
                </Layout>
              }
            />
            
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
          </>

        ) : (
          // Redirect to login if not signed in
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}

      </Routes>
    </Router>
  );
}

export default App;
