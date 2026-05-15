import React from 'react';

const Pricing: React.FC = () => {
  return (
    <section className="pricing section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }} data-reveal>
          <h2 style={{ fontSize: '2.5rem' }}>Simple, Transparent Pricing</h2>
          <p style={{ color: 'var(--text-muted)' }}>Start for free and upgrade as you grow.</p>
        </div>
        <div className="pricing-grid">
          <div className="glass-card pricing-card" data-reveal>
            <span className="plan-name">Free</span>
            <div className="price">₹0<span>/mo</span></div>
            <ul className="pricing-features">
              <li>5 polls per month</li>
              <li>Basic Analytics</li>
              <li>Standard Links</li>
              <li>Community Support</li>
            </ul>
            <button className="secondary-button" style={{ width: '100%' }}>Get Started</button>
          </div>
          
          <div className="glass-card pricing-card featured" data-reveal>
            <span className="plan-name">Pro</span>
            <div className="price">₹199<span>/mo</span></div>
            <ul className="pricing-features">
              <li>Unlimited polls</li>
              <li>Realtime analytics</li>
              <li>Password Protection</li>
              <li>Priority Support</li>
            </ul>
            <button className="primary-button" style={{ width: '100%' }}>Upgrade to Pro</button>
          </div>

          <div className="glass-card pricing-card" data-reveal>
            <span className="plan-name">Team</span>
            <div className="price">₹499<span>/mo</span></div>
            <ul className="pricing-features">
              <li>Everything in Pro</li>
              <li>Team Collaboration</li>
              <li>Custom Branding</li>
              <li>API Access</li>
            </ul>
            <button className="secondary-button" style={{ width: '100%' }}>Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
