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
    <div className="about-page"> {/* Wrap everything in the about-page class */}
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
                <h3>Secure User Authentication</h3>
              </div>
              <div className="flip-card-back">
              <p>
                  Your safety and privacy are at the heart of everything we do. Our secure authentication system ensures that your personal information 
                  is protected through state-of-the-art encryption methods. Create your profile confidently, knowing that you have full control over 
                  your mental health journey, in a space built on trust, respect, and confidentiality.
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
                <h3>Mental Health Resources</h3>
              </div>
              <div className="flip-card-back">
              <p>
                  Empower yourself with a wealth of expertly curated content — from educational articles and practical guides to mindfulness exercises 
                  and inspirational videos. Whether you’re looking to manage stress, build emotional resilience, or understand mental health better, 
                  our resources are designed to inform, uplift, and support your unique path to well-being.
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
                <h3>Stress Levels</h3>
              </div>
              <div className="flip-card-back">
              <p>
                  Discover a fun and engaging way to understand your stress patterns! Through interactive games that analyze cognitive responses, 
                  we provide personalized insights into your stress levels. These insights are not just numbers — they are a bridge to actionable 
                  strategies for mindfulness, self-care, and emotional growth.
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
                <h3> AI Chatbot Support</h3>
              </div>
              <div className="flip-card-back">
              <p>
                  Meet your always-available companion! Our intelligent AI chatbot offers 24/7 emotional support, guidance, and encouragement. 
                  Whether you need coping techniques, motivational messages, or just a friendly conversation, our chatbot is here to help you 
                  feel seen, heard, and supported at any time, day or night.
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
                <h3>Contact Us</h3>
              </div>
              <div className="flip-card-back">
              <p>
                  We are here for you. If you have questions, suggestions, or need personalized support, please don’t hesitate to reach out to us at 
                  <strong> support@example.com</strong>. Your feedback helps us grow and evolve, and together, we can build a community that thrives 
                  on compassion, understanding, and hope.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
