import { motion } from 'motion/react';
import { useState, ChangeEvent } from 'react';
import { Zap, ShieldCheck, ChevronDown, MessageSquare } from 'lucide-react';

export default function Konsultasi() {
  const [nama, setNama] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [sumber, setSumber] = useState('');
  const [layanan, setLayanan] = useState('');

  const services = [
    'Jasa Skripsi (Full)',
    'Jasa Skripsi (Per Bab)',
    'Jasa Skripsi (Per Halaman)',
    'Makalah / Artikel',
    'Essay / Jurnal',
    'Olah Data / SPSS',
    'PowerPoint (PPT)',
    'Format EYD & Layouting',
    'Daftar Pustaka (Mendeley)',
    'Tulis Tangan / Jasa Ketik'
  ];

  const handleKirim = () => {
    if (!nama || !whatsapp || !sumber || !layanan) {
      alert('Harap lengkapi semua data formulir konsultasi.');
      return;
    }

    const text = `Halo Admin, saya ingin melakukan konsultasi mengenai tugas saya.
    
Nama: ${nama}
WhatsApp: +62${whatsapp}
Layanan: ${layanan}
Mengenal 20 Day dari: ${sumber}`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/6285180972466?text=${encodedText}`, '_blank');
  };

  const handleWhatsappChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (/[^0-9]/.test(rawValue)) {
      alert('Peringatan: Hanya karakter angka yang diperbolehkan untuk nomor WhatsApp!');
    }
    const value = rawValue.replace(/\D/g, '');
    setWhatsapp(value);
  };

  return (
    <div className="pt-24 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* Info Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 relative text-left"
        >
          <img 
            alt="Mascot Illustration" 
            className="hidden lg:block w-full max-w-xs sm:max-w-sm mx-auto drop-shadow-[5px_5px_0px_#000] border-3 border-black rounded-2xl bg-white p-4" 
            src="/3.png" 
            referrerPolicy="no-referrer"
          />
          <div className="mt-8 space-y-6">
            <h1 className="text-3xl md:text-5xl font-black text-black leading-tight uppercase">Mulai Konsultasi Strategismu</h1>
            <p className="text-base font-bold text-slate-800 bg-white border-2 border-black p-4 rounded-xl shadow-[3px_3px_0px_#000]">Siap untuk menaklukkan tugas akademik dengan bimbingan ahli? Isi data singkat di samping dan hubungi admin kami.</p>
                  <div className="space-y-4">
              <div className="bg-amber-100 p-4 rounded-xl flex items-center gap-4 border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="w-10 h-10 bg-secondary border-2 border-black rounded-lg flex items-center justify-center text-black shrink-0 shadow-[1px_1px_0px_#000]">
                  <Zap className="w-5 h-5 font-black" />
                </div>
                <div>
                  <h4 className="font-extrabold text-black text-xs uppercase">Bimbingan Terjadwal</h4>
                  <p className="text-[11px] font-bold text-slate-600">Konsultasi interaktif dan pemantauan harian.</p>
                </div>
              </div>
              <div className="bg-teal-50 p-4 rounded-xl flex items-center gap-4 border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="w-10 h-10 bg-teal-300 border-2 border-black rounded-lg flex items-center justify-center text-black shrink-0 shadow-[1px_1px_0px_#000]">
                  <ShieldCheck className="w-5 h-5 font-black" />
                </div>
                <div>
                  <h4 className="font-extrabold text-black text-xs uppercase">Kerahasiaan data mahasiswa</h4>
                  <p className="text-[11px] font-bold text-slate-600">Identitas, judul, dan dokumen tugas terjaga aman.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Input Form Column */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="lg:col-span-7 bg-white p-6 md:p-8 rounded-xl border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative mt-8 md:mt-0"
        >
          <div className="bg-secondary text-black px-4 py-2 border-2 border-black shadow-[2px_2px_0px_#000] inline-block -rotate-1 rounded font-black text-xs uppercase tracking-wider mb-4">
            20 DAY FORMULIR
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">Formulir Konsultasi</h2>
          <p className="text-sm font-bold text-slate-600 mb-6">Pastikan seluruh data yang Anda masukkan di bawah ini sudah benar.</p>
          
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-black uppercase text-black mb-2 tracking-wide">Nama Lengkap Anda</label>
              <input 
                type="text" 
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Ex. Budi Santoso" 
                className="w-full bg-[#FFFDF9] border-2 border-black rounded-lg px-4 py-3 font-bold text-black focus:bg-white outline-none transition-all shadow-[2px_2px_0px_0px_#000] text-sm" 
              />
            </div>
            
            <div>
              <label className="block text-xs font-black uppercase text-black mb-2 tracking-wide">Nomor WhatsApp Aktif</label>
              <div className="flex">
                <span className="bg-slate-100 inline-flex items-center px-4 rounded-l-lg border-2 border-r-0 border-black text-black font-black text-sm">+62</span>
                <input 
                  type="text" 
                  value={whatsapp}
                  onChange={handleWhatsappChange}
                  placeholder="851xxxxxxx" 
                  className="w-full bg-[#FFFDF9] border-2 border-black rounded-r-lg px-4 py-3 font-bold text-black focus:bg-white outline-none transition-all shadow-[2px_2px_0px_0px_#000] text-sm" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-black mb-2 tracking-wide">Layanan Yang Ingin Dikonsultasikan</label>
              <div className="relative">
                <select 
                  value={layanan}
                  onChange={(e) => setLayanan(e.target.value)}
                  className="w-full bg-[#FFFDF9] border-2 border-black rounded-lg px-4 py-3 font-bold text-black focus:bg-white outline-none transition-all appearance-none cursor-pointer text-sm shadow-[2px_2px_0px_0px_#000]"
                >
                  <option value="">Pilih Sektor Layanan</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black w-5 h-5 font-black" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-black mb-3 tracking-wide">Tahu 20 Day dari mana?</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {['TikTok', 'Instagram', 'Teman', 'Lainnya'].map((opt) => (
                  <button 
                    key={opt}
                    type="button"
                    onClick={() => setSumber(opt)}
                    className={`p-3 border-2 border-black rounded-lg text-xs font-black uppercase transition-all cursor-pointer ${
                      sumber === opt 
                      ? 'bg-secondary text-black shadow-[2px_2px_0px_0px_#000]' 
                      : 'bg-[#FFFDF9] text-black hover:bg-slate-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="button"
              onClick={handleKirim}
              className="w-full bg-[#25D366] text-black py-4 rounded-xl border-3 border-black text-xs md:text-sm font-black uppercase shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2 mt-4"
            >
              <MessageSquare className="w-5 h-5" /> 
              <span>Hubungi Admin Via WhatsApp</span>
            </button>
            <p className="text-center text-[10px] font-bold text-slate-500">Form direct wa.me ini akan otomatis memproses rincian draf konsultasi Anda secara cepat.</p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

