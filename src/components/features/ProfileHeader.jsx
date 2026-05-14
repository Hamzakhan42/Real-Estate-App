import React from 'react';
import { Mail, Phone, Calendar, Edit2, LogOut } from 'lucide-react';

const ProfileHeader = ({ user, onEdit, onLogout }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary-600 to-blue-400" />
      <div className="px-6 pb-6 -mt-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="relative group">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <button 
                onClick={onEdit}
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-slate-100 text-slate-600 hover:text-primary-600 transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center md:text-left mb-2">
              <h1 className="text-3xl font-bold text-slate-900">{user.name}</h1>
              <p className="text-slate-500 mt-1">{user.bio}</p>
            </div>
          </div>
          
          <div className="flex gap-3 mb-2">
            <button 
              onClick={onEdit}
              className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center gap-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
            <button 
              onClick={onLogout}
              className="p-2.5 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-all border border-red-100"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-50">
          <div className="flex items-center gap-3 text-slate-600">
            <div className="p-2 bg-slate-50 rounded-lg">
              <Mail className="w-4 h-4 text-primary-600" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Email</p>
              <p className="text-sm font-medium truncate">{user.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-slate-600">
            <div className="p-2 bg-slate-50 rounded-lg">
              <Phone className="w-4 h-4 text-primary-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Phone</p>
              <p className="text-sm font-medium">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <div className="p-2 bg-slate-50 rounded-lg">
              <Calendar className="w-4 h-4 text-primary-600" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Member Since</p>
              <p className="text-sm font-medium">{user.joinDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
