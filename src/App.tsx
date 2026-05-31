import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Layanan from './pages/Layanan';
import Konsultasi from './pages/Konsultasi';
import Testimoni from './pages/Testimoni';
import EstimasiHarga from './pages/EstimasiHarga';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/layanan" element={<Layanan />} />
            <Route path="/konsultasi" element={<Konsultasi />} />
            <Route path="/testimoni" element={<Testimoni />} />
            <Route path="/estimasi-harga" element={<EstimasiHarga />} />
            <Route path="/faq" element={<Home />} /> {/* Temporary redirect to Home */}
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
