import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white pt-20 pb-12 border-t-4 border-black text-black">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 px-4 md:px-8 max-w-7xl mx-auto">
        
        {/* Left Column Description */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 overflow-hidden rounded-lg border-2 border-black bg-primary flex items-center justify-center shadow-[2px_2px_0px_#000] shrink-0">
              <img 
                alt="Logo Footer" 
                className="w-full h-full object-cover" 
                src="/3.png" 
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xl font-black uppercase tracking-tight text-black">20 Day</span>
          </div>
          <p className="text-xs font-bold text-slate-700 leading-relaxed max-w-sm">
            Platform asisten akademik premium tepercaya di Indonesia. Kami siap membantu membimbing serta menuntaskan tugas Anda secara aman, cepat, dan presisi.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 rounded border-2 border-black bg-primary flex items-center justify-center text-white font-black hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_#000] transition-all">
              <span className="material-symbols-outlined text-base font-black">public</span>
            </a>
            <a href="#" className="w-9 h-9 rounded border-2 border-black bg-secondary flex items-center justify-center text-black font-black hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_#000] transition-all">
              <span className="material-symbols-outlined text-base font-black">alternate_email</span>
            </a>
            <a href="#" className="w-9 h-9 rounded border-2 border-black bg-emerald-300 flex items-center justify-center text-black font-black hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[2px_2px_0px_#000] transition-all">
              <span className="material-symbols-outlined text-base font-black">chat_bubble</span>
            </a>
          </div>
        </div>
        
        {/* Middle Columns */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h4 className="text-xs font-black uppercase text-black tracking-wider border-b-2 border-black pb-1 inline-block">Layanan</h4>
          <div className="flex flex-col gap-2.5">
            <Link to="/layanan" className="text-xs font-bold text-slate-700 hover:text-black transition-colors">Jasa Skripsi (Per Bab/Full)</Link>
            <Link to="/layanan" className="text-xs font-bold text-slate-700 hover:text-black transition-colors">Tugas & Makalah</Link>
            <Link to="/layanan" className="text-xs font-bold text-slate-700 hover:text-black transition-colors">Edit & Ketik EYD</Link>
            <Link to="/layanan" className="text-xs font-bold text-slate-700 hover:text-black transition-colors">Olah Data & SPSS</Link>
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-xs font-black uppercase text-black tracking-wider border-b-2 border-black pb-1 inline-block">Informasi</h4>
          <div className="flex flex-col gap-2.5">
            <a href="#" className="text-xs font-bold text-slate-700 hover:text-black transition-colors">Tentang 20 Day</a>
            <a href="#" className="text-xs font-bold text-slate-700 hover:text-black transition-colors">Prosedur & Alur Kerja</a>
            <a href="#" className="text-xs font-bold text-slate-700 hover:text-black transition-colors">Ketentuan Bimbingan</a>
            <a href="#" className="text-xs font-bold text-slate-700 hover:text-black transition-colors">Hubungi Customer Service</a>
          </div>
        </div>

        {/* Right Info Card */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-xs font-black uppercase text-black tracking-wider border-b-2 border-black pb-1 inline-block">Dukungan Jam Kerja</h4>
          <div className="bg-[#FFFDF9] p-5 rounded-lg border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-black font-black text-sm">mail</span>
              <span className="text-xs font-bold text-black break-all">support@20day.com</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-black font-black text-sm">schedule</span>
              <span className="text-xs font-bold text-slate-800">Uptime: Layanan 24 Jam</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="mt-16 pt-8 border-t-2 border-black/10 max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] sm:text-xs font-bold text-slate-600">© 2026 20 Day. Solusi Pembimbingan Akademik No. 1 di Indonesia.</p>
        <div className="flex gap-6">
          <span className="text-[10px] sm:text-xs font-black text-black flex items-center gap-1">
            <span className="material-symbols-outlined text-sm font-black text-emerald-600">verified</span>
            GARANSI PRIVASI AMAN & BEBAS REVISI
          </span>
        </div>
      </div>
    </footer>
  );
}
