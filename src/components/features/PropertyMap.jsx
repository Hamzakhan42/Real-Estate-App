import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon bug in Vite/Webpack
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/**
 * PropertyMap Component
 * @param {Object[]} properties - Array of property objects
 * @param {number[]} center - Default map center [lat, lng]
 * @param {number} zoom - Default zoom level
 */
const PropertyMap = ({ 
  properties = [], 
  center = [33.6844, 73.0479], 
  zoom = 12 
}) => {
  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-2xl border border-white/10 group">
      <style>
        {`
          .leaflet-popup-content-wrapper {
            padding: 0;
            overflow: hidden;
            border-radius: 12px;
            background: #020617; /* slate-950 to match app */
            color: white;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .leaflet-popup-content {
            margin: 0;
            width: 250px !important;
          }
          .leaflet-popup-tip {
            background: #020617;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          .leaflet-container {
            font-family: inherit;
          }
        `}
      </style>
      
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false}
        className="z-0 h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((property) => {
          const lat = property.location?.lat || property.lat;
          const lng = property.location?.lng || property.lng;
          const title = property.title || property.name;
          const locationName = property.location?.name || property.location;
          const imageUrl = property.image?.replaceAll('`', '');

          if (!lat || !lng) return null;

          return (
            <Marker 
              key={property.id} 
              position={[lat, lng]}
            >
              <Popup className="property-popup">
                <div className="flex flex-col w-full overflow-hidden">
                  {/* Property Image */}
                  <div className="relative h-32 w-full overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt={title} 
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-white border border-white/10">
                      {property.type || 'Property'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h3 className="font-bold text-white text-base truncate mb-1">
                      {title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-primary-600 font-bold text-lg">
                        {property.price}
                      </span>
                      <span className="text-slate-400 text-[10px] flex items-center gap-1 truncate max-w-[120px]">
                        {locationName}
                      </span>
                    </div>

                    <button 
                      onClick={() => console.log(`Viewing property ${property.id}`)}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold py-2 rounded-lg transition-all duration-300 shadow-lg shadow-primary-900/20 active:scale-[0.98]"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
