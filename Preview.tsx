
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams, useLocation, Navigate } from 'react-router-dom';
import { ServiceDetail, District, BlogPost, LeadData } from '../types';
import { LogoIcon } from '../App';
import * as geminiService from '../services/geminiService';
import { generateLongSEOContent, getBlogPostContentById } from '../App'; 

interface PreviewProps {
  servicesData: Record<string, ServiceDetail>;
  districtList: District[];
  blogPosts: BlogPost[];
}

// --- UTILS ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- SUB-COMPONENTS ---

const QuoteModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: 'Evden Eve',
    from: 'Kadıköy',
    to: 'Beşiktaş',
    roomSize: '2+1',
    date: '',
    phone: '',
    name: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Notify user
    alert("Bilgileriniz alındı! WhatsApp üzerinden fiyat teklifi almak için yönlendiriliyorsunuz...");

    // Format WhatsApp Message
    const text = `Merhaba, Sandıkçıoğlu Nakliyat web sitesinden Fiyat Teklifi almak istiyorum.

🏠 *Taşınma Detayları:*
• Hizmet: ${formData.type}
• Nereden: ${formData.from}
• Nereye: ${formData.to}
• Eşya Durumu: ${formData.roomSize}
• Tarih: ${formData.date}

👤 *İletişim Bilgileri:*
• İsim: ${formData.name}
• Telefon: ${formData.phone}`;

    // Redirect to WhatsApp
    const url = `https://wa.me/905313669936?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 fade-in">
      <div className="bg-[#2b050a] w-full max-w-lg rounded-3xl border border-[#D4AF37] shadow-[0_0_80px_rgba(212,175,55,0.2)] relative overflow-hidden">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white z-20"><i className="fas fa-times text-xl"></i></button>
        
        <div className="p-8 relative z-10">
           <div className="text-center mb-8">
             <div className="inline-block p-4 rounded-full bg-[#D4AF37]/10 mb-4 ring-1 ring-[#D4AF37]/50"><i className="fas fa-calculator text-[#D4AF37] text-3xl"></i></div>
             <h2 className="text-3xl font-serif text-white mb-2">Hızlı Fiyat Teklifi</h2>
             <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest">WhatsApp Üzerinden Anında Fiyat</p>
           </div>

           <form onSubmit={handleSubmit}>
             {step === 1 && (
               <div className="space-y-5 animate-in slide-in-from-right duration-300">
                  <div>
                    <label className="block text-white/50 text-[10px] font-bold uppercase mb-2">Hizmet Türü</label>
                    <div className="grid grid-cols-3 gap-2">
                       {['Evden Eve', 'Ofis', 'Depolama'].map(t => (
                         <button type="button" key={t} onClick={() => setFormData({...formData, type: t})} className={`p-4 rounded-xl border text-sm font-bold transition-all ${formData.type === t ? 'bg-[#D4AF37] text-[#2b050a] border-[#D4AF37] shadow-lg' : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'}`}>
                           {t}
                         </button>
                       ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-white/50 text-[10px] font-bold uppercase mb-2">Nereden</label>
                        <select className="w-full bg-[#200408] border border-white/20 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none" onChange={e => setFormData({...formData, from: e.target.value})} value={formData.from}>
                           <option value="Kadıköy">Kadıköy</option>
                           <option value="Beşiktaş">Beşiktaş</option>
                           <option value="Ataşehir">Ataşehir</option>
                           <option value="Üsküdar">Üsküdar</option>
                           <option value="Diğer">Diğer</option>
                        </select>
                     </div>
                     <div>
                        <label className="block text-white/50 text-[10px] font-bold uppercase mb-2">Nereye</label>
                        <select className="w-full bg-[#200408] border border-white/20 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none" onChange={e => setFormData({...formData, to: e.target.value})} value={formData.to}>
                           <option value="Beşiktaş">Beşiktaş</option>
                           <option value="Kadıköy">Kadıköy</option>
                           <option value="Şişli">Şişli</option>
                           <option value="Sarıyer">Sarıyer</option>
                           <option value="Diğer">Diğer</option>
                        </select>
                     </div>
                  </div>
                  <div>
                    <label className="block text-white/50 text-[10px] font-bold uppercase mb-2">Eşya Durumu</label>
                    <select className="w-full bg-[#200408] border border-white/20 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none" onChange={e => setFormData({...formData, roomSize: e.target.value})} value={formData.roomSize}>
                       <option value="2+1">2+1 Standart Daire</option>
                       <option value="3+1">3+1 Standart Daire</option>
                       <option value="1+1">1+1 / Stüdyo</option>
                       <option value="Villa">Villa / Müstakil</option>
                       <option value="Parca">Parça Eşya</option>
                    </select>
                  </div>
                  <button type="button" onClick={() => setStep(2)} className="w-full bg-gradient-gold text-[#2b050a] py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-lg mt-4">
                    Devam Et <i className="fas fa-arrow-right ml-2"></i>
                  </button>
               </div>
             )}

             {step === 2 && (
               <div className="space-y-5 animate-in slide-in-from-right duration-300">
                  <div>
                    <label className="block text-white/50 text-[10px] font-bold uppercase mb-2">Adınız Soyadınız</label>
                    <input required type="text" className="w-full bg-[#200408] border border-white/20 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none" placeholder="Adınız" onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-white/50 text-[10px] font-bold uppercase mb-2">Telefon Numaranız</label>
                    <input required type="tel" className="w-full bg-[#200408] border border-white/20 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none" placeholder="05XX XXX XX XX" onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-white/50 text-[10px] font-bold uppercase mb-2">Planlanan Tarih</label>
                    <input type="date" className="w-full bg-[#200408] border border-white/20 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none" onChange={e => setFormData({...formData, date: e.target.value})} />
                  </div>
                  <div className="flex gap-4 mt-4">
                     <button type="button" onClick={() => setStep(1)} className="flex-1 bg-white/5 text-white py-4 rounded-xl font-bold hover:bg-white/10">Geri</button>
                     <button type="submit" className="flex-[2] bg-[#25d366] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(37,211,102,0.4)] flex items-center justify-center gap-2">
                        <i className="fab fa-whatsapp text-2xl"></i> Fiyatı Gör
                     </button>
                  </div>
                  <p className="text-[10px] text-white/30 text-center mt-2">Bilgileriniz WhatsApp üzerinden iletilecektir.</p>
               </div>
             )}
           </form>
        </div>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const sendMail = (e: React.FormEvent) => {
    e.preventDefault();
    alert("İletişim talebiniz oluşturuldu. E-posta uygulamanız açılıyor...");
    
    const subject = encodeURIComponent("Web Sitesi İletişim Formu");
    const body = encodeURIComponent(`İsim: ${form.name}\nTelefon: ${form.phone}\n\nMesaj:\n${form.message}`);
    
    window.location.href = `mailto:sandikcioglunakliyat@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
      <h3 className="text-white font-serif text-2xl mb-6">Bize Yazın</h3>
      <form className="space-y-4" onSubmit={sendMail}>
         <input 
           type="text" 
           placeholder="Adınız Soyadınız" 
           className="w-full bg-[#2b050a] border border-white/20 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none" 
           required 
           value={form.name}
           onChange={e => setForm({...form, name: e.target.value})}
         />
         <input 
           type="tel" 
           placeholder="Telefon Numaranız" 
           className="w-full bg-[#2b050a] border border-white/20 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none" 
           required 
           value={form.phone}
           onChange={e => setForm({...form, phone: e.target.value})}
         />
         <textarea 
           placeholder="Mesajınız" 
           rows={3} 
           className="w-full bg-[#2b050a] border border-white/20 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none"
           value={form.message}
           onChange={e => setForm({...form, message: e.target.value})}
         ></textarea>
         <button className="w-full bg-[#D4AF37] text-[#2b050a] py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-white transition-colors">
            Gönder (E-Posta)
         </button>
      </form>
    </div>
  );
};

const BrandMarquee = () => (
  <div className="bg-[#200408] border-y border-[#D4AF37]/10 py-10 overflow-hidden relative">
    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#200408] to-transparent z-10"></div>
    <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#200408] to-transparent z-10"></div>
    <div className="scrolling-wrapper flex items-center gap-20 opacity-50 hover:opacity-100 transition-opacity duration-500">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 text-white/50 whitespace-nowrap font-serif font-bold text-2xl uppercase tracking-widest">
           <i className="fas fa-building text-[#D4AF37]"></i> 
           {['Eczacıbaşı', 'Koç Holding', 'Sabancı', 'THY', 'Acıbadem', 'Garanti BBVA'][i % 6]}
        </div>
      ))}
    </div>
  </div>
);

const TestimonialsSection = () => {
  const reviews = [
    { name: "Ahmet Yılmaz", role: "Evden Eve Müşterisi", text: "İstanbul'dan İzmir'e taşınırken tercih ettik. Eşyalarımda çizik bile yoktu. Ekip çok saygılıydı.", rating: 5 },
    { name: "Ayşe Kaya", role: "Ofis Taşıma", text: "Şirket merkezimizi bir günde taşıdılar. İş kaybı yaşamadık. Profesyonellikleri için teşekkürler.", rating: 5 },
    { name: "Mehmet Demir", role: "Depolama Hizmeti", text: "Eşyalarımı 6 ay depolarında sakladım. Geri aldığımda ilk günkü gibi temizdi. Güvenilir firma.", rating: 5 },
  ];

  return (
    <section className="py-24 px-6 bg-[#200408] border-t border-[#D4AF37]/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
           <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em] block mb-4">Referanslar</span>
           <h2 className="text-4xl md:text-5xl font-serif text-white">Mutlu <span className="text-[#D4AF37] italic">Müşteriler</span></h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
           {reviews.map((r, i) => (
             <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
                <div className="flex text-[#D4AF37] mb-4 gap-1">
                  {[...Array(r.rating)].map((_, ri) => <i key={ri} className="fas fa-star"></i>)}
                </div>
                <p className="text-white/70 italic mb-6 leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                   <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#2b050a] font-bold text-lg">
                      {r.name.charAt(0)}
                   </div>
                   <div>
                      <div className="text-white font-bold">{r.name}</div>
                      <div className="text-white/40 text-xs">{r.role}</div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}

const Header = ({ servicesData, onOpenQuote }: { servicesData: Record<string, ServiceDetail>, onOpenQuote: () => void }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#2b050a]/90 backdrop-blur-md sticky top-0 z-50 border-b border-[#D4AF37]/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-4 group">
          <LogoIcon className="w-12 h-12 group-hover:rotate-180 transition-transform duration-700" />
          <div className="leading-none hidden md:block">
            <span className="block text-2xl font-serif font-black text-gradient-gold tracking-tight">SANDIKÇIOĞLU</span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-white/50 font-bold">Profesyonel Nakliyat & Depolama</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-white/70">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-[#D4AF37] hover:after:w-full after:transition-all">Ana Sayfa</Link>
          
          <div 
            className="relative group h-full py-4"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="hover:text-[#D4AF37] flex items-center gap-1">
              Hizmetler <i className="fas fa-chevron-down text-[8px]"></i>
            </button>
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-[#2b050a] border border-[#D4AF37]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl p-8 grid grid-cols-2 gap-6 transition-all duration-300 origin-top ${dropdownOpen ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
              {Object.values(servicesData).map(service => (
                <Link key={service.id} to={`/hizmet/${service.id}`} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 group/item border border-transparent hover:border-white/5 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] text-lg group-hover/item:bg-[#D4AF37] group-hover/item:text-[#2b050a] transition-colors shadow-lg">
                    <i className={`fas ${service.icon}`}></i>
                  </div>
                  <div>
                    <span className="block text-[#D4AF37] text-xs font-black mb-1">{service.title}</span>
                    <span className="block text-[9px] text-white/40 leading-tight">{service.shortDesc}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link to="/ai-asistan" className="hover:text-[#D4AF37] transition-colors flex items-center gap-2 group">
            <i className="fas fa-sparkles text-[#D4AF37] group-hover:animate-spin"></i> AI Asistan
          </Link>
          <Link to="/blog" className="hover:text-[#D4AF37] transition-colors">Blog</Link>
          <Link to="/iletisim" className="hover:text-[#D4AF37] transition-colors">İletişim</Link>
        </div>

        <div className="flex items-center gap-4">
           <button onClick={onOpenQuote} className="hidden md:flex bg-gradient-gold text-[#2b050a] px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all duration-300 items-center gap-2">
             <i className="fas fa-calculator"></i> Teklif Al
           </button>
           <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#D4AF37] text-2xl p-2">
             <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
           </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#2b050a] border-t border-[#D4AF37]/20 p-6 flex flex-col gap-6 text-center h-screen fixed w-full z-50">
           <Link to="/" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#D4AF37] text-lg font-serif">Ana Sayfa</Link>
           <Link to="/ai-asistan" onClick={() => setMenuOpen(false)} className="text-[#D4AF37] font-bold flex items-center justify-center gap-2 text-lg"><i className="fas fa-sparkles"></i> AI Asistan</Link>
           <button onClick={() => { onOpenQuote(); setMenuOpen(false); }} className="bg-[#D4AF37] text-[#2b050a] px-4 py-4 rounded-xl font-bold w-full uppercase tracking-widest">Hemen Teklif Al</button>
           <div className="border-t border-white/10 pt-6 grid grid-cols-2 gap-3">
              {Object.values(servicesData).map(s => (
                <Link key={s.id} to={`/hizmet/${s.id}`} onClick={() => setMenuOpen(false)} className="text-[10px] text-white/60 p-3 border border-white/5 rounded-lg hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors bg-white/5">{s.title}</Link>
              ))}
           </div>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ districtList }: { districtList: District[] }) => {
  return (
    <footer className="bg-[#200408] border-t border-[#D4AF37]/20 pt-24 pb-24 px-6 mt-auto relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#2b050a] border border-[#D4AF37]/30 p-4 rounded-full">
         <LogoIcon className="w-12 h-12" />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1">
             <span className="text-2xl font-serif text-[#D4AF37] font-bold block mb-6">SANDIKÇIOĞLU</span>
             <p className="text-white/40 text-xs leading-loose mb-6">
               Sandıkçıoğlu Nakliyat, 1999 yılından beri İstanbul merkezli olarak tüm Türkiye'ye sigortalı, asansörlü ve kurumsal taşımacılık hizmetleri sunan, sektörün lider markasıdır.
             </p>
             <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#D4AF37] hover:text-[#2b050a] transition-all"><i className="fab fa-instagram"></i></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#D4AF37] hover:text-[#2b050a] transition-all"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-[#D4AF37] hover:text-[#2b050a] transition-all"><i className="fab fa-linkedin-in"></i></a>
             </div>
          </div>
          
          <div className="col-span-2">
             <h4 className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em] mb-8 border-b border-[#D4AF37]/20 pb-4 inline-block">Hizmet Ağımız</h4>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-3 h-64 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-[#D4AF37] scrollbar-track-[#2b050a]">
                {districtList.map(d => (
                  <Link key={d.id} to={`/bolge/${d.id}`} className="text-[11px] text-white/40 hover:text-[#D4AF37] transition-colors font-bold truncate flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37]/50"></span> {d.name}
                  </Link>
                ))}
             </div>
          </div>

          <div>
             <h4 className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em] mb-8 border-b border-[#D4AF37]/20 pb-4 inline-block">Merkez Ofis</h4>
             <div className="space-y-6">
               <a href="tel:05313669936" className="flex items-center gap-4 group">
                 <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#2b050a] transition-all"><i className="fas fa-phone"></i></div>
                 <div>
                    <div className="text-[9px] uppercase text-white/40 font-bold">7/24 Çağrı Merkezi</div>
                    <span className="text-white font-bold text-lg group-hover:text-[#D4AF37]">0531 366 99 36</span>
                 </div>
               </a>
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]"><i className="fas fa-envelope"></i></div>
                 <div>
                    <div className="text-[9px] uppercase text-white/40 font-bold">Kurumsal Mail</div>
                    <span className="text-white/60 text-xs">sandikcioglunakliyat@gmail.com</span>
                 </div>
               </div>
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]"><i className="fas fa-map-marker-alt"></i></div>
                 <div>
                    <div className="text-[9px] uppercase text-white/40 font-bold">Lokasyon</div>
                    <span className="text-white/60 text-xs">Maltepe / İstanbul</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 gap-4">
           <p className="text-white/20 text-[10px] uppercase tracking-widest">© 2026 Sandıkçıoğlu Nakliyat. KVKK ve Gizlilik Politikası.</p>
           <div className="flex gap-4 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
              <i className="fab fa-cc-visa text-2xl text-white"></i>
              <i className="fab fa-cc-mastercard text-2xl text-white"></i>
              <i className="fas fa-shield-alt text-2xl text-white"></i>
           </div>
        </div>
      </div>
    </footer>
  );
};

const MobileBar = ({ onOpenQuote }: { onOpenQuote: () => void }) => (
  <div className="md:hidden fixed bottom-0 left-0 w-full z-[90] flex h-16 bg-[#2b050a] border-t border-[#D4AF37]/30 shadow-[0_-5px_30px_rgba(0,0,0,0.8)]">
    <button onClick={onOpenQuote} className="flex-1 flex items-center justify-center gap-2 bg-[#800020] text-white font-black text-xs uppercase tracking-wider hover:bg-[#600018] transition-colors">
      <i className="fas fa-calculator animate-bounce"></i> Fiyat Al
    </button>
    <a href="https://wa.me/905313669936" className="flex-1 flex items-center justify-center gap-2 bg-[#25d366] text-white font-black text-xs uppercase tracking-wider hover:bg-[#1ebc59] transition-colors">
      <i className="fab fa-whatsapp text-xl"></i> WhatsApp
    </a>
  </div>
);

// --- PAGES ---

const AIAssistantPage = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Merhaba! Ben Sandıkçıoğlu Nakliyat Asistanı. Size nasıl yardımcı olabilirim? (Örn: "3+1 evimi taşımak istiyorum" veya "Eşya depolama fiyatlarınız nedir?")' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      // Determine context based on keywords
      let context = 'general';
      if (userMsg.toLowerCase().includes('depo') || userMsg.toLowerCase().includes('saklama')) context = 'storage';
      if (userMsg.toLowerCase().includes('ofis') || userMsg.toLowerCase().includes('işyeri')) context = 'office';

      const response = await geminiService.chatWithGemini(userMsg, 'standard', context as any);
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Üzgünüm, şu an bağlantıda bir sorun var. Lütfen 0531 366 99 36 hattımızdan ulaşın.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen flex flex-col max-w-4xl mx-auto">
       <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-[#D4AF37]/10 mb-4 ring-1 ring-[#D4AF37]/50"><i className="fas fa-robot text-[#D4AF37] text-3xl animate-bounce"></i></div>
          <h1 className="text-4xl font-serif text-white mb-2">Akıllı Asistan</h1>
          <p className="text-white/60">Sorularınızı anında yanıtlıyor, taşınma planınızı oluşturuyoruz.</p>
       </div>

       <div className="flex-grow bg-[#200408] rounded-3xl border border-[#D4AF37]/20 p-6 flex flex-col h-[600px] shadow-2xl overflow-hidden">
          <div className="flex-grow overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-[#D4AF37] scrollbar-track-transparent">
             {messages.map((msg, idx) => (
               <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-[#D4AF37] text-[#2b050a] rounded-tr-none font-bold' : 'bg-white/10 text-white rounded-tl-none border border-white/5'}`}>
                     {msg.text}
                  </div>
               </div>
             ))}
             {isLoading && (
               <div className="flex justify-start">
                  <div className="bg-white/10 text-white p-4 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2">
                     <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce"></span>
                     <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce delay-100"></span>
                     <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-bounce delay-200"></span>
                  </div>
               </div>
             )}
             <div ref={bottomRef}></div>
          </div>
          
          <form onSubmit={handleSend} className="mt-4 flex gap-4 border-t border-white/10 pt-4">
             <input 
               autoFocus
               type="text" 
               className="flex-grow bg-[#2b050a] border border-white/20 rounded-xl p-4 text-white focus:border-[#D4AF37] outline-none placeholder:text-white/20"
               placeholder="Mesajınızı yazın..."
               value={input}
               onChange={e => setInput(e.target.value)}
             />
             <button type="submit" disabled={isLoading} className="bg-[#D4AF37] text-[#2b050a] px-8 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-50">
                <i className="fas fa-paper-plane"></i>
             </button>
          </form>
       </div>
    </div>
  );
};

