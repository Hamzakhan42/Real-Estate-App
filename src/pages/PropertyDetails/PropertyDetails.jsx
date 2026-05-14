import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {
  Bed, Bath, Maximize, MapPin, ChevronLeft, Share2,
  Heart, X, ChevronRight, Dog, Wallet, Ruler, CheckCircle2,
} from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import { properties } from '../../utils/mockData'
import { stripTicks } from '../../utils/format'
import { setupLeafletIcons } from '../../utils/leaflet'
import Navbar from '../../components/layout/Navbar'

setupLeafletIcons()

const Lightbox = ({ images, index, onClose, onNext, onPrev }) => (
  <div
    className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300"
    onClick={onClose}
  >
    <button
      className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-[110]"
      onClick={onClose}
    >
      <X className="w-8 h-8" />
    </button>
    <button
      className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white bg-white/5 hover:bg-white/15 rounded-full transition-all z-[110]"
      onClick={onPrev}
    >
      <ChevronLeft className="w-10 h-10" />
    </button>
    <button
      className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 text-white/70 hover:text-white bg-white/5 hover:bg-white/15 rounded-full transition-all z-[110]"
      onClick={onNext}
    >
      <ChevronRight className="w-10 h-10" />
    </button>
    <div
      className="relative max-w-5xl max-h-[85vh] px-4 w-full h-full flex items-center justify-center"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={stripTicks(images[index])}
        alt="Lightbox"
        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
      />
      <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 bg-white/10 px-4 py-1.5 rounded-full text-white text-sm font-medium backdrop-blur-md">
        {index + 1} / {images.length}
      </div>
    </div>
  </div>
)

const FeatureCard = ({ icon: Icon, label, value }) => (
  <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:shadow-md group">
    <div className="p-3 bg-white rounded-xl shadow-sm mr-4 group-hover:bg-primary-50 transition-colors">
      <Icon className="w-6 h-6 text-primary-600" />
    </div>
    <div>
      <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{label}</p>
      <p className="text-base font-bold text-slate-900">{value}</p>
    </div>
  </div>
)

const PropertyDetails = () => {
  const { id } = useParams()
  const property = properties.find((p) => p.id === parseInt(id))
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const allImages = property ? [property.image, ...(property.images || [])] : []

  const openLightbox = (index) => {
    setCurrentImageIndex(index)
    setIsLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    document.body.style.overflow = 'auto'
  }

  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  useEffect(() => {
    const onKeyDown = (e) => {
      if (!isLightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage(e)
      if (e.key === 'ArrowLeft') prevImage(e)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isLightboxOpen])

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Property not found</h2>
          <Link to="/" className="mt-4 text-primary-600 hover:underline">Go back home</Link>
        </div>
      </div>
    )
  }

  const features = [
    { icon: Bed, label: 'Rooms', value: `${property.beds} Beds • ${property.baths} Baths` },
    { icon: Ruler, label: 'Property Size', value: property.area },
    { icon: Dog, label: 'Pet Policy', value: property.petPolicy || 'Contact Agent' },
    { icon: Wallet, label: 'Monthly Fees', value: property.maintenanceFee || 'Included' },
    { icon: CheckCircle2, label: 'Security Deposit', value: property.securityDeposit || '1 Month' },
    { icon: Maximize, label: 'Property Type', value: property.type },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to listings
          </Link>
          <div className="flex gap-3">
            <button className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors">
              <Share2 className="w-5 h-5 text-slate-600" />
            </button>
            <button className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-colors">
              <Heart className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full uppercase tracking-wider">
                {property.type}
              </span>
              <span className="flex items-center text-slate-500 text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {property.location}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{property.name}</h1>
          </div>
          <div className="text-left md:text-right">
            <p className="text-slate-500 text-sm mb-1 uppercase font-semibold tracking-widest">Price</p>
            <p className="text-3xl font-bold text-primary-600">{property.price}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12 h-[300px] md:h-[500px]">
          <div
            className="lg:col-span-3 rounded-2xl overflow-hidden shadow-lg border border-slate-100 cursor-zoom-in"
            onClick={() => openLightbox(0)}
          >
            <img
              src={stripTicks(property.image)}
              alt={property.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
          <div className="hidden lg:grid grid-rows-3 gap-4">
            {(property.images || []).map((img, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-md border border-slate-100 h-full cursor-zoom-in"
                onClick={() => openLightbox(index + 1)}
              >
                <img
                  src={stripTicks(img)}
                  alt={`${property.name} gallery ${index}`}
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Features & Policies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((f) => (
                  <FeatureCard key={f.label} {...f} />
                ))}
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Description</h2>
              <p className="text-slate-600 leading-relaxed text-lg">{property.description}</p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {property.amenities?.map((amenity, idx) => (
                  <div key={idx} className="flex items-center p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-primary-500 mr-3" />
                    <span className="text-sm font-medium text-slate-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="bg-slate-950 rounded-2xl p-6 text-white shadow-xl shadow-slate-900/20">
                <h3 className="text-xl font-bold mb-4">Interested in this?</h3>
                <p className="text-slate-400 text-sm mb-6">Contact our agent today to schedule a viewing or get more details.</p>
                <div className="space-y-4">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98]">
                    Send Message
                  </button>
                  <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl transition-all border border-white/10">
                    Call Agent
                  </button>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg h-[300px]">
                <MapContainer center={[property.lat, property.lng]} zoom={15} scrollWheelZoom={false} className="w-full h-full z-0">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[property.lat, property.lng]}>
                    <Popup>
                      <span className="font-bold">{property.name}</span>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isLightboxOpen && (
        <Lightbox
          images={allImages}
          index={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </div>
  )
}

export default PropertyDetails