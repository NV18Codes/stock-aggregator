import React, { useState } from 'react';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import PricingSection from '../components/landing/PricingSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import Footer from '../components/navigation/Footer';
import LoginModal from '../components/auth/LoginModal';
import SignupModal from '../components/auth/SignupModal';

interface LandingPageProps {
  onOpenLogin: () => void;
  onOpenSignup: () => void;
  isLoginOpen: boolean;
  isSignupOpen: boolean;
  onCloseLogin: () => void;
  onCloseSignup: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({
  onOpenLogin,
  onOpenSignup,
  isLoginOpen,
  isSignupOpen,
  onCloseLogin,
  onCloseSignup,
}) => {
  return (
    <div className="min-h-screen">
      <HeroSection onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} />
      <AboutSection />
      <PricingSection onOpenSignup={onOpenSignup} />
      <TestimonialsSection />
      <Footer />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={onCloseLogin}
        onSwitchToSignup={() => {
          onCloseLogin();
          onOpenSignup();
        }}
      />

      <SignupModal
        isOpen={isSignupOpen}
        onClose={onCloseSignup}
        onSwitchToLogin={() => {
          onCloseSignup();
          onOpenLogin();
        }}
      />
    </div>
  );
};

export default LandingPage;