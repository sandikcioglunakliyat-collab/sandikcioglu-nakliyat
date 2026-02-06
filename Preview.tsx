import React from 'react';
import { CheckCircle2, Package, Shield, Truck } from 'lucide-react';

const Preview = () => {
  return (
    <div className="bg-[#2b050a] min-h-screen p-10 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-[#D4AF37] mb-12 italic border-b border-[#D4AF37]/20 pb-4">
          OPERASYON STANDARTLARIMIZ
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Teknik Kart 1 */}
          <div className="border border-white/10 p-8 rounded-3xl bg-white/5 hover:border-[#D4AF37] transition duration-500">
            <Package className="text-[#D4AF37] mb-6" size={40} />
            <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Premium Ambalaj (Kırmızı Patpat)</h3>
            <p className="text-sm text-gray-400 italic leading-relaxed">
              Eşyalarınız, piyasadaki en yüksek yoğunluğa sahip koyu kırmızı balonlu naylonlarla 3 katmanlı olarak sarılır. Kırılma riski sıfıra indirilir.
            </p>
          </div>

          {/* Teknik Kart 2 */}
          <div className="border border-white/10 p-8 rounded-3xl bg-white/5 hover:border-[#D4AF37] transition duration-500">
            <Shield className="text-[#D4AF37] mb-6" size={40} />
            <h3 className="text-xl font-bold mb-4 uppercase tracking-tighter">Tam Kapsamlı Sigorta</h3>
            <p className="text-sm text-gray-400 italic leading-relaxed">
              Sandıkçıoğlu bünyesindeki her taşıma, yükleme anından boşaltma anına kadar tam poliçe ile güvence altındadır.
            </p>
          </div>
        </div>

        <div className="mt-12 p-8 bg-[#D4AF37] rounded-3xl text-[#2b050a] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-black italic uppercase">Bize Ulaşın</h4>
            <p className="font-bold opacity-80 uppercase text-xs">0531 366 99 36 | sandikcioglunakliyat@gmail.com</p>
          </div>
          <button className="bg-[#2b050a] text-[#D4AF37] px-10 py-4 rounded-xl font-black hover:scale-105 transition">
            HEMEN TEKLİF AL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
