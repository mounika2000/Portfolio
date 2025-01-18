import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Hi, I'm M's Chatbot Agent! Welcome to the portfolio website. I'm here to guide you through  M's projects, skills, and accomplishments. Feel free to ask me about her work, expertise, or anything else you'd like to explore. Let's get started!"
    }
  ]);
  const [input, setInput] = useState('');

  const quickLinks = [
    { icon: "👤", text: "Why should I hire M?" },
    { icon: "💼", text: "Tell me about M's work experience" },
    { icon: "💻", text: "Show me M's projects" },
    { icon: "🎯", text: "What are M's skills?" }
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setInput('');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main heading */}
      <h1 className="text-3xl font-semibold text-center py-12">
        How can I assist you in exploring M's portfolio today?
      </h1>

      {/* Chat container */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 pb-8">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start gap-3">
              {message.type === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-600">S</span>
                </div>
              )}
              <div className={`p-4 rounded-lg max-w-[85%] ${
                message.type === 'assistant' ? 'bg-gray-100' : 'bg-blue-500 text-white ml-auto'
              }`}>
                {message.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="mt-6 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type here"
            className="w-full p-4 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={handleSend}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <Send size={20} />
          </button>
        </div>

        {/* Quick action buttons */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickLinks.map((link, index) => (
            <button
              key={index}
              className="flex items-center gap-2 p-4 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm"
            >
              <span>{link.icon}</span>
              <span>{link.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-600">
        Built with love ❤️ by Sai Mounika P
      </footer>
    </div>
  );
};

export default ChatInterface;