import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Layanan() {
  const [showAlert, setShowAlert] = useState(true);
  const [activeCategory, setActiveCategory] = useState<number | null>(0);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location.hash]);

  const mainPackages = [
    { 
      title: 'Pilihan Per Halaman', 
      price: 'Rp20.000', 
      suffix: '/Halaman', 
      desc: 'Sangat cocok untuk revisi minor, pengerjaan abstrak, atau penambahan sub-bab tertentu.' 
    },
    { 
      title: 'Pilihan Per Bab', 
      price: 'Rp250rb - 500rb', 
      suffix: '/Bab', 
      desc: 'Harga menyesuaikan tingkat kesulitan analisis metodologi, tinjauan pustaka, dan kedalaman riset.' 
    },
    { 
      title: 'PAKET FULL SKRIPSI', 
      price: 'Rp1.25 - 2.25 Jt', 
      suffix: '/Hingga Lulus', 
      desc: 'Pendampingan penuh terjamin dari judul, draft proposal, olah data kualitatif/kuantitatif, hingga gladi resik sidang.',
      featured: true 
    }
  ];

  const serviceCategories = [
    {
      title: 'EDIT DAN LAYOUTING',
      icon: 'format_paint',
      items: [
        { name: 'Format EYD / PUEBI', price: 'Rp1.500', unit: '/hlm' },
        { name: 'Format EYD + Perbaikan Typo', price: 'Rp2.500', unit: '/hlm' },
        { name: 'Daftar Pustaka & Mendeley', price: 'Rp3.500', unit: '/sumber' },
        { name: 'Tabel, Gambar, & Lampiran', price: 'Rp5.000 - 10.000', unit: '/file' },
        { name: 'Penomoran Halaman Kustom', price: 'Rp1.500', unit: '/10 hlm' },
      ]
    },
    {
      title: 'TUGAS KULIAH',
      icon: 'assignment',
      items: [
        { name: 'Makalah (Materi didesain admin)', price: 'Rp5.000', unit: '/hlm' },
        { name: 'Essay / Artikel Populer', price: 'Rp7.500', unit: '/hlm' },
        { name: 'Studi Kasus / Bedah Jurnal', price: 'Rp10.000', unit: '/hlm' },
        { name: 'Penyusunan Jurnal Ilmiah', price: 'Rp12.000', unit: '/hlm' },
        { name: 'PowerPoint / Canva Slide Premium', price: 'Rp3.000', unit: '/slide' },
      ]
    },
    {
      title: 'TULIS & KETIK CEPAT',
      icon: 'keyboard',
      items: [
        { name: 'TULIS TANGAN RAPI', isHeader: true },
        { name: 'Double Folio / Buku / Binder', price: 'Rp3.000', unit: '/hlm' },
        { name: 'JASA KETIK DOKUMEN', isHeader: true },
        { name: 'MS Word (Ketik Ulang / Audio)', price: 'Rp2.500', unit: '/hlm' },
      ]
    }
  ];

  return (
    <div className="pt-24 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      <AnimatePresence>
        {showAlert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAlert(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white w-full max-w-xl rounded-xl border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-50"
            >
              <div className="bg-amber-300 border-b-4 border-black p-4 flex items-center gap-3 font-black text-black">
                <span className="material-symbols-outlined text-xl">payments</span>
                <span>INFO TARIF KAK!!</span>
              </div>
              <div className="p-6 md:p-8">
                <p className="text-slate-800 font-bold leading-relaxed mb-6 text-sm md:text-base text-left">
                  Harap diperhatikan bahwa harga yang tercantum di website ini bersifat <span className="underline decoration-2">estimasi awal</span>. 
                  <br /><br />
                  Tarif final bervariasi bergantung pada tingkat kompleksitas materi, deadline pengerjaan yang diinginkan, serta kebutuhan revisi kustom. Silakan hubungi tim Admin kami guna mendapatkan penawaran harga yang paling akurat bagi kebutuhan tugas Anda!
                </p>
                
                <button 
                  onClick={() => setShowAlert(false)}
                  className="w-full bg-secondary text-black py-4 border-2 border-black rounded-lg font-black uppercase tracking-wider shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all cursor-pointer"
                >
                  Saya Mengerti & Setuju
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 mb-20 bg-teal-50 border-4 border-black p-8 md:p-12 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-amber-300 border-2 border-black text-black px-4 py-1.5 rounded-full text-xs font-black tracking-wide shadow-[1.5px_1.5px_0px_#000]">
            <span className="material-symbols-outlined text-sm">sell</span> PRICELIST 2024
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-black leading-tight mt-6 mb-4 uppercase">
            Investasi Cerdas Untuk Masa Depan Akademikmu
          </h1>
          <p className="text-base font-bold text-slate-800 leading-relaxed mb-8">
            Tarif transparan dengan kualitas terbaik tanpa kompromi. Selesaikan tugas-tugas perguruan tinggi bersama bantuan tim berpengalaman.
          </p>
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
             <a href="#skripsi" className="bg-secondary text-black font-black uppercase tracking-wider px-8 py-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] active:shadow-[1px_1px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2">
               Lihat Unit Jasa <span className="material-symbols-outlined font-black">south</span>
             </a>
             <Link to="/konsultasi" className="bg-white hover:bg-slate-50 text-black font-black uppercase tracking-wider px-8 py-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] transition-all flex items-center">
               Konsultasi Gratis
             </Link>
          </div>
        </div>
        <div className="hidden lg:flex flex-1 justify-center max-w-sm">
           <img 
             alt="Mascot Laptop" 
             className="w-full drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] pointer-events-none" 
             src="/3.png" 
             referrerPolicy="no-referrer"
           />
        </div>
      </div>

      {/* Skripsi Packages */}
      <div id="skripsi" className="bg-white p-8 md:p-12 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12 scroll-mt-24">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary font-black">star</span>
            <span className="text-xs uppercase font-black tracking-widest text-black">SPESIALIS LAYANAN</span>
          </div>
          <div className="bg-teal-300 border-2 border-black text-black px-4 py-2 rounded-lg text-xs font-black uppercase flex items-center gap-2 shadow-[2px_2px_0px_#000]">
            <span className="material-symbols-outlined text-sm">verified</span> BEBAS REVISI SEPUASNYA
          </div>
        </div>
        
        <h2 className="text-3xl font-black text-black mb-10 uppercase tracking-tight">Katalog Jasa Skripsi</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {mainPackages.map((pkg, i) => (
            <div 
              key={i} 
              className={`p-6 rounded-xl border-3 border-black transition-all ${
                pkg.featured 
                  ? 'bg-amber-300 text-black shadow-[5px_5px_0px_0px_#000]' 
                  : 'bg-[#FFFDF9] text-black hover:-translate-y-1 shadow-[4px_4px_0px_0px_#000]'
              }`}
            >
              <p className="text-[10px] uppercase font-black text-slate-500 mb-2">{pkg.title}</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-black">{pkg.price}</span>
                <span className="text-xs font-black font-mono text-slate-600">{pkg.suffix}</span>
              </div>
              <p className="text-xs font-bold leading-relaxed text-slate-800">{pkg.desc}</p>
            </div>
          ))}
        </div>
        
        <Link 
          to="/konsultasi?layanan=Jasa Skripsi" 
          className="w-full bg-secondary text-black py-4 md:py-5 border-2 border-black rounded-xl font-black uppercase shadow-[4px_4px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-3 text-base"
        >
          Pesan Bimbingan Skripsi Sekarang <span className="material-symbols-outlined font-black">arrow_forward</span>
        </Link>
      </div>

      {/* Other Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {serviceCategories.map((cat, i) => {
          const lowerTitle = cat.title.toLowerCase();
          const targetId = lowerTitle.includes('edit') 
            ? 'edit-ketik' 
            : lowerTitle.includes('tugas') 
              ? 'tugas' 
              : `cat-${i}`;
          
          return (
            <div 
              key={i} 
              id={targetId}
              className="bg-white rounded-xl border-4 border-black flex flex-col overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] scroll-mt-24"
            >
              <button 
                onClick={() => setActiveCategory(activeCategory === i ? null : i)}
                className="w-full p-6 bg-slate-50 border-b-3 border-black flex items-center justify-between md:cursor-default"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-200 border-2 border-black rounded-lg flex items-center justify-center text-black shadow-[2px_2px_0px_#000]">
                    <span className="material-symbols-outlined text-lg">{cat.icon}</span>
                  </div>
                  <h3 className="font-extrabold text-black uppercase tracking-wider text-sm text-left">{cat.title}</h3>
                </div>
                <span className={`material-symbols-outlined transition-transform md:hidden text-black ${activeCategory === i ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              
              <AnimatePresence>
                {(activeCategory === i) && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 pt-4 flex-1 flex flex-col overflow-hidden md:hidden"
                  >
                    <div className="flex-1 space-y-3.5 mb-6">
                      {cat.items.map((item, j) => (
                        <div key={j} className={`flex justify-between items-center ${item.isHeader ? 'pt-3 pb-1 border-b-2 border-black mb-1 text-black' : 'text-slate-800'}`}>
                          {item.isHeader ? (
                            <span className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 text-black">
                               {cat.icon === 'keyboard' && <span className="material-symbols-outlined text-[12px]">edit_note</span>}
                               {item.name}
                            </span>
                          ) : (
                            <>
                              <span className="text-xs font-bold">{item.name}</span>
                              <div className="text-right">
                                <span className="text-xs font-black text-black">{item.price}</span>
                                <span className="text-[9px] font-bold text-slate-500 ml-0.5">{item.unit}</span>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <Link to={`/konsultasi?layanan=${cat.title === 'TUGAS KULIAH' ? 'Tugas & Makalah' : 'Edit & Ketik'}`} className="w-full py-3 bg-secondary text-black text-xs font-black uppercase border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 text-center mt-auto">Pesan Sekarang</Link>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Desktop View (Always Visible) */}
              <div className="hidden md:flex px-6 pb-6 pt-4 flex-1 flex-col overflow-hidden">
                <div className="flex-1 space-y-3.5 mb-6">
                  {cat.items.map((item, j) => (
                    <div key={j} className={`flex justify-between items-center ${item.isHeader ? 'pt-3 pb-1 border-b-2 border-black mb-1 text-black' : 'text-slate-800'}`}>
                      {item.isHeader ? (
                        <span className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 text-black">
                           {cat.icon === 'keyboard' && <span className="material-symbols-outlined text-[12px]">edit_note</span>}
                           {item.name}
                        </span>
                      ) : (
                        <>
                          <span className="text-xs font-bold">{item.name}</span>
                          <div className="text-right">
                            <span className="text-xs font-black text-black">{item.price}</span>
                            <span className="text-[9px] font-bold text-slate-500 ml-0.5">{item.unit}</span>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                
                <Link to={`/konsultasi?layanan=${cat.title === 'TUGAS KULIAH' ? 'Tugas & Makalah' : 'Edit & Ketik'}`} className="w-full py-3 bg-secondary text-black text-xs font-black uppercase border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] text-center mt-auto">Pesan Sekarang</Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Methods & Terms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-yellow-100 p-8 md:p-10 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-lg">info</span>
            </div>
            <h3 className="text-xl font-black uppercase text-black">Ketentuan Layanan</h3>
          </div>
          <div className="space-y-4">
             <div className="bg-white p-5 rounded-xl border-3 border-black shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-secondary text-lg">payments</span>
                  <span className="font-extrabold text-sm text-black">Uang Muka (DP) 50%</span>
                </div>
                <p className="text-[12px] font-bold text-slate-700 leading-relaxed">Pelanggan wajib menyelesaikan pembayaran uang muka (DP) sebesar 50% di awal sebelum materi mulai dieksekusi oleh tim kami.</p>
             </div>
             <div className="bg-white p-5 rounded-xl border-3 border-black shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-secondary text-lg">check_circle</span>
                  <span className="font-extrabold text-sm text-black">Pelunasan Berkas</span>
                </div>
                <p className="text-[12px] font-bold text-slate-700 leading-relaxed">Pelunasan sisa tagihan wajib diselesaikan tepat sebelum file dokumen final dikirimkan sepenuhnya kepada Anda.</p>
             </div>
             <div className="bg-white p-5 rounded-xl border-3 border-black shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-secondary text-lg">schedule</span>
                  <span className="font-extrabold text-sm text-black">Fleksibilitas Tarif</span>
                </div>
                <p className="text-[12px] font-bold text-slate-700 leading-relaxed">Harga bersifat fleksibel dan bersahabat bagi kantong mahasiswa. Kecepatan pengerjaan kilat dapat menambah tarif dasar.</p>
             </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-black uppercase text-black mb-2">Metode Pembayaran Resmi</h3>
          <p className="text-xs font-bold text-slate-600 mb-8 max-w-sm">Kami menerima berbagai opsi transfer aman berbasis QRIS, Dompet Digital, maupun Mobile Banking berikut:</p>
          
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            {['Bank BCA', 'DANA', 'ShopeePay', 'SeaBank'].map((p) => (
              <div key={p} className="p-4 bg-teal-50 border-2 border-black rounded-lg shadow-[2px_2px_0px_#000] flex flex-col items-center gap-1 group hover:-translate-y-0.5 transition-all">
                <span className="text-base font-black text-black">{p}</span>
                <span className="text-[9px] uppercase font-bold text-slate-500">TERVERIFIKASI ORDER</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-amber-100 px-4 py-3 rounded-lg border-2 border-black flex items-center gap-2 text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000]">
            <span className="material-symbols-outlined text-sm">verified</span>
            Seluruh transaksi diproses terenkripsi aman
          </div>
        </div>
      </div>
    </div>
  );
}

