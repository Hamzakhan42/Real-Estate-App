import React, { useState, useRef, useEffect } from 'react';
import { Send, User, MessageSquare } from 'lucide-react';
import { cn } from '../../utils/cn';

const ChatInterface = ({ chats, onSendMessage }) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const chatEndRef = useRef(null);

  const selectedChat = chats.find(c => c.id === selectedChatId);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChat?.messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChatId) return;
    
    onSendMessage(selectedChatId, newMessage);
    setNewMessage('');
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row h-[600px]">
      {/* Sidebar - Chat List */}
      <div className="w-full md:w-80 border-r border-slate-100 flex flex-col">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary-600" />
            Messages
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setSelectedChatId(chat.id)}
              className={cn(
                "w-full p-4 flex flex-col text-left transition-colors border-b border-slate-50",
                selectedChatId === chat.id ? "bg-primary-50" : "hover:bg-slate-50"
              )}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm text-slate-900 truncate pr-2">{chat.propertyName}</span>
                <span className="text-[10px] text-slate-400 whitespace-nowrap">{chat.lastActive}</span>
              </div>
              <p className="text-xs text-slate-500 truncate">
                {chat.messages[chat.messages.length - 1]?.text || 'No messages yet'}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        {selectedChat ? (
          <>
            <div className="p-4 bg-white border-b border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <User className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">{selectedChat.propertyName}</h3>
                <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Property Owner</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {selectedChat.messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex flex-col max-w-[80%]",
                    msg.sender === 'me' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div className={cn(
                    "px-4 py-2 rounded-2xl text-sm shadow-sm",
                    msg.sender === 'me' 
                      ? "bg-primary-600 text-white rounded-tr-none" 
                      : "bg-white text-slate-700 rounded-tl-none border border-slate-100"
                  )}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-2">
              <input 
                type="text" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500 transition-all outline-none"
              />
              <button 
                type="submit"
                className="p-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all active:scale-95 disabled:opacity-50"
                disabled={!newMessage.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8" />
            </div>
            <p className="font-medium">Select a conversation to start chatting</p>
            <p className="text-sm mt-1">Connect with property owners and agents.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