const HomePage = ({ services, blogPosts, onOpenQuote }: { services: Record<string, ServiceDetail>, blogPosts: BlogPost[], onOpenQuote: () => void }) => {
  const seoContent = generateLongSEOContent('İstanbul Nakliyat ve Taşımacılık Hizmetleri', 'service');

  return (
  <div className="fade-in">
    {/* Hero Section */}
    <section className="h-screen relative flex items-center justify-center overflow-hidden bg-[#2b050a]">
      <div className="absolute inset-0 bg-gradient-to-r from-[#200408] via-[#2b050a]/80 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#2b050a] via-transparent to-transparent z-10"></div>
      <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80" className="absolute inset-0 w-full h-full object-cover opacity-60 animate-soft-zoom" alt="Lüks Nakliyat" />
      
      <div className="relative z-20 container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
         <div className="text-left">
           <div className="mb-8 inline-flex items-center gap-3 p-4 px-6 rounded-full border border-[#D4AF37]/30 bg-black/60 backdrop-blur-md animate-pulse shadow-[0_0_30px_rgba(212,175,55,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"></span>
              <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em]">İstanbul'un Lider Nakliye Markası</span>
           </div>
           <h1 className="text-5xl md:text-8xl font-serif font-black text-white mb-8 leading-[0.95] drop-shadow-2xl">
             Evinizi <br/> <span className="text-gradient-gold italic">Güvenle Taşıyoruz</span>
           </h1>
           <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-xl leading-relaxed font-light">
             Eşyalarınız bizimle güvende. Sigortalı, asansörlü ve ambalajlı taşımacılık ile yeni evinize huzurla yerleşin.
           </p>
           <div className="flex flex-col sm:flex-row gap-6">
              <button onClick={onOpenQuote} className="btn-shine bg-gradient-gold text-[#2b050a] px-12 py-5 rounded-full font-black uppercase tracking-widest shadow-[0_0_50px_rgba(212,175,55,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-3 text-sm">
                <i className="fas fa-calculator"></i> Hemen Fiyat Al
              </button>
              <Link to="/ai-asistan" className="px-12 py-5 rounded-full border border-[#D4AF37]/50 text-white font-bold uppercase tracking-widest hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all flex items-center justify-center gap-3 backdrop-blur-sm text-sm group">
                <i className="fas fa-robot group-hover:rotate-12 transition-transform"></i> Asistana Sor
              </Link>
           </div>
         </div>
         
         {/* Hero Right Visual Element */}
         <div className="hidden md:block relative">
            <div className="absolute -inset-10 bg-[#D4AF37] opacity-20 blur-[100px] rounded-full"></div>
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700">
                <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-6">
                   <div className="w-16 h-16 rounded-2xl bg-[#D4AF37] flex items-center justify-center text-3xl text-[#2b050a] shadow-lg"><i className="fas fa-award"></i></div>
                   <div>
                      <div className="text-white font-bold text-xl">Premium Hizmet</div>
                      <div className="text-white/50 text-sm">Altın Standartlarında Nakliye</div>
                   </div>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center justify-between text-sm text-white/80">
                      <span>Müşteri Memnuniyeti</span>
                      <span className="font-bold text-[#D4AF37]">%100</span>
                   </div>
                   <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-[#D4AF37]"></div>
                   </div>
                   <div className="flex items-center justify-between text-sm text-white/80 pt-2">
                      <span>Zamanında Teslimat</span>
                      <span className="font-bold text-[#D4AF37]">%99.8</span>
                   </div>
                   <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-[99.8%] h-full bg-[#D4AF37]"></div>
                   </div>
                </div>
            </div>
         </div>
      </div>
    </section>

    <BrandMarquee />
    
    <div className="bg-[#D4AF37] text-[#2b050a] py-6 text-center font-black text-sm md:text-base cursor-pointer hover:bg-white transition-colors relative overflow-hidden group" onClick={onOpenQuote}>
       <div className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-45 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
       <i className="fas fa-bell mr-3 animate-swing text-lg"></i> ERKEN REZERVASYON FIRSATI: Şehirler Arası taşınmalarda %20 İndirim! <span className="underline ml-2">Teklif Almak İçin Tıklayın.</span>
    </div>

    {/* Services Grid */}
    <section className="py-32 px-6 relative bg-noise">
       <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em] block mb-4">Hizmetlerimiz</span>
             <h2 className="text-5xl md:text-6xl font-serif text-white mb-6">Taşımacılık <span className="text-[#D4AF37] italic">Sanatı</span></h2>
             <p className="text-white/50 max-w-2xl mx-auto text-lg">İhtiyacınıza özel tasarlanmış, teknoloji ve tecrübenin birleştiği taşıma modelleri.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
             {Object.values(services).slice(0, 3).map(s => (
                <Link key={s.id} to={`/hizmet/${s.id}`} className="group relative bg-[#200408] rounded-[3rem] overflow-hidden border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-500 hover:-translate-y-4 h-[500px] flex flex-col justify-end p-10 shadow-2xl">
                   <img src={s.heroImg} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700" alt={s.title} />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#200408] via-[#200408]/60 to-transparent"></div>
                   
                   <div className="relative z-10">
                      <div className="w-16 h-16 bg-[#D4AF37] rounded-3xl flex items-center justify-center text-[#2b050a] text-3xl mb-8 shadow-[0_0_30px_rgba(212,175,55,0.4)] rotate-3 group-hover:rotate-0 transition-all duration-300">
                         <i className={`fas ${s.icon}`}></i>
                      </div>
                      <h3 className="text-4xl font-serif text-white mb-4 group-hover:text-[#D4AF37] transition-colors leading-none">{s.title}</h3>
                      <p className="text-white/80 text-sm mb-8 line-clamp-3 opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 delay-100 leading-relaxed">{s.shortDesc}</p>
                      <span className="inline-flex items-center gap-4 text-white text-xs font-black uppercase tracking-widest border-b border-[#D4AF37] pb-2 group-hover:text-[#D4AF37] transition-colors">
                        İncele <i className="fas fa-long-arrow-alt-right"></i>
                      </span>
                   </div>
                </Link>
             ))}
          </div>
          <div className="text-center mt-16">
             <Link to="/iletisim" className="inline-block border border-white/10 text-white/60 px-10 py-4 rounded-full hover:bg-[#D4AF37] hover:text-[#2b050a] hover:border-[#D4AF37] transition-all uppercase font-bold tracking-widest text-xs">Tüm Hizmetleri Görüntüle</Link>
          </div>
       </div>
    </section>

    {/* Domestic Focus Section (Replaced Global Network) */}
    <section className="py-32 px-6 bg-[#200408] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-no-repeat bg-contain opacity-5"></div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
           <div>
              <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em] block mb-4">Hizmet Ağı</span>
              <h2 className="text-5xl md:text-7xl font-serif text-white mb-8">Tüm Türkiye'de <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]">Sizinleyiz</span></h2>
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                Sandıkçıoğlu Nakliyat olarak İstanbul merkezli olmak üzere, 81 ile sigortalı şehirler arası taşımacılık hizmeti veriyoruz. Geniş araç filomuz ve yerel şubelerimizle, eşyalarınız Türkiye'nin her noktasına güvenle ulaşır.
              </p>
              <div className="grid grid-cols-2 gap-8">
                 <div className="border-l-2 border-[#D4AF37] pl-6">
                    <div className="text-4xl font-black text-white mb-1">81</div>
                    <div className="text-xs uppercase tracking-widest text-white/50">İl Geneli Hizmet</div>
                 </div>
                 <div className="border-l-2 border-[#D4AF37] pl-6">
                    <div className="text-4xl font-black text-white mb-1">25+</div>
                    <div className="text-xs uppercase tracking-widest text-white/50">Yıllık Tecrübe</div>
                 </div>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 mt-12">
                 <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80" className="rounded-3xl shadow-2xl opacity-80 hover:opacity-100 transition-opacity" />
                 <img src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80" className="rounded-3xl shadow-2xl opacity-60 hover:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-6">
                 <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80" className="rounded-3xl shadow-2xl opacity-60 hover:opacity-100 transition-opacity" />
                 <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80" className="rounded-3xl shadow-2xl opacity-80 hover:opacity-100 transition-opacity" />
              </div>
           </div>
        </div>
    </section>

    {/* Testimonials Section */}
    <TestimonialsSection />

    {/* SEO Content Section (Rich Text) */}
    <section className="py-24 px-6 bg-[#2b050a] border-t border-[#D4AF37]/10">
      <div className="max-w-5xl mx-auto">
        <div 
           className="prose prose-invert prose-lg max-w-none text-white/60 prose-headings:font-serif prose-headings:text-[#D4AF37] prose-a:text-[#D4AF37] prose-strong:text-white prose-li:text-white/70"
           dangerouslySetInnerHTML={{ __html: seoContent }} 
         />
      </div>
    </section>

  </div>
  );
};

