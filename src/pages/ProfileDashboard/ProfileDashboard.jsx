import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import ProfileHeader from '../../components/features/ProfileHeader';
import TabsNav from '../../components/features/TabsNav';
import ListingsGrid from '../../components/features/ListingsGrid';
import ChatInterface from '../../components/features/ChatInterface';
import { mockUser, mockMyListings, mockSavedListings, mockChats } from '../../data/mockUserData';
import { User, LogIn } from 'lucide-react';

const ProfileDashboard = () => {
  // Auth Simulation
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(mockUser);
  const [myListings, setMyListings] = useState(mockMyListings);
  const [savedListings, setSavedListings] = useState(mockSavedListings);
  const [chats, setChats] = useState(mockChats);

  // Sync auth with localStorage
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    // TODO: Replace with real API authentication
    console.log('User logged in via mock auth');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    console.log('User logged out');
  };

  const handleEditProfile = () => {
    // TODO: Implement actual edit modal/form
    alert('Edit Profile Modal would open here. \nTODO: Integrate with backend API.');
  };

  const handleListingAction = (action, id) => {
    if (action === 'delete') {
      if (window.confirm('Are you sure you want to delete this listing?')) {
        // TODO: Replace with API DELETE request
        setMyListings(prev => prev.filter(item => item.id !== id));
        console.log(`Deleted listing ${id} (Mock Action)`);
      }
    } else if (action === 'edit') {
      alert(`Editing listing ${id}. \nTODO: Implement edit listing page/modal.`);
    }
  };

  const handleSavedAction = (action, id) => {
    if (action === 'remove') {
      // TODO: Replace with API unsave request
      setSavedListings(prev => prev.filter(item => item.id !== id));
      console.log(`Removed listing ${id} from saved (Mock Action)`);
    }
  };

  const handleSendMessage = (chatId, text) => {
    const newMessage = {
      id: Date.now(),
      sender: 'me',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // TODO: Send message to backend via WebSocket or API
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, messages: [...chat.messages, newMessage], lastActive: 'Just now' }
        : chat
    ));
    console.log(`Sent message to chat ${chatId}: ${text}`);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-md mx-auto mt-32 px-4 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
            <User className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Login to Your Account</h1>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Access your personalized dashboard, manage listings, and chat with property owners.
          </p>
          <div className="space-y-3">
            <button 
              onClick={handleLogin}
              className="w-full bg-primary-600 text-white font-bold py-3.5 rounded-xl hover:bg-primary-700 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5" />
              Sign In (Simulation)
            </button>
            <button 
              className="w-full bg-white text-slate-700 border border-slate-200 font-bold py-3.5 rounded-xl hover:bg-slate-50 transition-all active:scale-[0.98]"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <ProfileHeader 
          user={user} 
          onEdit={handleEditProfile} 
          onLogout={handleLogout} 
        />

        <div className="mt-10">
          <TabsNav activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTab === 'profile' && (
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Profile Details</h2>
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5 block">Full Name</label>
                    <p className="p-3.5 bg-slate-50 rounded-xl text-slate-700 font-medium border border-slate-100">{user.name}</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5 block">Email Address</label>
                      <p className="p-3.5 bg-slate-50 rounded-xl text-slate-700 font-medium border border-slate-100">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5 block">Phone Number</label>
                      <p className="p-3.5 bg-slate-50 rounded-xl text-slate-700 font-medium border border-slate-100">{user.phone}</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1.5 block">Bio</label>
                    <p className="p-3.5 bg-slate-50 rounded-xl text-slate-700 font-medium border border-slate-100 leading-relaxed">{user.bio}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'listings' && (
              <ListingsGrid 
                items={myListings} 
                type="listings" 
                onAction={handleListingAction} 
              />
            )}

            {activeTab === 'saved' && (
              <ListingsGrid 
                items={savedListings} 
                type="saved" 
                onAction={handleSavedAction} 
              />
            )}

            {activeTab === 'messages' && (
              <ChatInterface 
                chats={chats} 
                onSendMessage={handleSendMessage} 
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileDashboard;
