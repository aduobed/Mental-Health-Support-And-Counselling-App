import React, { useState } from 'react';
import chatbotIcon from './Images/chatboticon.png'; // Ensure this path is correct
import './ChatbotButton.css';

function ChatbotButton() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => setIsOpen(prev => !prev);

    return (
        <div className="chatbot-container">
            <button className="chatbot-button" onClick={toggleChat}>
                <img src={chatbotIcon} alt="Chatbot" />
            </button>
            <div className={`chatbot-window ${isOpen ? 'show' : ''}`}>
                <div className="chatbot-header">Chatbot Assistant</div>
                <div className="chatbot-messages">
                    <p>👋 Hi! How can I help you today?</p>
                    <p style={{ fontSize: '0.9rem', color: '#555' }}>
                     
                    </p>
                </div>
                <div className="chatbot-footer">
                    <input type="text" placeholder="Type a message..." />
                    <button>Send</button>
                </div>
            </div>
        </div>
    );
}

export default ChatbotButton;
