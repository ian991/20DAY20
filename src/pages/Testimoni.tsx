import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

export default function Testimoni() {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    rating: 0,
    message: ''
  });

  const [hoverRating, setHoverRating] = useState(0);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.service || !formData.message) {
      alert('Mohon lengkapi semua data ya!');
      return;
    }

    const subject = encodeURIComponent(`Testimoni 20Day - ${formData.name} (${formData.service})`);
    const body = encodeURIComponent(
      `Nama: ${formData.name}\n` +
      `Layanan: ${formData.service}\n` +
      `Rating: ${formData.rating}/5\n\n` +
      `Feedback:\n${formData.message}`
    );
    
    window.location.href = `mailto:twentyzobin@gmail.com?subject=${subject}&body=${body}`;
  };

  const alumni = [
    { name: 'AP', initials: 'AP', comment: '"Gila sih, 20Day bener-bener life saver banget! Jasa Skripsi mereka nolongin aku yang udah stuck berbulan-bulan. Mentornya gercep parah, revisi langsung di-handle sat-set. JANGAN SUNGKAN NANYA!"', service: 'Jasa Skripsi', author: 'A***** P***', role: 'MAHASISWA U***A 2022' },
    { name: 'BS', initials: 'BS', comment: '"Ngerjain Makalah jadi mantul banget setelah di sini. Gak ada lagi sumber gajelas wkwk, dikasi cheat sheat buat presentasi juga membagongkan."', service: 'MAKALAH', author: 'B*** S***', role: 'Siswa SMAN ** W****' },
    { name: 'CA', initials: 'CA', comment: '"Daftar Pustaka aku jadi slay abis! Tim 20Day emang paling gercep soal ini, anti fiktif."', service: 'DAFTAR PUSTAKA (MENDELEY)', author: 'C*** A***', role: 'Mahasiswa F* U** 2024' },
    { name: 'DA', initials: 'DA', comment: '"Awalnya pusing liat SPSS, tapi untungnya ada tim olah data 20Day. Bener-bener gercep, bonus E-Book Juga!"', service: 'OLAH DATA', author: 'Dimas Arya', role: 'Mahasiswa U**** 2022' },
  ];

  return (
    <div className="pt-24 pb-24 px-4 md:px-8 max-w-7xl mx-auto">

      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-24">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="flex-1">
          <h1 className="text-3xl md:text-5xl font-extrabold text-navy leading-tight mb-8">Spill The Tea: Alumni 20Day</h1>
          <p className="text-lg text-on-surface-variant max-w-md mb-10">Cek testimoni jujur dari kating dan pejuang kampus lainnya. Strategi 20 hari yang bikin belajar makin sat-set dan hasil no debat!</p>
          <div className="flex items-center gap-4">
             <div className="flex -space-x-3">
               {['AP', 'BS', 'CA', '+15'].map((u, i) => (
                 <div key={i} className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-secondary-container text-secondary' : i === 1 ? 'bg-blue-100 text-blue-600' : i === 2 ? 'bg-purple-100 text-purple-600' : 'bg-black text-white'}`}>{u}</div>
               ))}
             </div>
             <div>
               <p className="text-sm font-bold text-navy">Alumni 20Day</p>
               <p className="text-xs text-on-surface-variant">Feedback</p>
             </div>
          </div>
        </motion.div>
        <div className="hidden md:flex flex-1 justify-center">
          <div className="w-full max-w-sm bg-surface-container p-10 rounded-[3rem] border border-outline-variant/30 flex flex-col items-center text-center shadow-lg relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-all duration-700"></div>
             <div className="w-24 h-24 mb-6 text-secondary bg-white rounded-3xl flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-4xl">eco</span>
             </div>
             <h3 className="font-bold text-navy mb-2">20Day Rabbit Mascot</h3>
             <p className="text-sm text-on-surface-variant">Belajar Sat-Set Tanpa Ruwet</p>
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-extrabold text-navy border-b-4 border-secondary pb-4">Inspirasi Alumni #NoDebat</h2>
          <div className="flex gap-2">
            <span className="px-4 py-1.5 bg-surface-container rounded-full text-[10px] font-bold text-on-surface-variant border border-outline-variant/30">#LifeSaver</span>
            <span className="px-4 py-1.5 bg-surface-container rounded-full text-[10px] font-bold text-on-surface-variant border border-outline-variant/30">#Gercep</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
             <motion.div whileHover={{ scale: 1.01 }} className="bg-white p-10 rounded-[3rem] border border-outline-variant/30 shadow-xl h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                   <span className="px-4 py-1.5 bg-secondary-container/30 text-secondary text-[10px] font-extrabold rounded-full uppercase border border-secondary/20">Service: {alumni[0].service}</span>
                   <div className="flex text-secondary gap-1">
                      {[1,2,3,4,5].map(s => <span key={s} className="material-symbols-outlined text-sm">star</span>)}
                   </div>
                </div>
                <p className="text-2xl font-medium text-navy italic leading-relaxed mb-12 flex-1">{alumni[0].comment}</p>
                <div className="flex items-center gap-4 pt-8 border-t border-outline-variant/10">
                   <div className="w-16 h-16 rounded-full bg-secondary-container text-secondary flex items-center justify-center text-xl font-bold">{alumni[0].initials}</div>
                   <div>
                      <p className="font-bold text-navy text-xl">{alumni[0].author}</p>
                      <p className="text-sm text-secondary font-bold uppercase tracking-widest">{alumni[0].role}</p>
                   </div>
                </div>
             </motion.div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-8">
             {alumni.slice(1, 3).map((a, i) => (
                <div key={i} className="bg-surface-container-low p-8 rounded-[2.5rem] border border-outline-variant/30 hover:bg-white hover:shadow-xl transition-all h-full">
                   <p className="text-[10px] font-bold text-on-surface-variant opacity-60 uppercase mb-4 tracking-widest">Service: {a.service}</p>
                   <p className="text-sm text-navy mb-8 leading-relaxed italic">{a.comment}</p>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-xs font-bold">{a.initials}</div>
                      <div>
                         <p className="text-sm font-bold text-navy">{a.author}</p>
                         <p className="text-[10px] text-on-surface-variant">{a.role}</p>
                      </div>
                   </div>
                </div>
             ))}
          </div>
        </div>
      </div>

      <div className="bg-surface-container-low p-12 rounded-[4rem] border border-outline-variant/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
           <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-secondary rounded-full blur-[100px]"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
           <div>
              <h2 className="text-4xl font-extrabold text-navy mb-6">Spill Pengalaman Kamu!</h2>
              <p className="text-on-surface-variant mb-12 max-w-sm">Bantu sobat ambis lainnya buat dapet pencerahan. Ceritain gimana 20Day bikin hidup lo jadi lebih chill dan produktif.</p>
              
              <div className="space-y-6">
                 {[
                   { icon: 'verified', text: 'Testimoni auto-valid by tim 20Day' },
                   { icon: 'stars', text: "Dapet badge 'Pro Player' di profil lo" }
                 ].map((feat, i) => (
                   <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-secondary-container rounded-xl flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined">{feat.icon}</span>
                      </div>
                      <span className="font-semibold text-secondary">{feat.text}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-outline-variant/20">
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-bold text-navy mb-2">Nama / Inisial</label>
                       <input 
                         type="text" 
                         required
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                         placeholder="Contoh: Andi W." 
                         className="w-full bg-surface-container-low border border-outline-variant/10 focus:border-secondary transition-colors rounded-xl px-4 py-3 outline-none" 
                       />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-navy mb-2">Layanan Yang Dipakai</label>
                        <div className="relative">
                           <select 
                             required
                             value={formData.service}
                             onChange={(e) => setFormData({...formData, service: e.target.value})}
                             className="w-full bg-surface-container-low border border-outline-variant/10 focus:border-secondary transition-colors rounded-xl px-4 py-3 outline-none appearance-none cursor-pointer text-sm"
                           >
                              <option value="">Pilih Layanan</option>
                              {services.map(s => <option key={s} value={s}>{s}</option>)}
                           </select>
                           <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-navy/40">expand_more</span>
                         </div>
                    </div>
                 </div>
                 
                 <div>
                    <label className="block text-sm font-bold text-navy mb-2">Kasih Rating</label>
                    <div className="flex gap-1 text-secondary">
                       {[1,2,3,4,5].map(s => (
                         <motion.button 
                           key={s}
                           type="button"
                           whileHover={{ scale: 1.2 }}
                           whileTap={{ scale: 0.9 }}
                           onMouseEnter={() => setHoverRating(s)}
                           onMouseLeave={() => setHoverRating(0)}
                           onClick={() => setFormData(prev => ({ ...prev, rating: s }))}
                           className="material-symbols-outlined cursor-pointer focus:outline-none p-1"
                           aria-label={`Rate ${s} stars`}
                         >
                           {(hoverRating || formData.rating) >= s ? 'star' : 'star_border'}
                         </motion.button>
                       ))}
                    </div>
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-navy mb-2">Testimoni (Be Honest!)</label>
                    <textarea 
                      rows={4} 
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="Seberapa sat-set layanan kita buat lo? Spill di sini..." 
                      className="w-full bg-surface-container-low border border-outline-variant/10 focus:border-secondary transition-colors rounded-2xl px-4 py-4 outline-none resize-none" 
                    />
                 </div>

                 <button 
                   type="submit"
                   className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all shadow-xl"
                 >
                    Kirim Testimoni <span className="material-symbols-outlined">send</span>
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
}
