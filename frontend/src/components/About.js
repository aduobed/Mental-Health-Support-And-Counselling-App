import React, { useState } from 'react';
import './About.css';

const About = () => {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (index) => {
    setHovered(index);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  return (
    <div className="about-container">
      <h2>About Us</h2>
      <p>
        Welcome to the <strong>Mental Health and Wellness App</strong>! Our mission is to provide a supportive and informative platform
        dedicated to prioritizing mental well-being. Through a range of interactive features, we aim to assist individuals in managing stress,
        anxiety, and improving overall mental health by offering personalized guidance, resources, and stress-reducing tools.
      </p>

      <div className="card-container">
        {/* Secure User Authentication Card */}
        <div
          className="flip-card"
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`flip-card-inner ${hovered === 0 ? 'flipped' : ''}`}>
            <div className="flip-card-front">
              <h3>Secure User Authentication?</h3>
            </div>
            <div className="flip-card-back">
              <p>
                It’s the system we use to keep your personal data safe and secure. This allows you to create accounts, log in, and manage your
                information with ease, all while ensuring that your data remains private and encrypted.
              </p>
            </div>
          </div>
        </div>

        {/* Mental Health Resources Card */}
        <div
          className="flip-card"
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`flip-card-inner ${hovered === 1 ? 'flipped' : ''}`}>
            <div className="flip-card-front">
              <h3>Mental Health Resources?</h3>
            </div>
            <div className="flip-card-back">
              <p>
                These are the tools and content we provide, including articles, guides, videos, and expert advice to help you tackle mental
                health challenges like stress, anxiety, or depression.
              </p>
            </div>
          </div>
        </div>

        {/* Gaming Feature for Stress Analysis Card */}
        <div
          className="flip-card"
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`flip-card-inner ${hovered === 2 ? 'flipped' : ''}`}>
            <div className="flip-card-front">
              <h3>Stress Levels?</h3>
            </div>
            <div className="flip-card-back">
              <p>
                We use fun games that interact with your brain and reactions to analyze your stress level. Through these activities, we give you
                actionable advice on reducing stress.
              </p>
            </div>
          </div>
        </div>

        {/* AI Chatbot Support Card */}
        <div
          className="flip-card"
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`flip-card-inner ${hovered === 3 ? 'flipped' : ''}`}>
            <div className="flip-card-front">
              <h3> AI Chatbot Support?</h3>
            </div>
            <div className="flip-card-back">
              <p>
                Our AI chatbot is designed to assist you 24/7 with real-time support. Whether you need mental health advice or just someone to
                talk to, the chatbot is there to provide guidance and resources based on your needs.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Us Card */}
        <div
          className="flip-card"
          onMouseEnter={() => handleMouseEnter(4)}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`flip-card-inner ${hovered === 4 ? 'flipped' : ''}`}>
            <div className="flip-card-front">
              <h3>Contact Us?</h3>
            </div>
            <div className="flip-card-back">
              <p>
                You can reach our support team via email at <strong>support@example.com</strong>. We're here to help you with any questions or
                concerns you might have.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