const ServicePage = ({ data, onOpenQuote }: { data: Record<string, ServiceDetail>, onOpenQuote: () => void }) => {
  const { slug } = useParams();
  const service = data[slug || ''];

  if (!service) return <div className="p-20 text-center text-white">Hizmet bulunamadı.</div>;

  return (
    <div className="fade-in pt-10">
      <div className="md:hidden sticky top-20 z-40 bg-[#D4AF37] text-[#2b050a] p-3 text-center font-bold text-sm shadow-lg mb-4 cursor-pointer" onClick={onOpenQuote}>
         Bu Hizmet İçin Özel Fiyat Al <i className="fas fa-arrow-right ml-1"></i>
      </div>

      <div className="relative h-[60vh] flex items-center justify-center bg-[#2b050a]">
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b050a] via-[#2b050a]/40 to-transparent z-10"></div>
        <img src={service.heroImg} className="absolute inset-0 w-full h-full object-cover opacity-50 parallax" alt={service.title} />
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
           <div className="inline-block p-4 rounded-full bg-[#D4AF37]/20 backdrop-blur-md mb-8 ring-1 ring-[#D4AF37]/50">
             <i className={`fas ${service.icon} text-4xl text-[#D4AF37]`}></i>
           </div>
           <h1 className="text-5xl md:text-7xl font-serif font-black text-white mb-6 drop-shadow-xl">{service.title}</h1>
           <p className="text-[#D4AF37] text-xl md:text-2xl italic font-light">{service.shortDesc}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-12 gap-16">
         {/* Main Content */}
         <div className="md:col-span-8">
            <div 
              className="prose prose-invert prose-xl max-w-none text-white/80 prose-headings:font-serif prose-headings:text-[#D4AF37] prose-strong:text-white prose-li:text-white/80 mb-16"
              dangerouslySetInnerHTML={{ __html: service.htmlContent }} 
            />
            
            {/* Gallery Section */}
            <h3 className="text-3xl font-serif text-white mb-8 border-l-4 border-[#D4AF37] pl-4">Operasyon Görselleri</h3>
            <div className="grid grid-cols-2 gap-4 mb-16">
               {service.gallery.map((img, idx) => (
                  <div key={idx} className="relative rounded-2xl overflow-hidden group h-64">
                     <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Hizmet Detay" />
                     <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <i className="fas fa-search-plus text-[#D4AF37] text-3xl"></i>
                     </div>
                  </div>
               ))}
            </div>

            {/* Reviews Section */}
            <div className="bg-[#200408] border border-white/5 p-10 rounded-3xl">
               <h3 className="text-2xl font-serif text-white mb-8 flex items-center gap-3"><i className="fas fa-star text-[#D4AF37]"></i> Müşteri Deneyimleri</h3>
               <div className="space-y-8">
                  <div className="border-b border-white/5 pb-8">
                     <div className="flex justify-between mb-4">
                        <div className="font-bold text-white">Caner Erkin</div>
                        <div className="text-[#D4AF37] text-xs"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
                     </div>
                     <p className="text-white/60 italic">"Gerçekten VIP bir hizmet. Hiçbir eşyama elimi sürmeden taşındım. Ekip çok profesyoneldi, özellikle mobilya montajındaki titizliklerine hayran kaldım."</p>
                  </div>
                  <div>
                     <div className="flex justify-between mb-4">
                        <div className="font-bold text-white">Selin Demir</div>
                        <div className="text-[#D4AF37] text-xs"><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i></div>
                     </div>
                     <p className="text-white/60 italic">"Ofisimizi hafta sonu taşıdılar, Pazartesi sabahı her şey yerli yerindeydi. İş kaybı yaşamadan bu süreci atlattık. Teşekkürler Sandıkçıoğlu."</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar */}
         <div className="md:col-span-4 space-y-8">
            <div className="bg-gradient-to-b from-[#D4AF37] to-[#AA8A1E] p-[1px] rounded-3xl sticky top-32">
               <div className="bg-[#2b050a] p-8 rounded-[23px] text-center">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#D4AF37] text-2xl animate-pulse">
                     <i className="fas fa-file-invoice-dollar"></i>
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-4">Özel Teklif Alın</h3>
                  <p className="text-white/60 text-sm mb-8">Bu hizmet için %20'ye varan online indirim fırsatını kaçırmayın.</p>
                  <button onClick={onOpenQuote} className="w-full bg-[#D4AF37] text-[#2b050a] py-4 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                    Fiyat Hesapla
                  </button>
                  <div className="mt-4 text-[10px] text-white/30">
                    <i className="fas fa-lock mr-1"></i> SSL Korumalı Güvenli Form
                  </div>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
               <h4 className="text-[#D4AF37] font-bold uppercase tracking-widest text-xs mb-6">Hizmet Garantileri</h4>
               <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-white/80 text-sm">
                     <i className="fas fa-check-circle text-[#D4AF37]"></i> Sigortalı Taşımacılık
                  </li>
                  <li className="flex items-center gap-3 text-white/80 text-sm">
                     <i className="fas fa-check-circle text-[#D4AF37]"></i> Sabit Fiyat Garantisi
                  </li>
                  <li className="flex items-center gap-3 text-white/80 text-sm">
                     <i className="fas fa-check-circle text-[#D4AF37]"></i> Uzman Marangoz Hizmeti
                  </li>
                  <li className="flex items-center gap-3 text-white/80 text-sm">
                     <i className="fas fa-check-circle text-[#D4AF37]"></i> Hijyenik Ambalajlama
                  </li>
               </ul>
            </div>
         </div>
      </div>
    </div>
  );
};

