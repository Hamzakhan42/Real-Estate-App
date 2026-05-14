import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import PropertyDetails from './pages/PropertyDetails/PropertyDetails'
import ProfileDashboard from './pages/ProfileDashboard/ProfileDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/profile" element={<ProfileDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
