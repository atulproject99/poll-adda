import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import AuthModal from '../auth/AuthModal';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { confirm } = useModal();

  const handleLogout = () => {
    confirm({
      title: 'Logout',
      message: 'Are you sure you want to exit your session?',
      confirmText: 'Logout',
      type: 'danger',
      onConfirm: () => logout(),
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Link to="/" className="logo">
            Poll<span>Adda</span>
          </Link>
          <div className="nav-actions">
            {isAuthenticated ? (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link to="/dashboard" className="secondary-button">Dashboard</Link>
                <button onClick={handleLogout} className="secondary-button" style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.2)', background: 'rgba(239, 68, 68, 0.05)' }}>Logout</button>
              </div>
            ) : (
              <button onClick={() => setIsAuthModalOpen(true)} className="secondary-button">Login</button>
            )}
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