const DistrictPage = ({ list, onOpenQuote }: { list: District[], onOpenQuote: () => void }) => {
  const { slug } = useParams();
  const district = list.find(d => d.id === slug);
  const name = district ? district.name : "İstanbul";
  const htmlContent = generateLongSEOContent(name + ' Nakliyat', 'district');

  return (
    <div className="fade-in pt-20">
       <div className="bg-[#2b050a] py-32 px-6 text-center border-b border-[#D4AF37]/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.6em] mb-6 block relative z-10">Bölgesel Nakliye Çözümleri</span>
          <h1 className="text-5xl md:text-8xl font-serif font-black text-white mb-8 relative z-10">
            {name} <span className="text-stroke-gold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">Nakliyat</span>
          </h1>
          <button onClick={onOpenQuote} className="mt-8 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] px-10 py-4 rounded-full hover:bg-[#D4AF37] hover:text-[#2b050a] transition-all uppercase font-black text-sm tracking-widest relative z-10 group">
            {name} Nakliye Fiyatları <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
          </button>
       </div>

       <div className="max-w-4xl mx-auto px-6 py-20">
          <div 
             className="prose prose-invert prose-xl max-w-none text-white/80 prose-headings:font-serif prose-headings:text-[#D4AF37] prose-strong:text-white prose-li:text-white/80"
             dangerouslySetInnerHTML={{ __html: htmlContent }} 
           />
       </div>
    </div>
  );
};

