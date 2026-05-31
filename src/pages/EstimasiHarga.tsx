import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Percent, Sparkles, CheckCircle, HelpCircle, Receipt, ArrowRight, MessageSquare, ChevronDown, Award } from 'lucide-react';

interface SubService {
  name: string;
  basePrice: number;
  unitLabel: string;
  minUnits: number;
  maxUnits: number;
  defaultUnits: number;
}

interface AnimatedPriceProps {
  value: number;
  format?: (num: number) => string;
}

function AnimatedPrice({ value, format }: AnimatedPriceProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    let start = displayValue;
    const end = value;
    if (start === end) return;

    const duration = 800; // ms
    const startTime = performance.now();

    let animationFrameId: number;

    const updateNumber = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing out quadratic
      const ease = progress * (2 - progress);
      const current = Math.round(start + (end - start) * ease);
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateNumber);
      }
    };

    animationFrameId = requestAnimationFrame(updateNumber);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value]);

  return <span>{format ? format(displayValue) : displayValue}</span>;
}

const SERVICE_CLASSES: Record<string, SubService[]> = {
  'Jasa Skripsi': [
    { name: 'Full Skripsi (Judul s/d Sidang)', basePrice: 1500000, unitLabel: 'Paket Full', minUnits: 1, maxUnits: 1, defaultUnits: 1 },
    { name: 'Per Bab Skripsi (Bab 1-3 atau Bab 4-5)', basePrice: 350000, unitLabel: 'Jumlah Bab', minUnits: 1, maxUnits: 5, defaultUnits: 1 },
    { name: 'Proposal Penelitian / Metodologi', basePrice: 500000, unitLabel: 'Paket Proposal', minUnits: 1, maxUnits: 1, defaultUnits: 1 },
    { name: 'Olah Data Statistik & Realiabilitas (SPSS/AMOS)', basePrice: 400000, unitLabel: 'Analisis', minUnits: 1, maxUnits: 1, defaultUnits: 1 },
  ],
  'Tugas & Makalah': [
    { name: 'Makalah Akademik Lengkap', basePrice: 6000, unitLabel: 'Halaman', minUnits: 5, maxUnits: 100, defaultUnits: 10 },
    { name: 'Essay / Paper Pendek', basePrice: 8000, unitLabel: 'Halaman', minUnits: 2, maxUnits: 25, defaultUnits: 4 },
    { name: 'Jurnal Ilmiah (Nasional/Sinta)', basePrice: 12000, unitLabel: 'Halaman', minUnits: 6, maxUnits: 30, defaultUnits: 8 },
    { name: 'PowerPoint Presentation (PPT)', basePrice: 4000, unitLabel: 'Slide', minUnits: 5, maxUnits: 50, defaultUnits: 10 },
  ],
  'Edit & Ketik': [
    { name: 'Mendeley / APA Citation Sync', basePrice: 2500, unitLabel: 'Referensi', minUnits: 5, maxUnits: 100, defaultUnits: 15 },
    { name: 'Cek EYD & Typo Minor', basePrice: 1500, unitLabel: 'Halaman', minUnits: 10, maxUnits: 300, defaultUnits: 20 },
    { name: 'Format Layout & Margins Skripsi', basePrice: 3000, unitLabel: 'Halaman', minUnits: 10, maxUnits: 300, defaultUnits: 50 },
    { name: 'Jasa Ketik Ulang Dokumentasi', basePrice: 2000, unitLabel: 'Halaman', minUnits: 5, maxUnits: 200, defaultUnits: 10 },
  ]
};

const ACADEMIC_LEVELS = [
  { name: 'Diploma (D3)', multiplier: 0.9 },
  { name: 'Sarjana (S1)', multiplier: 1.0 }
];

const URGENCY_OPTIONS = [
  { name: 'Regular (Biasa, > 7 Hari)', multiplier: 1.0, info: 'Sesuai timeline standar' },
  { name: 'Express (Cepat, 4-6 Hari)', multiplier: 1.25, info: 'Prioritas menengah' },
  { name: 'Kilat (Sangat Segera, 1-3 Hari)', multiplier: 1.45, info: 'Dikerjakan tim khusus' },
  { name: 'Super Urgent (< 24 Jam)', multiplier: 1.8, info: 'Emergency, selesai kilat' }
];

