import React from 'react';
import { MapPin, Trash2, Edit2, Heart } from 'lucide-react';
import { cn } from '../../utils/cn';

const ListingsGrid = ({ items, type = 'listings', onAction }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
        <p className="text-slate-500 font-medium">No {type === 'listings' ? 'listings' : 'saved properties'} found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item) => (
        <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300">
          <div className="relative aspect-video overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {type === 'listings' && (
              <div className={cn(
                "absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm",
                item.status === 'active' ? "bg-green-500 text-white" : "bg-amber-500 text-white"
              )}>
                {item.status}
              </div>
            )}
          </div>
          
          <div className="p-4">
            <h3 className="font-bold text-slate-900 truncate">{item.title}</h3>
            <p className="text-primary-600 font-bold mt-1">{item.price}</p>
            <div className="flex items-center gap-1 text-slate-400 text-xs mt-2">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{item.location}</span>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-50">
              {type === 'listings' ? (
                <>
                  <button 
                    onClick={() => onAction('edit', item.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button 
                    onClick={() => onAction('delete', item.id)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => onAction('remove', item.id)}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-slate-50 text-slate-700 rounded-lg text-xs font-bold hover:bg-red-50 hover:text-red-600 transition-all group/btn"
                >
                  <Heart className="w-3 h-3 fill-red-500 text-red-500 group-hover/btn:fill-none" />
                  Remove from Saved
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingsGrid;
