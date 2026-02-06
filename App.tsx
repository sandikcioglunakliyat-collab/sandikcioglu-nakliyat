import React, { useState } from 'react';
import { Truck, ShieldCheck, Warehouse, MapPin, Phone, MessageCircle, Star, Menu, X } from 'lucide-react';

const App = () => {
  const [price, setPrice] = useState(3500);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const calculatePrice = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPrice(parseInt(e.target.value));
  };

  return (
    <div className="min-h-screen bg-[#2b050a] text-white font-sans selection:bg-[#D4AF37] selection:text-[#2b050a]">
      {/* Üst SEO Bandı */}
      <div className="bg-black/50 py-2 overflow-hidden border-b border-white/5 hidden md:block">
        <div className="flex animate-marquee whitespace-nowrap text-[10px] font-black uppercase tracking-widest text-[#D4AF37]/60">
          <span className="mx-8 italic">Beşiktaş Nakliyat</span>
          <span className="mx-8 italic">Kadıköy Ofis Taşıma</span>
          <span className="mx-8 italic">Sarıyer Eşya Depolama</span>
          <span className="mx-8 italic">Bakırköy Şehirler Arası</span>
          <span className="mx-8 italic">Sandıkçıoğlu Lüks Nakliyat</span>
        </div>
      </div>

      {/* Navigasyon */}
      <nav className="sticky top-0 z-[1000] bg-[#2b050a]/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black serif text-[#D4AF37] leading-none tracking-tighter">SANDIKÇIOĞLU</h1>
          <span className="text-[8px] tracking-[0.4em] text-gray-400 uppercase mt-1 italic">Premium Logistics Group</span>
        </div>

        <div className="hidden lg:flex gap-8 items-center text-[10px] font-black uppercase tracking-widest">
          <a href="#hizmetler" className="hover:text-[#D4AF37] transition">Hizmetler</a>
          <a href="#fiyat" className="hover:text-[#D4AF37] transition">Fiyat Al</a>
          <a href="tel:05313669936" className="bg-[#D4AF37] text-[#2b050a] px-6 py-2 rounded-full hover:scale-105 transition">0531 366 99 36</a>
        </div>
        
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-[#D4AF37]">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80')] bg-cover bg-center opacity-30"></div>
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-5xl md:text-8xl font-black italic mb-6 leading-none tracking-tighter">Lüksün <span className="text-[#D4AF37]">Zirvesi</span></h2>
          <p className="text-lg md:text-xl text-slate-300 italic mb-10 leading-relaxed">
            25 yıllık Sandıkçıoğlu mirasıyla eşyalarınız bir sanat eseri gibi özenle taşınır.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://wa.me/905313669936" className="bg-[#25D366] px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)] transition">
              <MessageCircle size={24} /> WHATSAPP TEKLİF
            </a>
          </div>
        </div>
      </section>

      {/* Fiyat Robotu */}
      <section id="fiyat" className="py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-white/5 border border-[#D4AF37]/20 p-10 rounded-[3rem] backdrop-blur-md">
          <h3 className="text-3xl font-black text-center mb-10 italic">Akıllı <span className="text-[#D4AF37]">Fiyat Robotu</span></h3>
          <div className="grid md:grid-cols-2 gap-8 mb-10 text-black">
            <select onChange={calculatePrice} className="p-4 rounded-xl bg-white/90 font-bold outline-none">
              <option value="3500">1+1 Daire Taşıma</option>
              <option value="5500">2+1 Daire Taşıma</option>
              <option value="8500">3+1 Daire Taşıma</option>
              <option value="12000">Villa / Köşk Taşıma</option>
            </select>
            <div className="flex items-center justify-center p-4 bg-[#D4AF37] rounded-xl text-[#2b050a] font-black text-2xl">
              ₺{price}+
            </div>
          </div>
          <button className="w-full py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-black rounded-xl hover:bg-[#D4AF37] hover:text-[#2b050a] transition uppercase tracking-widest text-xs">
            BU FİYATI REZERVE ET
          </button>
        </div>
      </section>

      {/* Alt Bilgi */}
      <footer className="py-16 px-10 border-t border-white/5 bg-black/20 text-center">
        <div className="text-2xl font-black text-[#D4AF37] mb-4">SANDIKÇIOĞLU</div>
        <p className="text-sm text-gray-500 italic mb-6">sandikcioglunakliyat@gmail.com | 0531 366 99 36</p>
        <div className="text-[9px] text-gray-700 font-bold uppercase flex flex-wrap justify-center gap-4">
          <span>Beşiktaş</span><span>Kadıköy</span><span>Bakırköy</span><span>Sarıyer</span><span>Etiler</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
