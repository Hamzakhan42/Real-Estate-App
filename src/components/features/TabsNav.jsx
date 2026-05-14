import React from 'react';
import { User, Home, Heart, MessageSquare } from 'lucide-react';
import { cn } from '../../utils/cn';

const TabsNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'listings', label: 'My Listings', icon: Home },
    { id: 'saved', label: 'Saved', icon: Heart },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ];

  return (
    <div className="flex overflow-x-auto no-scrollbar gap-2 p-1 bg-slate-100 rounded-2xl mb-8">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap",
            activeTab === tab.id 
              ? "bg-white text-primary-600 shadow-sm" 
              : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
          )}
        >
          <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-primary-600" : "text-slate-400")} />
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabsNav;
