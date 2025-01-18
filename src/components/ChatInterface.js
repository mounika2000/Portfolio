import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { portfolioData } from './portfolio-data';
//require('dotenv').config();

const ChatInterface = () => {
  

// Log to check if env is loaded
console.log('Env check:', {
  keyExists: !!process.env.REACT_APP_OPENAI_API_KEY,
  nodeEnv: process.env.NODE_ENV
});

  const [messages, setMessages] = useState([
    {
      type: 'assistant',
      content: "Hi, I'm Sai Mounika's Chatbot Agent! Welcome to the portfolio website. I'm here to guide you through Sai Mounika's projects, skills, and accomplishments. Feel free to ask me about her work, expertise, or anything else you'd like to explore. Let's get started!",
      fullContent: "Hi, I'm Sai Mounika's Chatbot Agent! Welcome to the portfolio website. I'm here to guide you through Sai Mounika's projects, skills, and accomplishments. Feel free to ask me about her work, expertise, or anything else you'd like to explore. Let's get started!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentlyTyping, setCurrentlyTyping] = useState(null);

  const quickLinks = [
    { icon: "👤", text: "Why should I hire Sai Mounika?" },
    { icon: "💼", text: "Tell me about Sai Mounika's work experience" },
    { icon: "💻", text: "Show me Sai Mounika's projects" },
    { icon: "🎯", text: "What are Sai Mounika's skills?" }
  ];

  // const handleResponse = async (question) => {
  //   if (!question.trim() || isTyping) return;
    
  //   try {
  //     // Add user question first
  //     setMessages(prev => [...prev, { 
  //       type: 'user', 
  //       content: question, 
  //       fullContent: question 
  //     }]);
      
  //     // Show typing indicator
  //     setIsTyping(true);
      
  //     // Get predefined response
  //     const response = portfolioData[
  //       Object.keys(portfolioData).find(key => 
  //         portfolioData[key].response && 
  //         question.toLowerCase().includes(key.toLowerCase())
  //       )
  //     ]?.response || "I apologize, but I don't have specific information about that. Please try asking about my predefined topics using the quick action buttons below.";

  //     // Add the response message with typing animation
  //     setMessages(prev => [...prev, { 
  //       type: 'assistant', 
  //       content: '', 
  //       fullContent: response 
  //     }]);
  //     setCurrentlyTyping(messages.length + 1); // +1 because we just added two messages
      
  //   } catch (error) {
  //     console.error('Error handling response:', error);
  //     setIsTyping(false);
  //     setMessages(prev => [...prev, {
  //       type: 'assistant',
  //       content: "I apologize, but I'm having trouble responding right now. Please try again.",
  //       fullContent: "I apologize, but I'm having trouble responding right now. Please try again."
  //     }]);
  //   }
  // };
  const handleResponse = async (question) => {
    if (!question.trim() || isTyping) return;
  
    try {
      // Add user question first
      setMessages(prev => [...prev, { 
        type: 'user', 
        content: question, 
        fullContent: question 
      }]);
  
      setIsTyping(true);
  
      // First check for predefined responses
      const predefinedResponse = portfolioData[
        Object.keys(portfolioData).find(key => 
          portfolioData[key].response && 
          question.toLowerCase().includes(key.toLowerCase())
        )
      ]?.response;
  
      if (predefinedResponse) {
        setMessages(prev => [...prev, { 
          type: 'assistant', 
          content: '', 
          fullContent: predefinedResponse 
        }]);
        setCurrentlyTyping(messages.length + 1);
      } else {
        // Call the Netlify serverless function instead of OpenAI directly
        const response = await fetch('/.netlify/functions/chatbot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ question })
        });
  
        const data = await response.json();
  
        if (data.error) {
          throw new Error(data.error);
        }
  
        setMessages(prev => [...prev, { 
          type: 'assistant', 
          content: '', 
          fullContent: data.response 
        }]);
        setCurrentlyTyping(messages.length + 1);
      }
  
    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        type: 'assistant',
        content: "I apologize, but I'm having trouble responding right now. Please try again.",
        fullContent: "I apologize, but I'm having trouble responding right now. Please try again."
      }]);
    }
  };
  

  // Typing animation effect
 // In the useEffect for typing animation
useEffect(() => {
  if (currentlyTyping !== null && messages[currentlyTyping]?.content !== messages[currentlyTyping]?.fullContent) {
    const timeoutId = setTimeout(() => {
      setMessages(messages => {
        const newMessages = [...messages];
        const currentMessage = newMessages[currentlyTyping];
        if (!currentMessage) return newMessages;
        
        const nextChar = currentMessage.fullContent[currentMessage.content.length];
        
        if (nextChar) {
          currentMessage.content += nextChar;
          return newMessages;
        } else {
          // Move these state updates outside the setMessages callback
          setCurrentlyTyping(null);
          setIsTyping(false);
          return newMessages;
        }
      });
    }, 20);
    
    return () => clearTimeout(timeoutId);
  } else if (currentlyTyping !== null) {
    // Add this else block to handle completion
    setCurrentlyTyping(null);
    setIsTyping(false);
  }
}, [messages, currentlyTyping]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    handleResponse(input);
    setInput('');
  };

  const handleQuickLink = (text) => {
    if (isTyping) return;
    handleResponse(text);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <h1 className="text-3xl font-semibold text-center py-12">
        How can I assist you in exploring Sai Mounika's portfolio today?
      </h1>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 pb-8">
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div key={index} className="flex items-start gap-3">
              {message.type === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                  <span className="text-gray-600">S</span>
                </div>
              )}
              <div 
                className={`p-4 rounded-lg max-w-[85%] ${
                  message.type === 'assistant' 
                    ? 'bg-gray-100' 
                    : 'bg-blue-500 text-white ml-auto'
                }`}
              >
                <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
              </div>
            </div>
          ))}
          
          {isTyping && currentlyTyping === null && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600">S</span>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type here"
            className="w-full p-4 pr-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={isTyping}
            className={`absolute right-2 top-1/2 -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              isTyping ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Send size={20} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {quickLinks.map((link, index) => (
            <button
              key={index}
              onClick={() => handleQuickLink(link.text)}
              disabled={isTyping}
              className={`flex items-center gap-2 p-4 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm ${
                isTyping ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.text}</span>
            </button>
          ))}
        </div>
      </div>

      <footer className="text-center py-4 text-gray-600">
        Built with love ❤️ by Sai Mounika
      </footer>
    </div>
  );
};

export default ChatInterface;