// --- BLOG LIST PAGE WITH PAGINATION ---

const BlogListPage = ({ posts }: { posts: BlogPost[] }) => {
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 9;

  useEffect(() => {
    // Initial load
    setDisplayedPosts(posts.slice(0, POSTS_PER_PAGE));
  }, [posts]);

  const loadMore = () => {
    const nextPage = page + 1;
    const newPosts = posts.slice(0, nextPage * POSTS_PER_PAGE);
    setDisplayedPosts(newPosts);
    setPage(nextPage);
  };

  return (
    <div className="fade-in pt-40 px-6 pb-20">
       <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h1 className="text-5xl md:text-7xl font-serif text-[#D4AF37] mb-6">Blog & Haberler</h1>
             <p className="text-white/50 text-xl max-w-2xl mx-auto">Sektörden {posts.length} adet güncel makale, uzman tavsiyesi ve fiyat analizi.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 mb-16">
             {displayedPosts.map(post => (
                <Link key={post.id} to={`/blog/${post.id}`} className="group bg-[#200408] border border-[#D4AF37]/10 rounded-[2rem] overflow-hidden hover:border-[#D4AF37] transition-all hover:-translate-y-2 shadow-2xl flex flex-col h-[500px]">
                   <div className="h-56 overflow-hidden relative shrink-0">
                      <img src={post.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} loading="lazy" />
                      <div className="absolute top-6 left-6 bg-[#2b050a]/90 backdrop-blur px-4 py-2 rounded-full text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest shadow-lg">{post.tag}</div>
                   </div>
                   <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-white/40 text-[10px] uppercase font-bold tracking-widest mb-4">
                         <i className="far fa-calendar"></i> {post.date}
                      </div>
                      <h2 className="text-xl font-serif text-white group-hover:text-[#D4AF37] transition-colors mb-4 leading-tight">{post.title}</h2>
                      <p className="text-white/50 text-sm line-clamp-3 mb-6 leading-relaxed flex-1">{post.excerpt}</p>
                      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">SN</div>
                            <span className="text-xs text-white/60 font-bold">Sandıkçıoğlu</span>
                         </div>
                         <span className="text-[#D4AF37] text-xs font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform"><i className="fas fa-arrow-right"></i></span>
                      </div>
                   </div>
                </Link>
             ))}
          </div>

          {displayedPosts.length < posts.length && (
            <div className="text-center">
              <button onClick={loadMore} className="bg-transparent border border-[#D4AF37] text-[#D4AF37] px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#2b050a] transition-all">
                Daha Fazla Göster ({posts.length - displayedPosts.length})
              </button>
            </div>
          )}
       </div>
    </div>
  );
};

