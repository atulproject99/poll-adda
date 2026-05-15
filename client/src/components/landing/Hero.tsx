import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content" data-reveal>
          <h1 className="text-gradient">Create Interactive Polls & Collect Real-Time Feedback</h1>
          <p>Build polls, share public links, collect responses and analyze results instantly. The most powerful way to hear from your audience.</p>
          <div className="hero-btns">
            <button className="primary-button">Get Started Free</button>
            <button className="secondary-button">Live Demo</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
