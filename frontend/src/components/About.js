import React from 'react';
import './About.css'; 

const About = () => {
  return (
    <div className="about-container">
      <h2>About Us</h2>
      <p>
        Welcome to the <strong>Mental Health and Wellness App</strong>. Our mission is to provide 
        a supportive and informative platform that prioritizes mental well-being. 
        We offer tools, resources, and guidance to help individuals manage stress, anxiety, 
        and overall mental wellness through personalized experiences.
      </p>

      {/* Secure User Authentication Section */}
      <div className="about-section">
        <h3>🔒 User Authentication & Authorization</h3>
        <p>
          "info"
        </p>
      </div>

      {/* Mental Health Resources Section */}
      <div className="about-section">
        <h3>📚 Mental Health Resources</h3>
        <p>
          "info"
        </p>
      </div>

      {/* Gaming Feature for Stress Analysis */}
      <div className="about-section">
        <h3>🎮 Stress Level Analysis Through Gaming</h3>
        <p>
          "info"
        </p>
      </div>

      {/* Chatbot Support Section */}
      <div className="about-section">
        <h3>🤖 AI-Powered Chatbot Support</h3>
        <p>
          "info"
        </p>
      </div>

      {/* Contact Us Section */}
      <div className="about-section">
        <h3>📞 Contact Us</h3>
        <p>
          If you have any questions or need support, feel free to reach out to us at <strong>support@example.com</strong>.
        </p>
      </div>
    </div>
  );
};

export default About;