// --- BLOG DETAIL PAGE WITH DYNAMIC GENERATION ---

const BlogDetailPage = ({ posts }: { posts: BlogPost[] }) => {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);

  // Dynamic Content Generation based on ID/Title
  // If content exists (it won't in the massive list to save memory), use it.
  // Otherwise, generate it on the fly.
  const content = post ? getBlogPostContentById(post.id, posts) : "";

  // NEW: Calculate Reading Time
  const calculateReadingTime = (htmlContent: string) => {
     const text = htmlContent.replace(/<[^>]*>/g, ' '); // Strip HTML
     const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
     const readingSpeed = 200; // Words per minute
     const minutes = Math.ceil(wordCount / readingSpeed);
     return minutes || 1;
  };
  
  const readingTime = calculateReadingTime(content);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
        <div className="pt-40 pb-20 text-center px-6">
            <h2 className="text-2xl text-white font-serif mb-4">Aradığınız yazı bulunamadı.</h2>
            <Link to="/blog" className="text-[#D4AF37] underline">Blog listesine dön</Link>
        </div>
    );
  }

  return (
    <div className="fade-in pt-32 px-6 pb-20">
       <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors mb-8 text-xs font-bold uppercase tracking-widest">
             <i className="fas fa-arrow-left"></i> Blog Listesi
          </Link>

          <div className="mb-8">
             <div className="flex items-center gap-4 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4">
                <span>{post.tag}</span>
                <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                <span>{post.date}</span>
                {/* NEW: Reading Time Display */}
                <span className="w-1 h-1 bg-white/30 rounded-full"></span>
                <span><i className="far fa-clock mr-1"></i> {readingTime} dk okuma</span>
             </div>
             <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-8">{post.title}</h1>
          </div>

          <div className="rounded-[3rem] overflow-hidden mb-16 border border-[#D4AF37]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative h-[500px]">
             <img src={post.img} alt={post.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#2b050a] via-transparent to-transparent opacity-80"></div>
          </div>

          {/* Dynamic Content Rendering */}
          <div className="prose prose-invert prose-xl max-w-none text-white/80 mb-20 prose-headings:font-serif prose-headings:text-[#D4AF37] prose-a:text-[#D4AF37] prose-strong:text-white prose-p:leading-loose"
             dangerouslySetInnerHTML={{ __html: content }}
          >
          </div>
       </div>
    </div>
  );
};

