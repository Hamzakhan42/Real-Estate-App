import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import PropertyDetails from './pages/PropertyDetails/PropertyDetails'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
