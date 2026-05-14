import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Smile, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * MessengerChat Component
 * A functional frontend-only chat window for property inquiries.
 */
const MessengerChat = ({ 
  property = { name: 'this property' }, 
  owner = { name: 'Property Owner', avatar: 'https://i.pravatar.cc/100?img=11' },
  onClose 
}) => {
  // Mock initial messages
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'owner', 
      text: `Hi there! I'm the owner of ${property.name}. How can I help you today?`, 
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      seen: true 
    },
    { 
      id: 2, 
      sender: 'me', 
      text: 'Hello! Is this property still available for viewing this weekend?', 
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      seen: true 
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Time formatter helper
  const formatTime = (date) => {
    if (!date) return '';
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return 'Yesterday';
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  // Handle sending a message
  const handleSend = () => {
    if (!inputText.trim()) return;
    
    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text: inputText.trim(),
      timestamp: new Date(),
      seen: false
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    
    // TODO: Replace with real API/Socket call
    console.log('Sending message to API...', newMessage);

    // Mock owner reply after 1.5-2.5 seconds
    setTimeout(() => {
      setIsTyping(true);
      
      setTimeout(() => {
        const replies = [
          "Thanks for your interest! I'll get back to you soon.",
          "Yes, this property is still available. Would you like to schedule a visit?",
          "Great question! Let me check and update you.",
          "Feel free to ask anything about this property."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender: 'owner',
          text: randomReply,
          timestamp: new Date(),
          seen: true
        }]);
        setIsTyping(false);
      }, 2000);
    }, 1000);
  };

  // Handle Enter key to send
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden w-full max-w-md h-[500px] animate-in slide-in-from-bottom-4 duration-300">
      {/* HEADER SECTION */}
      <header className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={owner.avatar} 
              alt={owner.name} 
              className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
            />
            <span className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0 ring-2 ring-white shadow-sm" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{owner.name}</h3>
            <p className="text-[10px] text-green-500 font-medium uppercase tracking-wider">Online</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* MESSAGES SECTION */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 no-scrollbar">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 py-8 opacity-60">
            <div className="bg-gray-100 p-4 rounded-full mb-3">
              <Send className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-sm">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={cn(
                  "flex flex-col max-w-[85%] group",
                  msg.sender === 'me' ? "ml-auto items-end" : "mr-auto items-start"
                )}
              >
                <div className={cn(
                  "px-4 py-2.5 rounded-2xl text-sm shadow-sm transition-all duration-300",
                  msg.sender === 'me' 
                    ? "bg-blue-600 text-white rounded-tr-sm" 
                    : "bg-white text-gray-800 rounded-tl-sm border border-gray-100"
                )}>
                  <p className="leading-relaxed break-words">{msg.text}</p>
                </div>
                <div className="flex items-center gap-1 mt-1.5 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] text-gray-400 font-medium">
                    {formatTime(msg.timestamp)}
                  </span>
                  {msg.sender === 'me' && (
                    <Check className={cn("w-3 h-3", msg.seen ? "text-blue-500" : "text-gray-300")} />
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 mr-auto bg-white px-3 py-2 rounded-2xl border border-gray-100 shadow-sm animate-pulse">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* INPUT SECTION */}
      <footer className="p-4 border-t bg-white relative">
        <div className="relative flex items-end gap-2">
          <div className="flex-1 relative">
            <textarea 
              rows={1}
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={handleKeyDown}
              placeholder={`Type your message...`}
              className={cn(
                "w-full pl-4 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-2xl",
                "focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white",
                "resize-none transition-all outline-none text-sm leading-relaxed max-h-32"
              )}
              style={{ height: '46px' }}
            />
            <button 
              onClick={() => console.log('Emoji picker clicked (Mock)')}
              className="absolute right-3 bottom-3 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={cn(
              "p-3 rounded-xl transition-all flex items-center justify-center h-[46px] w-[46px]",
              inputText.trim() 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95" 
                : "bg-gray-100 text-gray-300 cursor-not-allowed"
            )}
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default MessengerChat;
