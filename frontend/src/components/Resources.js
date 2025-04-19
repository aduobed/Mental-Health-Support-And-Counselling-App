import React, { useState } from 'react';
import './Resources.css';
import backgroundImage from './Images/resources_bg.jpg';  

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const resources = [
    { name: 'Mental Health Articles', category: 'articles', url: 'https://www.mentalhealth.gov/', image: 'https://via.placeholder.com/250' },
    { name: 'Coping Strategies for Anxiety', category: 'articles', url: 'https://www.nami.org/', image: 'https://via.placeholder.com/250' },
    { name: 'Relaxation Techniques', category: 'articles', url: 'https://www.psychologytoday.com/us', image: 'https://via.placeholder.com/250' },
    { name: 'Mindfulness Meditation', category: 'books', url: 'https://www.mhanational.org/', image: 'https://via.placeholder.com/250' },
    { name: 'Motivational Quotes', category: 'jokes', url: 'https://www.brainyquote.com/', image: 'https://via.placeholder.com/250' },
    { name: 'Stress Management Techniques', category: 'journals', url: 'https://www.journals.sagepub.com/', image: 'https://via.placeholder.com/250' },
    { name: 'Understanding Mental Illness', category: 'books', url: 'https://www.amazon.com/', image: 'https://via.placeholder.com/250' },
    { name: 'Funny Jokes for Stress Relief', category: 'jokes', url: 'https://www.jokes.com/', image: 'https://via.placeholder.com/250' },
    { name: 'Self-Care Practices', category: 'articles', url: 'https://www.psychologytoday.com/us', image: 'https://via.placeholder.com/250' },
    { name: 'Therapy Techniques for Healing', category: 'books', url: 'https://www.amazon.com/', image: 'https://via.placeholder.com/250' },
    { name: 'Building Emotional Resilience', category: 'journals', url: 'https://www.psychologytoday.com/us', image: 'https://via.placeholder.com/250' },
    { name: 'Yoga for Mental Clarity', category: 'articles', url: 'https://www.yogajournal.com/', image: 'https://via.placeholder.com/250' },
    { name: 'Overcoming Depression with Therapy', category: 'books', url: 'https://www.amazon.com/', image: 'https://via.placeholder.com/250' },
    { name: 'Mindful Eating for Stress Reduction', category: 'articles', url: 'https://www.mindful.org/', image: 'https://via.placeholder.com/250' },
    { name: 'Affirmations for Self-Worth', category: 'jokes', url: 'https://www.brainyquote.com/', image: 'https://via.placeholder.com/250' },
    { name: 'Cognitive Behavioral Therapy Techniques', category: 'journals', url: 'https://www.psychologytoday.com/us', image: 'https://via.placeholder.com/250' },
    { name: 'The Power of Positive Thinking', category: 'books', url: 'https://www.amazon.com/', image: 'https://via.placeholder.com/250' },
    { name: 'Therapeutic Art Activities', category: 'articles', url: 'https://www.psychologytoday.com/us', image: 'https://via.placeholder.com/250' },
    { name: 'Deep Breathing Exercises', category: 'articles', url: 'https://www.psychologytoday.com/us', image: 'https://via.placeholder.com/250' },
    { name: 'Grounding Techniques for Anxiety', category: 'articles', url: 'https://www.verywellmind.com/', image: 'https://via.placeholder.com/250' },
    { name: 'Art Therapy for Stress Relief', category: 'books', url: 'https://www.amazon.com/', image: 'https://via.placeholder.com/250' },
    { name: 'Positive Psychology Journal', category: 'journals', url: 'https://www.journals.sagepub.com/', image: 'https://via.placeholder.com/250' },
    { name: 'Sleep Hygiene Tips', category: 'articles', url: 'https://www.sleepfoundation.org/', image: 'https://via.placeholder.com/250' },
    { name: 'Gratitude Practices', category: 'books', url: 'https://www.amazon.com/', image: 'https://via.placeholder.com/250' },
    { name: 'Understanding PTSD', category: 'articles', url: 'https://www.ptsd.va.gov/', image: 'https://via.placeholder.com/250' },
    { name: 'Books for Managing Mental Health', category: 'books', url: 'https://www.amazon.com/', image: 'https://via.placeholder.com/250' },
    { name: 'Mindfulness for Kids', category: 'books', url: 'https://www.amazon.com/', image: 'https://via.placeholder.com/250' },
    { name: 'Dealing with Burnout', category: 'articles', url: 'https://www.psychologytoday.com/us', image: 'https://via.placeholder.com/250' },
    { name: 'Holistic Healing Practices', category: 'articles', url: 'https://www.holistichealth.org/', image: 'https://via.placeholder.com/250' },
    { name: 'Self-Love and Acceptance', category: 'articles', url: 'https://www.psychologytoday.com/us', image: 'https://via.placeholder.com/250' },
    { name: 'Coping Strategies for Grief', category: 'articles', url: 'https://www.helpguide.org/', image: 'https://via.placeholder.com/250' },
    { name: 'Digital Detox Strategies', category: 'articles', url: 'https://www.mindful.org/', image: 'https://via.placeholder.com/250' },
    { name: 'Creating Healthy Boundaries', category: 'articles', url: 'https://www.psychologytoday.com/us', image: 'https://via.placeholder.com/250' },
    { name: 'Stress-Free Living Tips', category: 'articles', url: 'https://www.psychologytoday.com/us', image: 'https://via.placeholder.com/250' },
    { name: 'The Role of Nutrition in Mental Health', category: 'articles', url: 'https://www.psychologytoday.com/us', image: 'https://via.placeholder.com/250' },
    { name: 'Mental Health Recovery Tools', category: 'books', url: 'https://www.amazon.com/', image: 'https://via.placeholder.com/250' },
    { name: 'The Science of Happiness', category: 'articles', url: 'https://www.happiness.com/', image: 'https://via.placeholder.com/250' },
    { name: 'How to Support a Loved One with Mental Illness', category: 'articles', url: 'https://www.nami.org/', image: 'https://via.placeholder.com/250' },
  ];
  

  const filteredResources = resources.filter(
    (resource) =>
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (searchCategory === 'all' || resource.category === searchCategory)
  );

  return (
    <div className="resources-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Search Bar with Dropdown */}
      <div className="search-section">
        <select value={searchCategory} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="articles">Articles</option>
          <option value="books">Books</option>
          <option value="journals">Journals</option>
          <option value="jokes">Jokes</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={() => setSearchQuery('')}>Clear Search</button>
      </div>

      {/* Resources List */}
      <div className="resources-list">
        <h3>Available Resources</h3>
        <div className="card-container">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => (
              <div key={index} className="card">
                <a href={resource.url} target="_blank" rel="noopener noreferrer">
                 
                  <h4>{resource.name}</h4>
                  <p>Click to learn more</p>
                </a>
              </div>
            ))
          ) : (
            <p>No resources found for "{searchQuery}"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resources;
