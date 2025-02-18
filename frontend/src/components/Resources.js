import React, { useState } from 'react';
import './Resources.css';
import backgroundImage from './Images/resources_bg.jpg';  

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gameSearchQuery, setGameSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchCategory, setSearchCategory] = useState('all');
  const [showResources, setShowResources] = useState(true);
  const [showGames, setShowGames] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGameSearchChange = (e) => {
    setGameSearchQuery(e.target.value);
  };

  const handleGameSelection = (game) => {
    setSelectedGame(game);
  };

  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  const handleTabClick = (tab) => {
    if (tab === 'resources') {
      setShowResources(true);
      setShowGames(false);
    } else if (tab === 'games') {
      setShowResources(false);
      setShowGames(true);
    }
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
  ];

  const games = [
    { name: 'Stress Relief Game 1', description: 'A game to help reduce stress through simple interactions.' },
    { name: 'Stress Relief Game 2', description: 'Engage with this game to track your stress responses.' },
    { name: 'Breathing Exercise Game', description: 'Relax with breathing exercises while playing this game.' },
    { name: 'Mindfulness Challenge', description: 'Stay mindful and calm while playing this game.' },
  ];

  const filteredResources = resources.filter(
    (resource) =>
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (searchCategory === 'all' || resource.category === searchCategory)
  );

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(gameSearchQuery.toLowerCase())
  );

  const handleGamePlay = () => {
    alert(`Starting the game: ${selectedGame}`);
  };

  return (
    <div className="resources-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      {/* Tabs for Resources and Games */}
      <div className="tabs">
        <button className={showResources ? 'active' : ''} onClick={() => handleTabClick('resources')}>
          Resources
        </button>
        <button className={showGames ? 'active' : ''} onClick={() => handleTabClick('games')}>
          Games
        </button>
      </div>

      {/* Search Bar with Dropdown */}
      {showResources && (
        <>
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
                      <img src={resource.image} alt={resource.name} />
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
        </>
      )}

      {/* Search Bar for Games */}
      {showGames && (
        <>
          <div className="search-section">
            <input
              type="text"
              placeholder="Search games..."
              value={gameSearchQuery}
              onChange={handleGameSearchChange}
            />
            <button onClick={() => setGameSearchQuery('')}>Clear Search</button>
          </div>

          {/* Games List */}
          <div className="games-list">
            <h3>Available Games for Stress Level Assessment</h3>
            <div className="card-container">
              {filteredGames.length > 0 ? (
                filteredGames.map((game, index) => (
                  <div key={index} className="card">
                    <button onClick={() => handleGameSelection(game.name)}>
                      <h4>{game.name}</h4>
                      <p>{game.description}</p>
                    </button>
                  </div>
                ))
              ) : (
                <p>No games found for "{gameSearchQuery}"</p>
              )}
            </div>
          </div>

          {/* Game Selection */}
          {selectedGame && (
            <div className="game-info">
              <p>You have selected: {selectedGame}</p>
              <button onClick={handleGamePlay}>Start Game</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Resources;
