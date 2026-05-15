import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="features section-padding">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }} data-reveal>
          <h2 style={{ fontSize: '2.5rem' }}>Why Choose PollAdda?</h2>
          <p style={{ color: 'var(--text-muted)' }}>Powerful features designed for creators and businesses.</p>
        </div>
        <div className="features-grid">
          <div className="glass-card feature-card" data-reveal>
            <h3>✨ Create Polls</h3>
            <p>Build beautiful, interactive polls in seconds with our intuitive builder. Multiple question types and custom options.</p>
          </div>
          <div className="glass-card feature-card" data-reveal>
            <h3>📊 Live Analytics</h3>
            <p>Watch as votes roll in. Get deep insights with beautiful charts and detailed breakdown of every response.</p>
          </div>
          <div className="glass-card feature-card" data-reveal>
            <h3>🔗 Public Sharing</h3>
            <p>Generate unique shareable links. Embed your polls anywhere or share them directly on social media.</p>
          </div>
          <div className="glass-card feature-card" data-reveal>
            <h3>⚡ Realtime Updates</h3>
            <p>Powered by WebSockets. No refresh needed—see results update live as users cast their votes.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
