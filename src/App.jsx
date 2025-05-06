import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/navigation/Header';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header
            onOpenLogin={openLoginModal}
            onOpenSignup={openSignupModal}
          />
          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <LandingPage
                    onOpenLogin={openLoginModal}
                    onOpenSignup={openSignupModal}
                    isLoginOpen={isLoginModalOpen}
                    isSignupOpen={isSignupModalOpen}
                    onCloseLogin={closeLoginModal}
                    onCloseSignup={closeSignupModal}
                  />
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;