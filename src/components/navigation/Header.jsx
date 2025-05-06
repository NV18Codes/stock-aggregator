import React, { useState, useEffect } from 'react';
import { Menu, X, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onOpenLogin, onOpenSignup }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { state } = useAuth();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isLandingPage 
          ? 'bg-white shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <BarChart2 
              className={`h-8 w-8 ${
                isScrolled || !isLandingPage ? 'text-blue-600' : 'text-white'
              }`} 
            />
            <span 
              className={`font-bold text-xl ${
                isScrolled || !isLandingPage ? 'text-gray-900' : 'text-white'
              }`}
            >
              Trade Guardian
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks isScrolled={isScrolled} isLandingPage={isLandingPage} />
            
            {state.isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="primary">Dashboard</Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={onOpenLogin}
                  className={
                    isScrolled || !isLandingPage
                      ? 'text-gray-600 hover:text-gray-900'
                      : 'text-white hover:bg-white/10'
                  }
                >
                  Log In
                </Button>
                <Button
                  variant="primary"
                  onClick={onOpenSignup}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X 
                className={
                  isScrolled || !isLandingPage ? 'text-gray-900' : 'text-white'
                } 
                size={24}
              />
            ) : (
              <Menu 
                className={
                  isScrolled || !isLandingPage ? 'text-gray-900' : 'text-white'
                } 
                size={24}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <MobileNavLinks closeMenu={() => setIsMenuOpen(false)} />
                
                {state.isAuthenticated ? (
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="primary" fullWidth>
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        onOpenLogin();
                        setIsMenuOpen(false);
                      }}
                      fullWidth
                    >
                      Log In
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        onOpenSignup();
                        setIsMenuOpen(false);
                      }}
                      fullWidth
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavLinks = ({ isScrolled, isLandingPage }) => {
  const textClass = isScrolled || !isLandingPage ? 'text-gray-600 hover:text-gray-900' : 'text-white/80 hover:text-white';
  
  return (
    <>
      {isLandingPage ? (
        <>
          <a href="#about" className={`font-medium ${textClass}`}>About</a>
          <a href="#pricing" className={`font-medium ${textClass}`}>Pricing</a>
          <a href="#testimonials" className={`font-medium ${textClass}`}>Testimonials</a>
        </>
      ) : (
        <>
          <Link to="/" className={`font-medium ${textClass}`}>Home</Link>
          <Link to="/#about" className={`font-medium ${textClass}`}>About</Link>
          <Link to="/#pricing" className={`font-medium ${textClass}`}>Pricing</Link>
        </>
      )}
    </>
  );
};

const MobileNavLinks = ({ closeMenu }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  
  if (isLandingPage) {
    return (
      <>
        <a
          href="#about"
          className="py-2 text-gray-600 hover:text-gray-900"
          onClick={closeMenu}
        >
          About
        </a>
        <a
          href="#pricing"
          className="py-2 text-gray-600 hover:text-gray-900"
          onClick={closeMenu}
        >
          Pricing
        </a>
        <a
          href="#testimonials"
          className="py-2 text-gray-600 hover:text-gray-900"
          onClick={closeMenu}
        >
          Testimonials
        </a>
      </>
    );
  }
  
  return (
    <>
      <Link
        to="/"
        className="py-2 text-gray-600 hover:text-gray-900"
        onClick={closeMenu}
      >
        Home
      </Link>
      <Link
        to="/#about"
        className="py-2 text-gray-600 hover:text-gray-900"
        onClick={closeMenu}
      >
        About
      </Link>
      <Link
        to="/#pricing"
        className="py-2 text-gray-600 hover:text-gray-900"
        onClick={closeMenu}
      >
        Pricing
      </Link>
    </>
  );
};

export default Header;
