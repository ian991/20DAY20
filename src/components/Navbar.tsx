import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLayananOpen, setIsLayananOpen] = useState(false);
  const [isMobileLayananOpen, setIsMobileLayananOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomeActive = location.pathname === '/';
  const isLayananActive = location.pathname === '/layanan';
  const isEstimasiActive = location.pathname === '/estimasi-harga';
  const isKonsultasiActive = location.pathname === '/konsultasi';

  const services = [
    { name: 'Jasa Skripsi', hash: '#skripsi', info: 'Bimbingan, bab demi bab, & bimbingan sidang' },
    { name: 'Tugas & Makalah', hash: '#tugas', info: 'Makalah, essay, paper, & pengerjaan jurnal' },
    { name: 'Edit & Ketik', hash: '#edit-ketik', info: 'Formatting layout, Mendeley, & ketik ulang' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#FFFDF9]/95 backdrop-blur-md border-b-2 border-black/80 shadow-[0_2px_15px_rgba(0,0,0,0.06)] py-2.5' 
        : 'bg-transparent border-b-0 py-4 pb-2'
    }`}>
      <div className="flex justify-between items-center px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Sisi Kiri: Logo & Brand */}
        <Link 
          to="/" 
          onClick={() => { setIsMenuOpen(false); setIsLayananOpen(false); }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-xl font-black text-black tracking-tight font-sans flex items-center">
                20<span className="text-secondary bg-black px-2 py-0.5 rounded ml-0.5 text-white border border-black shadow-[1.5px_1.5px_0px_0px_#000]">Day</span>
              </span>
            </div>
          </div>
        </Link>

        {/* Sisi Tengah: Menu Navigasi (Desktop) */}
        <div className="hidden md:flex items-center gap-5 lg:gap-6">
          <Link
            to="/"
            onClick={() => setIsLayananOpen(false)}
            className={`text-xs font-black uppercase transition-all py-1.5 px-3 rounded-lg border-2 ${
              isHomeActive 
                ? 'bg-amber-300 border-black text-black shadow-[2px_2px_0px_0px_#000]' 
                : 'border-transparent text-slate-800 hover:border-black hover:bg-slate-100'
            }`}
          >
            Home
          </Link>

          {/* Interactive Layanan Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsLayananOpen(true)}
            onMouseLeave={() => setIsLayananOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsLayananOpen(!isLayananOpen)}
              className={`text-xs font-black uppercase flex items-center gap-1 py-1.5 px-3 cursor-pointer rounded-lg border-2 transition-all ${
                isLayananActive 
                  ? 'bg-amber-300 border-black text-black shadow-[2px_2px_0px_0px_#000]' 
                  : 'border-transparent text-slate-800 hover:border-black hover:bg-slate-100'
              }`}
            >
              Layanan
              <span className={`material-symbols-outlined text-base transition-transform duration-200 ${isLayananOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>

            {/* Dropdown Card */}
            <AnimatePresence>
              {isLayananOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.1 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_#000] mt-2 p-2 flex flex-col gap-1 z-50"
                >
                  {services.map((srv) => (
                    <Link
                      key={srv.name}
                      to={`/layanan${srv.hash}`}
                      onClick={() => setIsLayananOpen(false)}
                      className="px-4 py-2.5 rounded-lg hover:bg-teal-50 border-2 border-transparent hover:border-black transition-all group/item block text-left"
                    >
                      <p className="text-xs font-black text-slate-900 group-hover/item:text-teal-600 transition-colors">
                        {srv.name}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                        {srv.info}
                      </p>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/layanan"
            onClick={() => setIsLayananOpen(false)}
            className={`text-xs font-black uppercase transition-all py-1.5 px-3 rounded-lg border-2 ${
              isLayananActive 
                ? 'bg-amber-300 border-black text-black shadow-[2px_2px_0px_0px_#000]' 
                : 'border-transparent text-slate-800 hover:border-black hover:bg-slate-100'
            }`}
          >
            Daftar Harga
          </Link>

          <Link
            to="/konsultasi"
            onClick={() => setIsLayananOpen(false)}
            className={`text-xs font-black uppercase transition-all py-1.5 px-3 rounded-lg border-2 flex items-center gap-1 ${
              isKonsultasiActive 
                ? 'bg-[#2DD4BF] border-black text-black shadow-[2px_2px_0px_0px_#000]' 
                : 'border-transparent text-slate-800 hover:border-black hover:bg-slate-100'
            }`}
          >
            Konsultasi Tanya Admin
          </Link>
        </div>

        {/* Sisi Kanan: CTA + Badge (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <Link 
            to="/estimasi-harga#kalkulator" 
            onClick={() => setIsLayananOpen(false)}
            className="px-4 py-2 bg-white text-black text-xs font-black uppercase border-2 border-black rounded-xl hover:bg-slate-50 shadow-[2px_2px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#000] transition-all"
          >
            Hitung Estimasi
          </Link>

          <Link 
            to="/konsultasi" 
            onClick={() => setIsLayananOpen(false)}
            className="px-5 py-2 rounded-xl text-xs font-black uppercase text-white bg-green-500 hover:bg-green-600 border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_0px_#000] transition-all flex items-center gap-1.5 animate-bounce-slow"
          >
            <span className="material-symbols-outlined text-sm font-black animate-pulse">chat</span>
            Konsul Gratis
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-11 h-11 flex items-center justify-center text-black border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000] hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FFFDF9] border-t-2 border-black overflow-hidden"
          >
            <div className="flex flex-col p-5 gap-4">
              
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-black uppercase py-2 px-3 border-2 border-black rounded-lg ${isHomeActive ? 'bg-amber-300' : 'bg-white'}`}
              >
                Home
              </Link>

              {/* Collapsible Mobile Layanan dropdown */}
              <div className="border-2 border-black bg-white rounded-xl p-3">
                <button
                  type="button"
                  onClick={() => setIsMobileLayananOpen(!isMobileLayananOpen)}
                  className="w-full flex justify-between items-center text-base font-black text-black"
                >
                  <span>LAYANAN KAMI</span>
                  <span className={`material-symbols-outlined transition-transform duration-200 ${isMobileLayananOpen ? 'rotate-180' : ''}`}>
                    expand_more
                  </span>
                </button>

                <AnimatePresence>
                  {isMobileLayananOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-2 flex flex-col gap-2 mt-3 overflow-hidden border-l-2 border-black"
                    >
                      {services.map((srv) => (
                        <Link
                          key={srv.name}
                          to={`/layanan${srv.hash}`}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-sm font-bold text-slate-700 hover:text-teal-600 px-2 py-1"
                        >
                          {srv.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                to="/layanan" 
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-black uppercase py-2 px-3 border-2 border-black rounded-lg ${isLayananActive ? 'bg-amber-300' : 'bg-white'}`}
              >
                Daftar Harga
              </Link>

              <Link 
                to="/konsultasi" 
                onClick={() => setIsMenuOpen(false)}
                className={`text-base font-black uppercase py-2 px-3 border-2 border-black rounded-lg ${isKonsultasiActive ? 'bg-[#2DD4BF]' : 'bg-white'}`}
              >
                Konsultasi Tanya Admin
              </Link>

              {/* Mobile CTA */}
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center gap-2 justify-center select-none text-[11px] font-black text-black bg-teal-300 border-2 border-black py-2.5 rounded-xl shadow-[3px_3px_0px_0px_#000]">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping"></span>
                  Bebas Revisi & Konsultasi Selamanya
                </div>
                
                <Link 
                  to="/konsultasi" 
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-[#2DD4BF] text-black border-2 border-black w-full py-3.5 rounded-xl text-center font-black uppercase shadow-[3px_3px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">chat</span>
                  Konsultasi Sekarang
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