export default function EstimasiHarga() {
  const [selectedClass, setSelectedClass] = useState<string>('Jasa Skripsi');
  const [selectedSubService, setSelectedSubService] = useState<SubService>(SERVICE_CLASSES['Jasa Skripsi'][0]);
  const [academicLevel, setAcademicLevel] = useState(ACADEMIC_LEVELS[1]); // S1 default
  const [urgency, setUrgency] = useState(URGENCY_OPTIONS[0]); // Regular default
  const [units, setUnits] = useState<number>(1);
  const [calcMethod, setCalcMethod] = useState<'otomatis' | 'konsul'>('otomatis');

  const [discountApplied, setDiscountApplied] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  // Sync sub-service and default units when active category changes
  const handleClassChange = (className: string) => {
    setSelectedClass(className);
    const sub = SERVICE_CLASSES[className][0];
    setSelectedSubService(sub);
    setUnits(sub.defaultUnits);
    setCalcMethod('otomatis');
  };

  const handleSubServiceChange = (subName: string) => {
    const sub = SERVICE_CLASSES[selectedClass].find(s => s.name === subName);
    if (sub) {
      setSelectedSubService(sub);
      setUnits(sub.defaultUnits);
    }
  };

  const getBasePrice = () => {
    const raw = selectedSubService.basePrice;
    return discountApplied ? Math.round(raw * 0.5) : raw;
  };

  const getOriginalBasePrice = () => {
    return selectedSubService.basePrice;
  };

  const calculateTotal = (applyDiscount = discountApplied) => {
    const base = selectedSubService.basePrice;
    const levelMult = academicLevel.multiplier;
    const urgencyMult = urgency.multiplier;
    const rawTotal = Math.round(base * units * levelMult * urgencyMult);
    return applyDiscount ? Math.round(rawTotal * 0.5) : rawTotal;
  };

  const getOriginalTotal = () => {
    return calculateTotal(false);
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    // Simulate interactive calculating/discount applying feel
    setTimeout(() => {
      setIsCalculating(false);
      setDiscountApplied(true);
    }, 900);
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const handleWhatsAppOrder = () => {
    const total = calculateTotal();
    const originalTotal = getOriginalTotal();
    const isJasaSkripsiKonsul = selectedClass === 'Jasa Skripsi' && calcMethod === 'konsul';

    const messageText = isJasaSkripsiKonsul 
      ? `Halo Admin 20 Day, saya ingin konsultasi estimasi harga pengerjaan skripsi kustom karena tingkat kompleksitas bab saya sangat spesifik.

*Detail Rencana Pemesanan:*
• Kategori: ${selectedClass}
• Layanan: ${selectedSubService.name}
• Jenjang: ${academicLevel.name}
• Batas Waktu: ${urgency.name}
• Kuantitas: ${units} ${selectedSubService.unitLabel}
• Metode: *Berdasarkan Konsultasi Admin (Kustom/Nego)*

Mohon dibantu bimbingan kalkulasi harga terbaik untuk tugas saya. Terima kasih!`
      : `Halo Admin 20 Day, saya ingin mengajukan pesanan dengan estimasi berikut:

*Detail Pemesanan:*
• Kategori: ${selectedClass}
• Layanan: ${selectedSubService.name}
• Jenjang: ${academicLevel.name}
• Batas Waktu: ${urgency.name}
• Kuantitas: ${units} ${selectedSubService.unitLabel}
• Estimasi Harga: *${formatRupiah(total)}* ${discountApplied ? `(Diskon Promo 50% Aktif! Harga Normal: ${formatRupiah(originalTotal)})` : ''}

Mohon panduan untuk langkah berikutnya. Terima kasih!`;

    const encodedText = encodeURIComponent(messageText);
    window.open(`https://wa.me/6285180972466?text=${encodedText}`, '_blank');
  };

  // Scroll to calculator section if hash present
  useEffect(() => {
    if (window.location.hash === '#kalkulator') {
      const el = document.getElementById('kalkulator');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="bg-[#FFFDF9] min-h-screen pt-28 pb-20 text-black">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-secondary text-black px-4 py-1.5 rounded-lg text-xs font-black tracking-wider uppercase mb-6 border-2 border-black shadow-[2px_2px_0px_#000]"
          >
            <span className="material-symbols-outlined text-[16px] font-black">calculate</span>
            Hitung Sesuai Kebutuhanmu
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-black tracking-tight leading-none mb-6 uppercase"
          >
            Kalkulator Estimasi Biaya <br />
            <span className="bg-primary px-3 inline-block rotate-1 my-1 border-2 border-black shadow-[3px_3px_0px_#000] text-white">
              Transparan & Instan
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-800 text-sm md:text-base font-bold bg-white border-2 border-black p-4 rounded-xl shadow-[3px_3px_0px_#000] max-w-2xl mx-auto"
          >
            Dapatkan taksiran biaya pengerjaan tugas akademik secara instan. Atur jenis bantuan, kuantitas halaman, jenjang pendidikan, hingga tenggat waktu pengerjaan secara fleksibel.
          </motion.p>
        </div>

        {/* Dynamic Calculator Box */}
        <div id="kalkulator" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="lg:col-span-7 bg-white p-6 md:p-8 rounded-xl border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)]"
          >
            
            {/* Step 1: Kategori Utama */}
            <div className="mb-8">
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-secondary border-2 border-black text-black rounded font-black text-xs shadow-[1px_1px_0px_#000]">1</span>
                Pilih Sektor Kategori Layanan
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.keys(SERVICE_CLASSES).map((className) => {
                  const isActive = selectedClass === className;
                  let icon = 'school';
                  if (className === 'Tugas & Makalah') icon = 'description';
                  if (className === 'Edit & Ketik') icon = 'edit_note';

                  return (
                    <button
                      key={className}
                      type="button"
                      onClick={() => handleClassChange(className)}
                      className={`p-4 rounded-lg border-2 border-black text-center transition-all flex flex-col items-center justify-center gap-2 group cursor-pointer ${
                        isActive 
                          ? 'bg-primary text-white font-black shadow-[4px_4px_0px_0px_#000] translate-x-[-2px] translate-y-[-2px]' 
                          : 'bg-[#FFFDF9] hover:bg-slate-50 text-black font-bold'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-2xl font-semibold ${isActive ? 'text-white' : 'text-black'}`}>
                        {icon}
                      </span>
                      <span className="text-xs uppercase tracking-wider">
                        {className}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Kontak Sub Service */}
            <div className="mb-8">
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-secondary border-2 border-black text-black rounded font-black text-xs shadow-[1px_1px_0px_#000]">2</span>
                Tipe Layanan Spesifik
              </label>
              <div className="relative">
                <select
                  value={selectedSubService.name}
                  onChange={(e) => handleSubServiceChange(e.target.value)}
                  className="w-full bg-[#FFFDF9] border-2 border-black rounded-lg px-4 py-3.5 text-black font-bold outline-none cursor-pointer shadow-[3px_3px_0px_#000] text-sm appearance-none"
                >
                  {SERVICE_CLASSES[selectedClass].map((sub) => (
                    <option key={sub.name} value={sub.name} className="py-2 text-black">
                      {sub.name} (Mulai {formatRupiah(discountApplied ? Math.round(sub.basePrice * 0.5) : sub.basePrice)}/{sub.unitLabel})
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-black font-black">
                  expand_more
                </span>
              </div>
            </div>

            {/* Opsi khusus Jasa Skripsi: Hitung Otomatis vs Konsul Admin */}
            {selectedClass === 'Jasa Skripsi' && (
              <div className="mb-8 p-5 bg-teal-50 border-2 border-black rounded-xl shadow-[3px_3px_0px_#000]">
                <label className="block text-xs font-black uppercase tracking-wider text-black mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-black font-black text-lg">tune</span>
                  Metode Perhitungan Harga Bab (Khusus Skripsi)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCalcMethod('otomatis')}
                    className={`p-4 rounded-lg border-2 border-black text-left cursor-pointer transition-all ${
                      calcMethod === 'otomatis'
                        ? 'bg-white text-black font-bold shadow-[2px_2px_0px_0px_#000]'
                        : 'bg-[#FFFDF9]/60 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`material-symbols-outlined text-lg font-black ${calcMethod === 'otomatis' ? 'text-primary' : 'text-slate-400'}`}>
                        toll
                      </span>
                      <span className="text-xs font-black uppercase tracking-wide">Hitung Otomatis</span>
                    </div>
                    <span className="block text-[11px] text-slate-600 font-bold leading-snug">Estimasi instan berdasarkan rumus tarif volume standar kami.</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCalcMethod('konsul')}
                    className={`p-4 rounded-lg border-2 border-black text-left cursor-pointer transition-all ${
                      calcMethod === 'konsul'
                        ? 'bg-white text-black font-bold shadow-[2px_2px_0px_0px_#000]'
                        : 'bg-[#FFFDF9]/60 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`material-symbols-outlined text-lg font-black ${calcMethod === 'konsul' ? 'text-primary' : 'text-slate-400'}`}>
                        chat_bubble
                      </span>
                      <span className="text-xs font-black uppercase tracking-wide">Konsul Estimasi Admin</span>
                    </div>
                    <span className="block text-[11px] text-slate-600 font-bold leading-snug">Disarankan karena kompleksitas tingkat kesulitan setiap bab skripsi berbeda.</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Jenjang Akademik */}
            <div className="mb-8">
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-secondary border-2 border-black text-black rounded font-black text-xs shadow-[1px_1px_0px_#000]">3</span>
                Jenjang Pendidikan
              </label>
              <div className="grid grid-cols-2 gap-3">
                {ACADEMIC_LEVELS.map((lvl) => {
                  const isActive = academicLevel.name === lvl.name;
                  return (
                    <button
                      key={lvl.name}
                      type="button"
                      onClick={() => setAcademicLevel(lvl)}
                      className={`py-3 px-2 rounded-lg text-xs font-black uppercase border-2 border-black transition-all text-center cursor-pointer ${
                        isActive 
                          ? 'bg-[#E0F2FE] text-black shadow-[3px_3px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]' 
                          : 'bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {lvl.name}
                      <span className="block text-[10px] text-slate-500 font-bold mt-0.5 lowercase normal-case">Multiplier: {lvl.multiplier}x</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Kuantitas Units */}
            {selectedSubService.maxUnits > 1 && (
              <div className="mb-8 bg-amber-50/50 p-5 rounded-lg border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-xs font-black uppercase tracking-wider text-black flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 bg-secondary border-2 border-black text-black rounded font-black text-xs shadow-[1px_1px_0px_#000]">4</span>
                    Volume Jumlah ({selectedSubService.unitLabel})
                  </label>
                  <div className="flex items-center gap-2 bg-white border-2 border-black rounded px-3 py-1 text-sm font-black text-black">
                    <input
                      type="number"
                      value={units}
                      onChange={(e) => {
                        const val = Math.max(selectedSubService.minUnits, Math.min(selectedSubService.maxUnits, Number(e.target.value)));
                        setUnits(val);
                      }}
                      className="w-12 text-center font-bold focus:outline-none"
                    />
                    <span className="text-xs text-slate-700 uppercase font-black">{selectedSubService.unitLabel}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setUnits(prev => Math.max(selectedSubService.minUnits, prev - 1))}
                    disabled={units === selectedSubService.minUnits}
                    className="w-9 h-9 rounded bg-white border-2 border-black flex items-center justify-center text-black font-black hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg font-black">remove</span>
                  </button>
                  
                  <input
                    type="range"
                    min={selectedSubService.minUnits}
                    max={selectedSubService.maxUnits}
                    value={units}
                    onChange={(e) => setUnits(Number(e.target.value))}
                    className="flex-1 h-3 bg-slate-200 border-2 border-black rounded-lg appearance-none cursor-pointer accent-black"
                  />

                  <button
                    type="button"
                    onClick={() => setUnits(prev => Math.min(selectedSubService.maxUnits, prev + 1))}
                    disabled={units === selectedSubService.maxUnits}
                    className="w-9 h-9 rounded bg-white border-2 border-black flex items-center justify-center text-black font-black hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg font-black">add</span>
                  </button>
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] text-slate-800 font-extrabold uppercase px-1">
                  <span>Min: {selectedSubService.minUnits} hlm</span>
                  <span>Max: {selectedSubService.maxUnits} hlm</span>
                </div>
              </div>
            )}

            {/* Step 5: Batas Waktu */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-black mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-secondary border-2 border-black text-black rounded font-black text-xs shadow-[1px_1px_0px_#000]">{selectedSubService.maxUnits > 1 ? '5' : '4'}</span>
                Pilih Tenggat Waktu (Urgency)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {URGENCY_OPTIONS.map((opt) => {
                  const isActive = urgency.name === opt.name;
                  return (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setUrgency(opt)}
                      className={`p-4 rounded-lg border-2 border-black text-left cursor-pointer transition-all ${
                        isActive 
                          ? 'bg-[#FEF08A] text-black font-bold shadow-[3px_3px_0px_0px_#000] translate-x-[-1px] translate-y-[-1px]' 
                          : 'bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-black uppercase tracking-wide">
                          {opt.name.split(' (')[0]}
                        </span>
                        {opt.multiplier > 1.0 && (
                          <span className="text-[9px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000]">
                            +{Math.round((opt.multiplier - 1) * 100)}%
                          </span>
                        )}
                      </div>
                      <span className="block text-[11px] font-bold text-slate-500">{opt.info}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action info banner directly guiding users */}
            <div className="mt-8 pt-6 border-t-2 border-dashed border-black text-center">
              <p className="text-xs font-bold text-slate-600">
                👉 Klik tombol <strong className="text-black uppercase">Hitung Estimasi</strong> di panel rincian sebelah kanan untuk mendapatkan harga final & diskon 
                <span className="px-1.5 py-0.5 ml-1 bg-red-100 border border-red-400 text-red-700 rounded font-black">50% OFF</span>!
              </p>
            </div>

          </motion.div>

          {/* Pricing Receipt Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', damping: 25, delay: 0.1 }}
            className="lg:col-span-5 relative"
          >
            <div className="sticky top-28 bg-[#FFFDF9] text-black p-6 md:p-8 rounded-xl border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden">
              
              <div className="relative z-10">
                <div className="flex items-center justify-between pb-6 border-b-2 border-black mb-6">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight">Rincian Estimasi</h3>
                    <p className="text-xs font-bold text-slate-700">20 DAY OFFICIAL</p>
                  </div>
                  <span className="material-symbols-outlined text-black font-black text-3xl">receipt_long</span>
                </div>

                {/* Breakdown List */}
                <div className="space-y-4 mb-8 text-xs font-bold">
                  <div className="flex justify-between border-b border-black/10 pb-2">
                    <span className="text-slate-600 uppercase tracking-wider text-[10px]">Kategori:</span>
                    <span className="font-extrabold text-black uppercase">{selectedClass}</span>
                  </div>
                  <div className="flex justify-between items-start gap-4 border-b border-black/10 pb-2">
                    <span className="text-slate-600 uppercase tracking-wider text-[10px] shrink-0">Layanan:</span>
                    <span className="font-extrabold text-black text-right leading-tight">{selectedSubService.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-black/10 pb-2">
                    <span className="text-slate-600 uppercase tracking-wider text-[10px]">Harga Dasar:</span>
                    <span className="font-extrabold text-black flex items-center justify-end gap-1.5 min-w-0">
                      {selectedClass === 'Jasa Skripsi' && calcMethod === 'konsul' ? (
                        <span>Mulai dari {formatRupiah(selectedSubService.basePrice)}</span>
                      ) : (
                        <>
                          {discountApplied && (
                            <span className="text-slate-400 line-through text-[11px] font-bold decoration-red-500 decoration-1">
                              {formatRupiah(getOriginalBasePrice())}
                            </span>
                          )}
                          <span className={discountApplied ? 'text-teal-600 font-extrabold' : 'text-black font-extrabold'}>
                            <AnimatedPrice value={getBasePrice()} format={formatRupiah} />
                          </span>
                        </>
                      )}
                      <span className="text-[10px] text-slate-500 font-bold lowercase shrink-0"> / {selectedSubService.unitLabel.toLowerCase()}</span>
                    </span>
                  </div>
                  
                  {selectedSubService.maxUnits > 1 && (
                    <div className="flex justify-between border-b border-black/10 pb-2">
                      <span className="text-slate-600 uppercase tracking-wider text-[10px]">Kuantitas:</span>
                      <span className="font-extrabold text-black uppercase">{units} {selectedSubService.unitLabel}</span>
                    </div>
                  )}

                  <div className="flex justify-between border-b border-black/10 pb-2">
                    <span className="text-slate-600 uppercase tracking-wider text-[10px]">Jenjang Mut:</span>
                    <span className="font-extrabold text-black uppercase">{academicLevel.name.split(' (')[0]} ({academicLevel.multiplier}x)</span>
                  </div>
                  <div className="flex justify-between border-b border-black/10 pb-2">
                    <span className="text-slate-600 uppercase tracking-wider text-[10px]">Tenggat Waktu:</span>
                    <span className="font-extrabold text-red-600 uppercase">{urgency.name.split(' (')[0]} ({urgency.multiplier}x)</span>
                  </div>
                  <div className="flex justify-between border-b border-black/10 pb-2">
                    <span className="text-slate-600 uppercase tracking-wider text-[10px]">Metode Tarif:</span>
                    <span className="font-extrabold text-slate-800 uppercase">
                      {selectedClass === 'Jasa Skripsi' && calcMethod === 'konsul' ? 'Konsul Admin' : 'Sistem Otomatis'}
                    </span>
                  </div>
                </div>

                {/* Interactive Instant Calculation Trigger & Discount Applier */}
                <div className="mb-6 bg-amber-50 p-4 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-2.5">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                    <span className="text-[10px] font-black uppercase text-slate-700 tracking-wider">
                      {discountApplied ? '🎉 KODE PROMO AKTIF!' : '🔥 PROMO KHUSUS HARI INI'}
                    </span>
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleCalculate}
                    disabled={isCalculating}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full relative py-3.5 px-4 rounded-xl border-2 border-black font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2.5 transition-all shadow-[3px_3px_0px_#000] cursor-pointer ${
                      discountApplied
                        ? 'bg-[#10B981] hover:bg-[#059669] text-white active:bg-[#047857]'
                        : 'bg-[#FBBF24] hover:bg-[#F59E0B] text-black animate-pulse'
                    }`}
                  >
                    {isCalculating ? (
                      <>
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
                        <span>Menerapkan Diskon 50%...</span>
                      </>
                    ) : discountApplied ? (
                      <>
                        <CheckCircle className="w-4 h-4 animate-bounce" />
                        <span>Diskon 50% Aktif (Hitung Ulang)</span>
                      </>
                    ) : (
                      <>
                        <Percent className="w-4 h-4 animate-bounce" />
                        <span>Hitung Estimasi & Diskon 50%</span>
                      </>
                    )}
                  </motion.button>

                  <p className="text-[9px] font-black uppercase text-slate-500 mt-2 leading-tight">
                    {discountApplied 
                      ? 'Selamat! Tarif pengerjaan Anda otomatis dipangkas setengah harga.' 
                      : '*Cukup klik untuk otomatis memotong seluruh list harga di atas sebesar 50%!'}
                  </p>
                </div>

                {/* Special pulsing discount banner */}
                {discountApplied && (
                  <motion.div
                    initial={{ scale: 0.95 }}
                    animate={{ scale: [0.95, 1, 0.95] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="mb-4 bg-red-500 text-white border-2 border-black p-2.5 rounded-lg font-black text-xs uppercase tracking-widest text-center shadow-[2px_2px_0px_#000] flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4 font-black text-amber-300" />
                    <span>SPESIAL DISKON 50% AKTIF!</span>
                  </motion.div>
                )}

                {/* Sub Total Show */}
                <div className={`${discountApplied ? 'bg-amber-400 border-amber-500 text-black' : 'bg-primary text-white'} p-5 rounded-lg border-2 border-black shadow-[3px_3px_0px_#000] mb-8 text-center transition-all duration-300`}>
                  <p className={`text-xs font-black uppercase tracking-widest mb-1 ${discountApplied ? 'text-black/80' : 'text-slate-300'}`}>
                    {discountApplied ? '💸 Total Tarif (Diskon 50%!)' : 'Total Perkiraan Biaya'}
                  </p>
                  {selectedClass === 'Jasa Skripsi' && calcMethod === 'konsul' ? (
                    <div className="py-2">
                      <p className="text-2xl font-black uppercase tracking-tight text-white">Hubungi Admin</p>
                      <p className="text-[11px] font-bold text-slate-200 mt-1 leading-relaxed">
                        Setiap bab skripsi memiliki kompleksitas bimbingan yang unik. Hubungi kami untuk mendapatkan nominal & struktur pembayaran terbaik!
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col items-center justify-center py-1">
                        {discountApplied && (
                          <span className="text-slate-800 line-through text-xs font-black opacity-70 mb-1 decoration-2 decoration-red-600">
                            {formatRupiah(getOriginalTotal())}
                          </span>
                        )}
                        <p className={`text-3xl font-black tracking-tight leading-none ${discountApplied ? 'text-black font-black' : 'text-secondary'}`}>
                          <AnimatedPrice value={calculateTotal()} format={formatRupiah} />
                        </p>
                      </div>
                      <p className={`text-[10px] font-bold ${discountApplied ? 'text-slate-900 border-t border-black/10 mt-2 pt-2' : 'text-slate-300 mt-2'} leading-relaxed`}>
                        {discountApplied 
                          ? '*Potongan 50% telah diaplikasikan sukses lewat hitung instan!' 
                          : '*Telah disesuaikan dengan jenjang akademik dan tenggat waktu.'}
                      </p>
                    </>
                  )}
                </div>

                {/* Free Perks Included */}
                <div className="space-y-2 mb-8 bg-slate-100 p-4 rounded-lg border-2 border-black">
                  <p className="text-[10px] font-black text-black uppercase tracking-widest mb-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs font-black">verified</span>
                    GRATIS BENEFIT KHUSUS:
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-bold text-slate-800">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-teal-600 font-black">check_circle</span>
                      Bebas Revisi
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-teal-600 font-black">check_circle</span>
                      Konsultasi Gratis
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-teal-600 font-black">check_circle</span>
                      Cek Plagiat s/d 10%
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-teal-600 font-black">check_circle</span>
                      Garansi Tepat Waktu
                    </div>
                  </div>
                </div>

                {/* WhatsApp Order Button */}
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-[#25D366] text-black border-2 border-black py-4 rounded-lg text-xs md:text-sm font-black uppercase shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined font-black">chat</span>
                  {selectedClass === 'Jasa Skripsi' && calcMethod === 'konsul' 
                    ? 'Konsultasikan Sesuai Bab via WA' 
                    : 'Ambil Penawaran via WhatsApp'}
                </button>

                <p className="text-center text-[10px] font-bold text-slate-500 mt-4 leading-relaxed">
                  Klik tombol di atas untuk mengajukan rincian estimasi langsung ke customer service kami.
                </p>
              </div>

            </div>
          </motion.div>

        </div>

        {/* Polisi Ketentuan & FAQ Mini */}
        <section className="mt-20 border-t-4 border-black pt-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-black text-black text-center uppercase tracking-tight mb-8">Pertanyaan Seputar Estimasi Biaya</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  q: 'Apakah estimasi tersebut bersifat final?',
                  a: 'Tidak. Perhitungan di atas adalah estimasi awal berdasarkan kompleksitas umum. Biaya riil pengerjaan disesuaikan dengan detail kerumitan petunjuk tugas khusus Anda, sumber literatur, atau kebutuhan software statistik.'
                },
                {
                  q: 'Bagaimana opsi untuk skema pembayarannya?',
                  a: 'Kami menawarkan kemudahan pembayaran yang sangat fleksibel melalui Bank (BCA/Mandiri) maupun dompet digital. Anda bisa membayar lunas di awal atau cicilan parsial (DP) berdasarkan bab yang dikerjakan.'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg border-2 border-black shadow-[4px_4px_0px_#000] text-left">
                  <h4 className="font-extrabold text-xs uppercase text-black mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm font-black">help</span>
                    {faq.q}
                  </h4>
                  <p className="text-xs text-slate-700 font-bold leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