const Preview: React.FC<PreviewProps> = ({ servicesData, districtList, blogPosts }) => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <ScrollToTop />
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
      <Header servicesData={servicesData} onOpenQuote={() => setIsQuoteOpen(true)} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage services={servicesData} blogPosts={blogPosts} onOpenQuote={() => setIsQuoteOpen(true)} />} />
          <Route path="/hizmet/:slug" element={<ServicePage data={servicesData} onOpenQuote={() => setIsQuoteOpen(true)} />} />
          <Route path="/bolge/:slug" element={<DistrictPage list={districtList} onOpenQuote={() => setIsQuoteOpen(true)} />} />
          <Route path="/ai-asistan" element={<AIAssistantPage />} />
          <Route path="/blog" element={<BlogListPage posts={blogPosts} />} />
          <Route path="/blog/:id" element={<BlogDetailPage posts={blogPosts} />} />
          <Route path="/iletisim" element={
             <div className="fade-in pt-40 px-6 pb-20">
                <div className="max-w-6xl mx-auto">
                   <div className="text-center mb-20">
                      <span className="text-[#D4AF37] text-xs font-black uppercase tracking-[0.4em] mb-4 block">7/24 İletişim</span>
                      <h1 className="text-6xl font-serif text-white mb-8">Bize Ulaşın</h1>
                      <p className="text-white/60 text-xl">Uzman ekibimiz sorularınızı yanıtlamak için hazır.</p>
                   </div>
                   
                   <div className="grid md:grid-cols-2 gap-12 mb-20">
                      <div className="space-y-6">
                        {/* Contact Info Cards */}
                        <a href="tel:05313669936" className="bg-[#200408] border border-[#D4AF37]/20 p-8 rounded-[2rem] flex items-center gap-6 hover:bg-[#D4AF37] group transition-all duration-300">
                           <div className="w-16 h-16 rounded-full bg-[#2b050a] flex items-center justify-center text-[#D4AF37] text-2xl group-hover:text-white transition-colors shadow-xl"><i className="fas fa-phone-alt"></i></div>
                           <div>
                              <div className="text-white/50 text-xs uppercase tracking-widest mb-1 group-hover:text-[#2b050a] font-bold">Müşteri Hizmetleri</div>
                              <div className="text-2xl font-serif text-white group-hover:text-[#2b050a] font-black">0531 366 99 36</div>
                           </div>
                        </a>
                        
                        <a href="mailto:sandikcioglunakliyat@gmail.com" className="bg-[#200408] border border-[#D4AF37]/20 p-8 rounded-[2rem] flex items-center gap-6 hover:bg-[#D4AF37] group transition-all duration-300">
                           <div className="w-16 h-16 rounded-full bg-[#2b050a] flex items-center justify-center text-[#D4AF37] text-2xl group-hover:text-white transition-colors shadow-xl"><i className="fas fa-envelope"></i></div>
                           <div>
                              <div className="text-white/50 text-xs uppercase tracking-widest mb-1 group-hover:text-[#2b050a] font-bold">E-Posta</div>
                              <div className="text-lg font-serif text-white group-hover:text-[#2b050a] break-all">sandikcioglunakliyat@gmail.com</div>
                           </div>
                        </a>

                        <div className="bg-[#200408] border border-[#D4AF37]/20 p-8 rounded-[2rem]">
                            <h3 className="text-[#D4AF37] font-bold mb-4">Çalışma Saatleri</h3>
                            <ul className="space-y-2 text-white/70 text-sm">
                                <li className="flex justify-between border-b border-white/5 pb-2"><span>Pazartesi - Cumartesi:</span> <span>08:00 - 20:00</span></li>
                                <li className="flex justify-between border-b border-white/5 pb-2"><span>Pazar:</span> <span>10:00 - 18:00</span></li>
                            </ul>
                        </div>
                      </div>

                      {/* Map and Form */}
                      <div className="space-y-8">
                         <ContactForm />
                         <div className="h-64 rounded-[2rem] overflow-hidden border border-[#D4AF37]/30">
                            <iframe src="https://maps.google.com/maps?width=100%25&height=100%&hl=tr&q=Zümrütevler Mahallesi Canan Sokak No 94 Maltepe&t=&z=15&ie=UTF8&iwloc=B&output=embed" width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy"></iframe>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer districtList={districtList} />
      <MobileBar onOpenQuote={() => setIsQuoteOpen(true)} />
    </div>
  );
};

export default Preview;
