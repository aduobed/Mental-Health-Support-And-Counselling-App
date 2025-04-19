import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="home-wrapper">
      <section className="hero-section">
        <div className="overlay" />
        <div className="hero-content" data-aos="fade-up">
          <h1 className="main-title">Welcome to Sattva </h1>
          <p className="subtitle">A sanctuary for emotional healing, growth, and connection.</p>
          <button className="cta-button" onClick={() => navigate('/login')}>
            Start Your Journey
          </button>
        </div>
      </section>

      <section className="features-section" data-aos="zoom-in-up">

  <h2>Mental Health Matters</h2>
  <div className="features-grid">
    <div className="feature-card">
      <h3>1 in 4 People</h3>
      <p>
        Around one in every four individuals will experience a mental health challenge at some point in their lives. Whether it’s anxiety, depression, or stress-related issues, mental health concerns are more common than we often realize.
      </p>
    </div>
    <div className="feature-card">
      <h3>70% Remain Silent</h3>
      <p>
        Due to stigma, fear of judgment, or lack of access to resources, nearly 70% of those struggling do not seek the help they need. This silence often leads to worsened conditions and missed opportunities for healing.
      </p>
    </div>
    <div className="feature-card">
      <h3>Everyone Deserves Help</h3>
      <p>
        Mental health is just as important as physical health. Every single person deserves to be heard, understood, and supported — without shame or fear. At MindCare, we’re here to make that support accessible and compassionate.
      </p>
    </div>
  </div>
</section>


<section className="features-section" data-aos="fade-up">
  <h2>Explore MindCare Features</h2>
  <div className="features-grid">
    <div className="feature-card">
      <h3>📚 Resources & Articles</h3>
      <p>
        Dive into a comprehensive library of well-researched articles, guides, and mental health resources. Whether you're looking for coping strategies, mindfulness techniques, or expert advice, we have the information you need to guide your journey.
      </p>
    </div>
    <div className="feature-card">
      <h3>🩺 Consultation with Doctors</h3>
      <p>
        Schedule consultations with licensed mental health professionals, therapists, and counselors. Whether you're dealing with stress, anxiety, or need emotional support, we're here to provide expert help when you need it most.
      </p>
    </div>
    <div className="feature-card">
      <h3>💬 24/7 Chatbot Help</h3>
      <p>
        Our AI-powered chatbot is available round-the-clock to offer immediate support. Whether you need a quick mood check-in, tips for relaxation, or a friendly chat, our chatbot is ready to assist with guidance and resources.
      </p>
    </div>
    <div className="feature-card">
      <h3>🌱 Personal Growth Tools</h3>
      <p>
        Engage with a variety of tools designed to foster personal growth, from journaling prompts and mood tracking to mindfulness exercises. Track your emotional progress and unlock ways to improve your mental well-being daily.
      </p>
    </div>
  </div>
</section>


      <section className="quote-section" data-aos="fade">
        <blockquote>
          “Healing takes time, and asking for help is a courageous step.”
        </blockquote>
      </section>
    </div>
  );
}

export default Home;
