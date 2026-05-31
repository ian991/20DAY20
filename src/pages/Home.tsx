import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const [time, setTime] = useState(new Date());

  // Stress Simulator State
  const [selectedTasks, setSelectedTasks] = useState<string[]>(['skripsi', 'sks']);
  
  const simulationTasks = [
    { id: 'skripsi', name: 'Skripsi (Bab 1-3)', points: 30, icon: 'menu_book' },
    { id: 'spss', name: 'Olah Data & Statistika', points: 25, icon: 'analytics' },
    { id: 'makalah', name: 'Makalah / Jurnal Ilmiah', points: 15, icon: 'article' },
    { id: 'kasus', name: 'Studi Kasus & PPT', points: 15, icon: 'slideshow' },
    { id: 'turnitin', name: 'Revisi & Parafrase Turnitin', points: 10, icon: 'spellcheck' },
    { id: 'sks', name: 'Sistem Kebut Semalam (SKS)', points: 25, icon: 'bolt' },
  ];

  const toggleTask = (id: string) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter(item => item !== id));
    } else {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  const calculatedStress = Math.min(
    selectedTasks.reduce((sum, task) => {
      const found = simulationTasks.find(t => t.id === task);
      return sum + (found ? found.points : 0);
    }, 0),
    100
  );

  const getStressLevels = () => {
    if (calculatedStress === 0) {
      return { 
        title: 'Bebas Hambatan / Aman', 
        color: 'bg-green-400', 
        desc: 'Kamu tidak memiliki beban tugas sama sekali hari ini! Pertahankan prestasimu dan nikmati waktu santaimu.' 
      };
    }
    if (calculatedStress <= 30) {
      return { 
        title: 'Mulai Was-Was', 
        color: 'bg-yellow-300', 
        desc: 'Beban kuliah masih ringan, namun menunda-nunda pekerjaan bisa berbahaya. Delegasikan lebih cepat agar pikiran tenang.' 
      };
    }
    if (calculatedStress <= 60) {
      return { 
        title: 'Begadang & Kurang Tidur', 
        color: 'bg-orange-400', 
        desc: 'Konsentrasi mulai terbagi karena tumpukan tugas. Segera minta bantuan bimbingan atau tim spesialis kami sebelum tenggat waktu mendekat.' 
      };
    }
    if (calculatedStress <= 85) {
      return { 
        title: 'Siaga 1 Darurat Tugas!', 
        color: 'bg-red-400', 
        desc: 'Tingkat stres sangat tinggi! Kualitas akhir tugas berisiko turun akibat dikejar waktu. Kami sangat menyarankan order bantuan pengerjaan sekarang.' 
      };
    }
    return { 
      title: 'Krisis Mental Kuliah!', 
      color: 'bg-pink-500 animate-pulse', 
      desc: 'Sistem Kebut Semalam tidak akan menolongmu lagi! Ambil tindakan penyelamatan tercepat dengan mendelegasikan tugasmu ke admin 20 Day.' 
    };
  };

  const stressInfo = getStressLevels();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: false
  });

  const dateString = time.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const benefits = [
    { name: 'JAMINAN PRIVASI 100%', icon: 'verified_user' },
    { name: 'KONSULTASI AKTIF 24/7', icon: 'chat' },
    { name: 'REVISI UNLIMITED', icon: 'assignment_return' },
    { name: 'PENGERJAAN KILAT & TEPAT', icon: 'history_edu' },
    { name: 'ANTI PLAGIARISME / BEBAS AI', icon: 'workspace_premium' },
  ];

  return (
    <div className="overflow-x-hidden pt-12">
      {/* Hero Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto pt-16 pb-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Hero Left Info */}
        <div className="lg:col-span-7 text-left flex flex-col gap-6">


          <h1 className="text-4xl md:text-6xl font-black text-black tracking-tight leading-none uppercase">
            Tugas Selesai, <br />
            <span className="bg-secondary text-black px-3 border-4 border-black inline-block rotate-[-2deg] my-2 shadow-[4px_4px_0px_#000]">
              Tanpa Pusing!
            </span>
          </h1>

          <p className="text-base font-bold text-slate-800 bg-white border-2 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-2xl leading-relaxed">
            Butuh partner andalan buat bantu beresin tugas-tugas kuliah yang menumpuk? Kami hadir dengan tim berpengalaman, pengerjaan kilat, jaminan bebas plagiasi, dan bebas konsultasi tanpa batas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link 
              to="/konsultasi" 
              className="bg-secondary text-black text-lg font-black uppercase tracking-wide border-3 border-black px-8 py-4.5 rounded-xl text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3"
            >
              Konsultasikan Tugas <span className="material-symbols-outlined font-black">arrow_forward</span>
            </Link>
            <Link 
              to="/layanan" 
              className="bg-white text-black text-lg font-black uppercase tracking-wide border-3 border-black px-8 py-4.5 rounded-xl text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Lihat Price List
            </Link>
          </div>
        </div>

        {/* Hero Right Media */}
        <div className="hidden lg:flex lg:col-span-5 relative justify-center items-center py-6">
          <div className="relative z-10 w-full max-w-sm bg-[#FFFDF9] border-4 border-black p-4 rounded-2xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden group">
            <div className="bg-amber-300 w-full py-2 border-b-3 border-black font-extrabold text-xs uppercase tracking-widest text-center">
              Official 20Day Mascot
            </div>
            <div className="bg-white p-6 border-b-3 border-black">
              <img 
                alt="20Day Robot Mascot" 
                className="w-full transform group-hover:scale-105 transition-all duration-300 pointer-events-none" 
                src="/3.png" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="bg-teal-300 p-3 h-12 flex items-center justify-between font-black text-xs uppercase">
              <span>Ready 24 jam</span>
              <span className="material-symbols-outlined text-lg">check_circle</span>
            </div>
          </div>

          <div className="absolute -bottom-2 -right-2 bg-yellow-300 p-4 rounded-xl shadow-[4px_4px_0px_0px_#000] border-3 border-black hidden sm:block z-20 hover:-rotate-3 transition-transform duration-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white border-2 border-black rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-black font-bold">verified</span>
              </div>
              <div>
                <p className="text-[11px] font-black uppercase text-black leading-none">A+ Guaranteed</p>
                <p className="text-[9px] font-bold text-slate-800 mt-1">Lulus Aman & Cerdas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Retro Marquee Banner */}
      <div className="w-full overflow-hidden bg-black py-4.5 border-y-4 border-black relative z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-24 px-12">
            {benefits.map((benefit, idx) => (
              <span key={idx} className="flex items-center gap-3 font-black text-white uppercase tracking-widest text-xs">
                <span className="material-symbols-outlined text-secondary font-bold">{benefit.icon}</span> 
                {benefit.name}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-24 px-12">
            {benefits.map((benefit, idx) => (
              <span key={`dup-${idx}`} className="flex items-center gap-3 font-black text-white uppercase tracking-widest text-xs">
                <span className="material-symbols-outlined text-secondary font-bold">{benefit.icon}</span> 
                {benefit.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* INTERACTIVE ALAT SIMULATOR SECTION */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="bg-yellow-100 border-4 border-black p-8 md:p-12 rounded-2xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 text-[10px] font-mono uppercase bg-black text-yellow-300 font-bold border-b-2 border-l-2 border-black">
            Stress Meter V1
          </div>
          
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl font-black uppercase tracking-tight text-black flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-red-500 font-extrabold text-3xl animate-pulse">heart_broken</span>
              Kalkulator Tingkat Stress Tugas
            </h2>
            <p className="text-sm font-bold text-slate-800 leading-relaxed">
              Pilih beban tugas yang sedang kamu hadapi di semester ini. Kami akan mengukur estimasi tingkat stresmu secara real-time dan memberikan solusi alternatif terbaik!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Task Checklist Panel */}
            <div className="lg:col-span-7 bg-white border-3 border-black p-6 rounded-xl shadow-[4px_4px_0px_0px_#000]">
              <p className="text-xs font-black uppercase text-slate-400 mb-4 tracking-wider">Pilih Tugas Kamu:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {simulationTasks.map((task) => {
                  const isSelected = selectedTasks.includes(task.id);
                  return (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`p-3.5 border-2 border-black rounded-lg text-left transition-all duration-150 flex items-start gap-3 cursor-pointer ${
                        isSelected 
                          ? 'bg-secondary text-black shadow-[2px_2px_0px_0px_#000] -translate-x-[1px] -translate-y-[1px]' 
                          : 'bg-[#FFFDF9] hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span className="material-symbols-outlined text-lg mt-0.5">{task.icon}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-black uppercase tracking-tight">{task.name}</span>
                        <span className="text-[10px] font-bold text-slate-500 mt-1">Beban: +{task.points} Poin Stres</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Reset simulator Button */}
              <button
                onClick={() => setSelectedTasks([])}
                className="mt-6 text-xs font-black uppercase underline decoration-2 hover:text-red-500 transition-colors"
              >
                Kosongkan Pilihan Tugas
              </button>
            </div>

            {/* Live Monitoring Dashboard (Gauge) */}
            <div className="lg:col-span-5 bg-white border-3 border-black p-6 rounded-xl shadow-[4px_4px_0px_0px_#000] flex flex-col gap-5">
              <div>
                <p className="text-xs font-black uppercase text-slate-400 mb-1 tracking-wider">Hasil Pemantauan Stres:</p>
                <div className="flex justify-between items-baseline">
                  <span className="text-2xl font-black uppercase text-black">Indeks Stres:</span>
                  <span className="text-4xl font-extrabold font-mono tracking-tight text-black">{calculatedStress}%</span>
                </div>
              </div>

              {/* Custom Neobrutal progress bar */}
              <div className="w-full bg-slate-200 border-3 border-black h-8 rounded-lg overflow-hidden p-1 flex">
                <div 
                  style={{ width: `${calculatedStress}%` }}
                  className={`h-full rounded-md transition-all duration-500 border-r-2 border-black ${stressInfo.color}`}
                ></div>
              </div>

              <div className="p-4 border-2 border-dashed border-black bg-slate-50 rounded-lg">
                <p className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
                  Status: {stressInfo.title}
                </p>
                <p className="text-[12px] font-bold text-slate-700 mt-2 leading-relaxed">
                  {stressInfo.desc}
                </p>
              </div>

              {selectedTasks.length > 0 && (
                <Link
                  to={`/konsultasi?referral=stress_meter&tasks=${selectedTasks.join(',')}`}
                  className="bg-[#2DD4BF] text-black text-center font-black uppercase tracking-wide border-2 border-black py-4 rounded-xl shadow-[3px_3px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <span className="material-symbols-outlined font-black text-base">sentiment_satisfied</span>
                  Klaim Solusi Bebas Stress
                </Link>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <span className="bg-amber-300 border-2 border-black text-black font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4">
            Keunggulan Layanan
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight">Kenapa Harus 20 Day?</h2>
          <p className="text-sm font-bold text-slate-700 max-w-2xl mt-4 leading-relaxed">
            Menempuh pendidikan tinggi tidak harus menyiksa mental. Bersama kami, nikmati kelulusan bebas hambatan dengan jaminan kualitas terbaik.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: 'Pengerjaan Super Kilat', 
              desc: 'Punya deadline mendadak besok pagi? Tenang, tim spesialis kilat kami siap bersiaga memproses pesanan dengan akurasi pengerjaan yang profesional.',
              icon: 'bolt',
              color: 'bg-teal-200'
            },
            { 
              title: 'Mentor & Asisten Berbakat', 
              desc: 'Bukan sekadar bantuan ketik biasa, kami menyediakan partner diskusi santai dan bimbingan interaktif agar kamu bisa memahami materi penulisan seutuhnya.',
              icon: 'psychology',
              color: 'bg-amber-200'
            },
            { 
              title: 'Kerahasiaan data Mutlak', 
              desc: 'Identitas, biodata, universitas, dan materi tugas kamu dienkripsi secara aman dan dijaga kerahasiaannya agar reputasi akademikmu tetap terlindungi.',
              icon: 'lock_person',
              color: 'bg-rose-200'
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl border-3 border-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 relative overflow-hidden group"
            >
              <div className={`w-14 h-14 rounded-lg ${item.color} border-2 border-black flex items-center justify-center text-black mb-6 shadow-[2px_2px_0px_0px_#000]`}>
                <span className="material-symbols-outlined text-2xl font-black">{item.icon}</span>
              </div>
              <h3 className="text-xl font-black uppercase text-black mb-3">{item.title}</h3>
              <p className="text-xs font-bold text-slate-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box Section */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto py-12 mb-16">
        <div className="bg-yellow-300 border-4 border-black p-8 md:p-16 rounded-2xl shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden min-h-[380px] flex flex-col justify-center">
          <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-black/5 pointer-events-none hidden lg:block" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
          
          <div className="z-10 max-w-3xl flex flex-col gap-6">
            <h2 className="text-3xl md:text-5xl font-black text-black uppercase leading-tight">
              Siap merdeka dari tumpukan tugas kuliah?
            </h2>
            <p className="text-sm md:text-base font-bold text-slate-900 max-w-2xl leading-relaxed">
              Segera hubungi tim admin responsif kami lewat tombol WhatsApp untuk mendelegasikan tugasmu, konsultasi estimasi kustom berdasarkan bab skripsi, atau sekadar bertanya price list. Tim kami aktif 24 jam sehari!
            </p>
            
            <div className="flex flex-wrap gap-4 mt-2">
              <Link 
                to="/konsultasi" 
                className="bg-black text-white hover:bg-slate-900 px-8 py-4.5 rounded-xl text-sm font-black uppercase tracking-wide border-2 border-black shadow-[4px_4px_0px_0px_#2DD4BF] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined font-black text-base">chat</span> Hubungi Admin Sekarang
              </Link>
              <Link 
                to="/layanan" 
                className="bg-white text-black hover:bg-slate-50 px-8 py-4.5 rounded-xl text-sm font-black uppercase tracking-wide border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] transition-all text-center"
              >
                Lihat Price List Lengkap
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

