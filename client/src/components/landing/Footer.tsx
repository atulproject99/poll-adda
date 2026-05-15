import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="logo">Poll<span>Adda</span></div>
          <p>&copy; 2026 PollAdda Inc. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
