import React, { useState } from 'react';
import './UserAppointments.css';
import { FaCalendarAlt, FaClock, FaQuoteLeft, FaSmile, FaPlusCircle } from 'react-icons/fa';
import { PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

const moodOptions = ["Happy", "Anxious", "Stressed", "Calm", "Sad"];
const COLORS = ['#2563eb', '#e0e0e0'];

const sampleAppointments = [
  { id: 1, title: "Therapy Session with Dr. Smith", date: "2025-04-20", time: "10:00 AM", status: "upcoming" },
  { id: 2, title: "Mindfulness Workshop", date: "2025-03-15", time: "2:00 PM", status: "past" },
  { id: 3, title: "Follow-up Call", date: "2025-04-22", time: "4:00 PM", status: "upcoming" },
];

const moodQuotes = {
  Happy: [
    "Keep smiling, because life is a beautiful thing and there's so much to smile about!",
    "Happiness is a choice, not a result.",
    "Laughter is timeless, imagination has no age, and dreams are forever.",
    "Happiness is not something ready-made. It comes from your own actions.",
    "A smile is the best makeup any girl can wear.",
    "Why don't skeletons fight each other? They don't have the guts!",
    "Happiness is like a butterfly; the more you chase it, the more it will elude you.",
    "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    "Why don’t oysters share their pearls? Because they’re shellfish!",
    "Laugh and the world laughs with you, snore and you sleep alone."
  ],
  Anxious: [
    "Take a deep breath. You are stronger than your anxiety.",
    "This too shall pass. Stay strong.",
    "Anxiety is like a rocking chair. It gives you something to do but gets you nowhere.",
    "Don't stress. Do your best and forget the rest.",
    "Why don't you ever see anxiety at the beach? It can't find its way to the shore!",
    "It's okay to feel anxious, just don’t let it take over. You’ve got this!",
    "The only way out is through.",
    "If you’re going through hell, keep going.",
    "Why did the anxiety break up with the stress? They couldn’t find common ground.",
    "When you feel anxious, remember that the calmest minds are the most powerful."
  ],
  Stressed: [
    "Stress is what happens when your mind resists the present moment.",
    "Take a break, you've got this!",
    "Stress is caused by being 'here' but wanting to be 'there'.",
    "The best way to pay for a lovely moment is to enjoy it.",
    "What do you call a stressful day? A mess-terpiece!",
    "It's not the load that breaks you down, it's the way you carry it.",
    "I’m on a seafood diet. I see food, and I stress-eat it.",
    "When stress gets you down, take a moment to breathe and remind yourself that everything is temporary.",
    "Why did the stressed person bring a pencil to the gym? Because they wanted to draw a line under their worries!",
    "Don’t stress the could-haves, the would-haves, and the should-haves. Just focus on what’s in front of you."
  ],
  Calm: [
    "Calmness is the cradle of power.",
    "You are at peace with yourself.",
    "A calm sea does not make a skilled sailor.",
    "Peace comes from within. Do not seek it without.",
    "I am at peace with who I am and where I am in life.",
    "Why did the yoga teacher bring a towel to the party? To stay grounded!",
    "Sometimes you have to let go of what's gone, appreciate what remains, and look forward to what's coming.",
    "A calm mind is a powerful mind.",
    "Peace begins with a smile.",
    "Calmness is the key to overcoming any storm."
  ],
  Sad: [
    "Tears are words the heart can't express.",
    "Even the darkest night will end and the sun will rise.",
    "Sometimes, the hardest part isn't letting go but learning to start over.",
    "Why don’t we ever tell a sad joke? Because it’s never a ‘pun’ishing experience!",
    "It’s okay to not be okay, but it’s not okay to stay that way.",
    "A broken heart is just the growing pains necessary so that you can love again.",
    "Sadness flies away on the wings of time.",
    "Why was the depressed pencil always so dull? Because it had too many problems.",
    "Life is tough, but so are you.",
    "When life gives you lemons, make lemonade — or throw them at the person who gave you the lemons!"
  ]
};


const UserAppointments = () => {
  const [mood, setMood] = useState('Happy');
  const [goalProgress] = useState(65);
  const [stats] = useState({ totalAppointments: 5, upcoming: 2, past: 3 });
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [quote, setQuote] = useState('');

  const navigate = useNavigate();

  const handleMoodChange = (e) => {
    const newMood = e.target.value;
    setMood(newMood);
    setQuote(getRandomQuote(newMood));
  };

  const handleBookAppointment = () => {
    navigate('/appointment');
  };

  const filteredAppointments = sampleAppointments.filter(appt => appt.status === selectedTab);

  const goalData = [
    { name: 'Achieved', value: goalProgress },
    { name: 'Remaining', value: 100 - goalProgress }
  ];

  const getRandomQuote = (mood) => {
    const quotes = moodQuotes[mood];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  return (
    <div className="appointments-container">
      <div className="content-layout">

        {/* Left Side Section */}
        <div className="left-side">
          <section className="section welcome-header welcome-with-button">
            <img src="/avatar-placeholder.png" alt="User Avatar" />
            <div>
              <h1>Welcome Back!</h1>
              <p>Your mental wellness journey continues...</p>
            </div>
            <button className="book-btn" onClick={handleBookAppointment}>
              <FaPlusCircle /> Book Appointment
            </button>
          </section>

          <section className="section mood-tracker">
            <h3><FaSmile /> How are you feeling today?</h3>
            <select value={mood} onChange={handleMoodChange}>
              {moodOptions.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
          </section>

          <section className="section inspirational-quote">
            <h3><FaQuoteLeft /> Inspirational Quote</h3>
            <p>"{quote}"</p>
          </section>

          <section className="section goal-progress">
            <h3>Your Goal Progress</h3>
            <PieChart width={200} height={200}>
              <Pie
                data={goalData}
                cx={100}
                cy={100}
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
              >
                {goalData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            <p><strong>{goalProgress}%</strong> of your mental wellness goals achieved</p>
          </section>

          <section className="section summary-stats">
            <div className="stat-card">
              <h3>Total Appointments</h3>
              <p>{stats.totalAppointments}</p>
            </div>
            <div className="stat-card">
              <h3>Upcoming</h3>
              <p>{stats.upcoming}</p>
            </div>
            <div className="stat-card">
              <h3>Past</h3>
              <p>{stats.past}</p>
            </div>
          </section>
        </div>

        {/* Right Side Section (Upcoming & Past Appointments) */}
        <div className="right-side">
          <section className="section appointments">
            <div className="tab-header">
              <button className={selectedTab === 'upcoming' ? 'active' : ''} onClick={() => setSelectedTab('upcoming')}>Upcoming</button>
              <button className={selectedTab === 'past' ? 'active' : ''} onClick={() => setSelectedTab('past')}>Past</button>
            </div>

            <div className="appointment-list">
              {filteredAppointments.map((appt) => (
                <div key={appt.id} className="appointment-card" data-status={appt.status}>
                  <h3>{appt.title}</h3>
                  <p><FaCalendarAlt /> {appt.date}</p>
                  <p><FaClock /> {appt.time}</p>
                  <div className="actions">
                    <button className="button reschedule">Reschedule</button>
                    <button className="button cancel">Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </div>
  );
};

export default UserAppointments;
