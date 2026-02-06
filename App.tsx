
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ServiceDetail, District, BlogPost } from './types';
import Preview from './components/Preview';

// --- SEO & CONTENT GENERATOR UTILS ---

const internalLinks = [
  { keyword: 'evden eve nakliyat', url: '#/hizmet/evden-eve' },
  { keyword: 'ev taşıma', url: '#/hizmet/evden-eve' },
  { keyword: 'ofis taşıma', url: '#/hizmet/ofis-tasima' },
  { keyword: 'büro nakliyesi', url: '#/hizmet/ofis-tasima' },
  { keyword: 'asansörlü nakliyat', url: '#/hizmet/asansorlu-nakliyat' },
  { keyword: 'asansörlü taşıma', url: '#/hizmet/asansorlu-nakliyat' },
  { keyword: 'villa taşıma', url: '#/hizmet/villa-tasima' },
  { keyword: 'eşya depolama', url: '#/hizmet/esya-depolama' },
  { keyword: 'depolama hizmeti', url: '#/hizmet/esya-depolama' },
  { keyword: 'piyano taşıma', url: '#/hizmet/piyano-kasa' },
  { keyword: 'kasa taşıma', url: '#/hizmet/piyano-kasa' },
  { keyword: 'şehirler arası nakliyat', url: '#/hizmet/evden-eve' },
  { keyword: 'parça eşya taşıma', url: '#/hizmet/evden-eve' },
  { keyword: 'sigortalı nakliyat', url: '#/hizmet/evden-eve' },
  { keyword: 'İstanbul', url: '#/' },
  { keyword: 'Kadıköy', url: '#/bolge/kadikoy' },
  { keyword: 'Beşiktaş', url: '#/bolge/besiktas' },
  { keyword: 'Ataşehir', url: '#/bolge/atasehir' },
  { keyword: 'Bakırköy', url: '#/bolge/bakirkoy' },
  { keyword: 'Üsküdar', url: '#/bolge/uskudar' },
  { keyword: 'Sarıyer', url: '#/bolge/sariyer' },
];

const injectLinks = (text: string): string => {
  let processedText = text;
  internalLinks.forEach(link => {
    // Only link the first occurrence to avoid spamming
    const regex = new RegExp(`(?<!<a[^>]*>)(${link.keyword})(?![^<]*</a>)`, 'i');
    processedText = processedText.replace(regex, `<a href="${link.url}" class="text-[#D4AF37] hover:underline font-bold transition-colors">$1</a>`);
  });
  return processedText;
};

// --- DATA BANKS FOR GENERATION ---
const districts = [
  "Kadıköy", "Beşiktaş", "Üsküdar", "Ataşehir", "Şişli", "Sarıyer", "Bakırköy", 
  "Beylikdüzü", "Maltepe", "Pendik", "Kartal", "Ümraniye", "Çekmeköy", "Beykoz", 
  "Fatih", "Zeytinburnu", "Başakşehir", "Bahçeşehir", "Tuzla", "Silivri", "Arnavutköy"
];

const services = [
  "Evden Eve Nakliyat", "Ofis Taşıma", "Eşya Depolama", "Asansörlü Nakliyat", 
  "Villa Taşıma", "Parça Eşya Taşıma", "Şehirler Arası Nakliyat", "Piyano Taşıma"
];

const adjectives = [
  "Profesyonel", "Sigortalı", "Ekonomik", "Hızlı", "Güvenilir", "Kurumsal", 
  "Anahtar Teslim", "VIP", "Garantili", "Sorunsuz"
];

const topics = [
  "Fiyatları", "Firmaları", "Tavsiyeleri", "Şirketleri", "Rehberi", "Püf Noktaları", 
  "Dikkat Edilmesi Gerekenler", "Nasıl Yapılır?", "Ücretleri 2026", "Kampanyaları"
];

// --- ADVANCED CONTENT GENERATOR ENGINES ---

/**
 * Generates ultra-rich, long-form content specifically for Service Detail Pages.
 * Designed to approximate 1500+ words with structured HTML.
 */
const generateMassiveServiceContent = (title: string): string => {
  const currentYear = 2026;
  
  // Specific sections logic
  const isOffice = title.toLowerCase().includes('ofis');
  const isStorage = title.toLowerCase().includes('depolama');
  const isHome = title.toLowerCase().includes('evden eve');
  const isVilla = title.toLowerCase().includes('villa');
  const isElevator = title.toLowerCase().includes('asansör');

  const baseHTML = `
    <div class="service-deep-dive space-y-12">
      <!-- Introduction Section -->
      <div class="intro-section">
        <p class="text-xl text-white/90 leading-relaxed font-light mb-6">
          <strong>${title}</strong> hizmetinde sektörün lider markası Sandıkçıoğlu Nakliyat olarak, ${currentYear} yılında da müşterilerimize dünya standartlarında çözümler sunuyoruz. 
          İstanbul başta olmak üzere tüm Türkiye genelinde, <strong>sigortalı taşıma</strong>, profesyonel paketleme ve uzman kadromuz ile taşınma sürecinizi bir stres kaynağı olmaktan çıkarıp, keyifli bir başlangıca dönüştürüyoruz.
        </p>
        <p class="text-white/80 leading-loose mb-6">
          Nakliye sektörü, dışarıdan bakıldığında sadece "eşya taşıma" gibi görünse de, aslında ciddi bir mühendislik, planlama ve lojistik koordinasyon gerektirir. 
          Özellikle <strong>${title}</strong> gibi hassas operasyonlarda, kullanılacak ambalaj malzemesinin kalitesinden, araca istifleme düzenine, mobilya montajından yol güzergahı seçimine kadar her detay hayati önem taşır.
          Biz, "Her Eşya Bir Anıdır" felsefesiyle yola çıkıyor, evinizi veya iş yerinizi kendi evimiz gibi benimsiyoruz.
        </p>
      </div>

      <!-- Why Us Section (SEO Rich) -->
      <div class="bg-[#200408] border border-[#D4AF37]/20 p-8 rounded-3xl">
        <h2 class="text-3xl font-serif text-white mb-8 border-b border-[#D4AF37]/30 pb-4">Neden Sandıkçıoğlu ${title}?</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div>
             <h3 class="text-[#D4AF37] font-bold text-lg mb-3"><i class="fas fa-shield-alt mr-2"></i> %100 Sigortalı Güvence</h3>
             <p class="text-white/70 text-sm leading-relaxed mb-6">
               Tüm operasyonlarımızda Axa Sigorta güvencesiyle "All Risk" poliçesi uyguluyoruz. Eşyalarınız araç hareket halindeyken, yükleme veya boşaltma sırasında oluşabilecek her türlü riske karşı 250.000 TL teminat altındadır.
             </p>
             <h3 class="text-[#D4AF37] font-bold text-lg mb-3"><i class="fas fa-box-open mr-2"></i> Profesyonel Paketleme</h3>
             <p class="text-white/70 text-sm leading-relaxed">
               Sıradan battaniyeler değil, hijyenik patpat naylonlar, kraft kağıtlar ve özel askılı koliler kullanıyoruz. Mobilyalarınız demonte edilip her parçası ayrı ayrı sarılır.
             </p>
          </div>
          <div>
             <h3 class="text-[#D4AF37] font-bold text-lg mb-3"><i class="fas fa-users mr-2"></i> Bordrolu Uzman Kadro</h3>
             <p class="text-white/70 text-sm leading-relaxed mb-6">
               Firmamız bünyesinde çalışan tüm personelimiz kadrolu, SGK'lı ve alanında eğitimli ustalardır. Gündelikçi işçi çalıştırmıyoruz. Her ekipte mutlaka bir marangoz, bir tesisatçı ve bir ekip şefi bulunur.
             </p>
             <h3 class="text-[#D4AF37] font-bold text-lg mb-3"><i class="fas fa-truck-moving mr-2"></i> Geniş Araç Filosu</h3>
             <p class="text-white/70 text-sm leading-relaxed">
               Farklı boyutlarda (1+1, 2+1, 3+1 ve Villa için özel) 20'den fazla son model kapalı kasa aracımız ile eşya hacminize en uygun lojistik çözümü sunuyoruz.
             </p>
          </div>
        </div>
      </div>

      <!-- Detailed Process Description -->
      <div class="process-deep-dive">
        <h2 class="text-3xl font-serif text-white mb-6">Adım Adım ${title} Süreci</h2>
        <p class="text-white/80 mb-8">
          Başarılı bir nakliye operasyonu, iyi bir planlama ile başlar. İşte Sandıkçıoğlu kalitesiyle ${title} hizmetinin aşamaları:
        </p>
        
        <div class="space-y-8">
           <div class="flex gap-6">
              <div class="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#2b050a] font-black text-xl shrink-0">1</div>
              <div>
                 <h4 class="text-xl text-white font-bold mb-2">Ücretsiz Ekspertiz ve Planlama</h4>
                 <p class="text-white/60 leading-relaxed">
                    Taşınma öncesi ekspertiz ekibimiz eşyalarınızı yerinde inceler. Eşya yoğunluğu, kat durumu, asansör ihtiyacı ve kullanılacak ambalaj malzemesi belirlenir. Bu sayede taşınma günü sürpriz maliyetler veya aksilikler yaşanmaz.
                 </p>
              </div>
           </div>
           <div class="flex gap-6">
              <div class="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#2b050a] font-black text-xl shrink-0">2</div>
              <div>
                 <h4 class="text-xl text-white font-bold mb-2">De-Montaj ve Paketleme</h4>
                 <p class="text-white/60 leading-relaxed">
                    Yatak odası dolapları, üniteler ve masalar marangozumuz tarafından sökülür. Her parça numaralandırılır. Kırılacak cam eşyalar, beyaz kağıtlarla sarılıp silindir kolilere (fıçı) yerleştirilir. Beyaz eşyalar tesisat bağlantılarından sökülür ve özel koruyucularla kaplanır.
                 </p>
              </div>
           </div>
           <div class="flex gap-6">
              <div class="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#2b050a] font-black text-xl shrink-0">3</div>
              <div>
                 <h4 class="text-xl text-white font-bold mb-2">Güvenli Yükleme ve Transfer</h4>
                 <p class="text-white/60 leading-relaxed">
                    ${isElevator ? 'Modüler asansör sistemimiz ile eşyalar bina merdivenlerine değmeden, balkondan direkt araca yüklenir.' : 'Eşyalarınız bina koridorlarına zarar vermeden, sırtta taşıma teknikleriyle veya bina asansörü (yönetim izinliyse) kullanılarak araca indirilir.'} 
                    Araç içinde istifleme, "tetris" mantığıyla yapılır; ağır eşyalar alta, hafif ve hassas eşyalar üste gelecek şekilde sarsıntı riskine karşı sabitlenir.
                 </p>
              </div>
           </div>
           <div class="flex gap-6">
              <div class="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#2b050a] font-black text-xl shrink-0">4</div>
              <div>
                 <h4 class="text-xl text-white font-bold mb-2">Kurulum ve Teslimat</h4>
                 <p class="text-white/60 leading-relaxed">
                    Yeni adreste eşyalarınız sizin istediğiniz odalara yerleştirilir. Sökülen tüm mobilyalar tekrar kurulur. Beyaz eşyaların bağlantıları yapılır. Gardırop içi askılı kıyafetleriniz, özel portatif dolaplarımızdan çıkarılıp yeni dolabınıza asılır. Size sadece özel eşyalarınızı yerleştirmek ve kahvenizi yudumlamak kalır.
                 </p>
              </div>
           </div>
        </div>
      </div>

      <!-- Pricing Table Section -->
      <div class="pricing-section my-16">
         <h2 class="text-3xl font-serif text-white mb-6">${currentYear} ${title} Fiyatları</h2>
         <p class="text-white/80 mb-6">
            Aşağıdaki fiyatlar ortalama piyasa değerleri ve firmamızın taban fiyat politikası baz alınarak oluşturulmuştur. Fiyatlar; kat durumu, mesafe, eşya yoğunluğu ve asansör kullanımına göre değişiklik gösterebilir. <strong>Net fiyat için lütfen WhatsApp üzerinden video gönderin veya ücretsiz ekspertiz talep edin.</strong>
         </p>
         <div class="overflow-x-auto rounded-2xl border border-[#D4AF37]/30 shadow-2xl">
            <table class="w-full text-left border-collapse bg-[#200408]">
               <thead>
                  <tr class="bg-[#D4AF37] text-[#2b050a]">
                     <th class="p-5 font-black uppercase text-sm">Hizmet Kapsamı</th>
                     <th class="p-5 font-black uppercase text-sm">Şehir İçi (İstanbul)</th>
                     <th class="p-5 font-black uppercase text-sm">Şehirler Arası (Ortalama)</th>
                  </tr>
               </thead>
               <tbody class="text-white/80 text-sm">
                  <tr class="border-b border-white/10 hover:bg-white/5 transition-colors">
                     <td class="p-5 font-bold">1+1 Daire Taşıma (Standart)</td>
                     <td class="p-5">12.000 ₺ - 16.000 ₺</td>
                     <td class="p-5">25.000 ₺ + km</td>
                  </tr>
                  <tr class="border-b border-white/10 hover:bg-white/5 transition-colors">
                     <td class="p-5 font-bold">2+1 Daire Taşıma (Standart)</td>
                     <td class="p-5">18.000 ₺ - 24.000 ₺</td>
                     <td class="p-5">35.000 ₺ + km</td>
                  </tr>
                  <tr class="border-b border-white/10 hover:bg-white/5 transition-colors">
                     <td class="p-5 font-bold">3+1 Daire Taşıma (Standart)</td>
                     <td class="p-5">24.000 ₺ - 32.000 ₺</td>
                     <td class="p-5">45.000 ₺ + km</td>
                  </tr>
                  ${isOffice ? `
                  <tr class="border-b border-white/10 hover:bg-white/5 transition-colors">
                     <td class="p-5 font-bold">Küçük Ofis (10 Kişilik)</td>
                     <td class="p-5">20.000 ₺ - 30.000 ₺</td>
                     <td class="p-5">Özel Teklif</td>
                  </tr>` : ''}
                  ${isStorage ? `
                  <tr class="border-b border-white/10 hover:bg-white/5 transition-colors">
                     <td class="p-5 font-bold">Eşya Depolama (Aylık)</td>
                     <td class="p-5">3.000 ₺ - 6.000 ₺</td>
                     <td class="p-5">-</td>
                  </tr>` : ''}
                  <tr class="hover:bg-white/5 transition-colors">
                     <td class="p-5 font-bold">Dış Cephe Asansörü (Tek Taraf)</td>
                     <td class="p-5">3.500 ₺</td>
                     <td class="p-5">Bölgeye Göre</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

      <!-- Testimonials (3 Static Items) -->
      <div class="testimonials-section">
         <h2 class="text-3xl font-serif text-white mb-8">Müşterilerimiz Ne Diyor?</h2>
         <div class="grid md:grid-cols-3 gap-6">
            <div class="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/50 transition-all">
               <div class="flex text-[#D4AF37] mb-3 text-xs">
                  <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
               </div>
               <p class="text-white/70 text-sm italic mb-4">"İnternetten bulup biraz tereddütle aramıştım ama ${title} konusunda gerçekten uzmanlar. Sabah 8'de gelip öğleden sonra 3'te her şeyi bitirdiler. Çizik dahi yok."</p>
               <div class="font-bold text-white text-xs">- Mert K. / Kadıköy</div>
            </div>
            <div class="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/50 transition-all">
               <div class="flex text-[#D4AF37] mb-3 text-xs">
                  <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
               </div>
               <p class="text-white/70 text-sm italic mb-4">"Özellikle paketleme personeli çok saygılı ve temiz çalıştı. Galoş giymeden eve girmediler. Eşyalarımı benden daha çok düşündüler diyebilirim."</p>
               <div class="font-bold text-white text-xs">- Ayşe Y. / Beşiktaş</div>
            </div>
            <div class="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-[#D4AF37]/50 transition-all">
               <div class="flex text-[#D4AF37] mb-3 text-xs">
                  <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
               </div>
               <p class="text-white/70 text-sm italic mb-4">"Fiyat performans olarak alabileceğiniz en iyi hizmet. ${isOffice ? 'Ofisimizi hafta sonu taşıdılar, pazartesi işbaşı yaptık.' : 'Yeni evime geçerken asansör kurmaları işi çok hızlandırdı.'} Teşekkürler Sandıkçıoğlu."</p>
               <div class="font-bold text-white text-xs">- Burak S. / Ataşehir</div>
            </div>
         </div>
      </div>

      <!-- Detailed FAQ Section -->
      <div class="faq-section my-16">
         <h2 class="text-3xl font-serif text-white mb-8">Sıkça Sorulan Sorular</h2>
         <div class="space-y-4">
            <details class="group bg-[#200408] rounded-xl border border-white/10 open:border-[#D4AF37] transition-all">
               <summary class="flex items-center justify-between p-6 cursor-pointer font-bold text-white group-hover:text-[#D4AF37]">
                  <span>Nakliye sigortası neleri kapsar?</span>
                  <span className="transition group-open:rotate-180"><i class="fas fa-chevron-down"></i></span>
               </summary>
               <div class="px-6 pb-6 text-white/60 text-sm leading-relaxed">
                  Nakliye sigortası (Emtia Sigortası), eşyalarınızın araç üzerindeyken kaza, devrilme, yanma veya hırsızlık gibi durumlarda zarar görmesini kapsar. Ayrıca taşıma sırasında personelden kaynaklı büyük hasarlar da firma garantimiz altındadır.
               </div>
            </details>
            <details class="group bg-[#200408] rounded-xl border border-white/10 open:border-[#D4AF37] transition-all">
               <summary class="flex items-center justify-between p-6 cursor-pointer font-bold text-white group-hover:text-[#D4AF37]">
                  <span>Taşınma günü ne kadar sürer?</span>
                  <span className="transition group-open:rotate-180"><i class="fas fa-chevron-down"></i></span>
               </summary>
               <div class="px-6 pb-6 text-white/60 text-sm leading-relaxed">
                  Standart bir 2+1 veya 3+1 dairenin taşınması (şehir içi) genellikle 1 iş günü sürer. Sabah 08:00'de başlayan operasyon, paketleme, taşıma ve yeni evde kurulum dahil ortalama 16:00 - 18:00 saatleri arasında tamamlanır.
               </div>
            </details>
            <details class="group bg-[#200408] rounded-xl border border-white/10 open:border-[#D4AF37] transition-all">
               <summary class="flex items-center justify-between p-6 cursor-pointer font-bold text-white group-hover:text-[#D4AF37]">
                  <span>Hangi eşyaları siz, hangilerini biz paketliyoruz?</span>
                  <span className="transition group-open:rotate-180"><i class="fas fa-chevron-down"></i></span>
               </summary>
               <div class="px-6 pb-6 text-white/60 text-sm leading-relaxed">
                  "Anahtar Teslim" hizmetimizde mobilyalar, beyaz eşyalar, koltuklar, yataklar ve tüm kaba eşyalar tarafımızca paketlenir. Mutfak kırılacakları, kıyafetler ve ufak tefek eşyalar için "Toplamalı Hizmet" talep ederseniz, A'dan Z'ye her şeyi biz paketleriz. Standart hizmette ise ufak eşyaların kolilenmesi müşteriye aittir.
               </div>
            </details>
            <details class="group bg-[#200408] rounded-xl border border-white/10 open:border-[#D4AF37] transition-all">
               <summary class="flex items-center justify-between p-6 cursor-pointer font-bold text-white group-hover:text-[#D4AF37]">
                  <span>Ödemeyi ne zaman ve nasıl yapıyorum?</span>
                  <span className="transition group-open:rotate-180"><i class="fas fa-chevron-down"></i></span>
               </summary>
               <div class="px-6 pb-6 text-white/60 text-sm leading-relaxed">
                  Ödeme işlemi, taşınma bittikten ve siz eşyalarınızı kontrol edip onayladıktan sonra yapılır. Nakit, Havale/EFT veya Kredi Kartı ile ödeme seçeneklerimiz mevcuttur.
               </div>
            </details>
            <details class="group bg-[#200408] rounded-xl border border-white/10 open:border-[#D4AF37] transition-all">
               <summary class="flex items-center justify-between p-6 cursor-pointer font-bold text-white group-hover:text-[#D4AF37]">
                  <span>Yağmurlu havada taşınma olur mu?</span>
                  <span className="transition group-open:rotate-180"><i class="fas fa-chevron-down"></i></span>
               </summary>
               <div class="px-6 pb-6 text-white/60 text-sm leading-relaxed">
                  Evet, kapalı kasa araçlarımız su geçirmezdir. Ayrıca ambalaj malzemelerimiz (patpat naylon ve streç) eşyalarınızı yağmurdan korur. Çok aşırı fırtına olmadığı sürece yağmur taşınmaya engel değildir.
               </div>
            </details>
         </div>
      </div>

      <!-- Service Areas Link Cloud -->
      <div class="service-areas bg-white/5 p-8 rounded-3xl border border-white/5">
        <h3 class="text-xl font-serif text-white mb-6">Hizmet Verdiğimiz Popüler Bölgeler</h3>
        <div class="flex flex-wrap gap-3">
          ${districts.map(d => `<a href="#/bolge/${d.toLowerCase().replace(/ı/g,'i').replace(/ö/g,'o').replace(/ü/g,'u').replace(/ş/g,'s').replace(/ğ/g,'g').replace(/ç/g,'c')}" class="text-xs text-white/40 border border-white/10 px-3 py-2 rounded-full hover:bg-[#D4AF37] hover:text-[#2b050a] hover:border-[#D4AF37] transition-all">${d} ${title}</a>`).join('')}
        </div>
      </div>

      <!-- Final CTA -->
      <div class="text-center mt-12">
        <p class="text-white/60 mb-6 max-w-2xl mx-auto">
          Siz de ${title} hizmetimiz hakkında daha fazla bilgi almak ve size özel kampanyalı fiyatlarımızı öğrenmek için hemen bizimle iletişime geçin.
        </p>
        <a href="#/iletisim" class="inline-block bg-[#D4AF37] text-[#2b050a] px-10 py-4 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg">
           İletişime Geç
        </a>
      </div>
    </div>
  `;

  return injectLinks(baseHTML);
};

/**
 * Generates highly specific content based on the blog title.
 * This simulates a database of content by procedurally generating HTML.
 */
const generateRichBlogContent = (title: string, tag: string): string => {
  const isDistrict = districts.some(d => title.includes(d));
  const isPrice = title.includes("Fiyat") || title.includes("Ücret");
  const isStorage = title.includes("Depolama");
  const isOffice = title.includes("Ofis");

  let districtName = districts.find(d => title.includes(d)) || "İstanbul";

  let html = `
    <div class="blog-content">
      <p class="lead text-xl text-white/90 mb-8 font-light leading-relaxed">
        ${title} konusunda aradığınız tüm cevapları bu rehberde derledik. Sandıkçıoğlu Nakliyat olarak, 25 yıllık tecrübemizle sektördeki bilgi kirliliğini önlemek ve size en doğru yolu göstermek istiyoruz.
      </p>

      <div class="bg-[#200408] border border-[#D4AF37]/20 p-6 rounded-2xl mb-10">
        <h4 class="text-[#D4AF37] font-bold uppercase tracking-widest text-sm mb-4">İçindekiler</h4>
        <ul class="space-y-2 text-white/70 text-sm">
          <li><i class="fas fa-angle-right text-[#D4AF37] mr-2"></i> ${title} Nedir?</li>
          <li><i class="fas fa-angle-right text-[#D4AF37] mr-2"></i> Dikkat Edilmesi Gereken 5 Kritik Nokta</li>
          ${isPrice ? `<li><i class="fas fa-angle-right text-[#D4AF37] mr-2"></i> 2026 Güncel Maliyet Tablosu</li>` : ''}
          ${isDistrict ? `<li><i class="fas fa-angle-right text-[#D4AF37] mr-2"></i> ${districtName} Bölgesi Nakliye Zorlukları</li>` : ''}
          <li><i class="fas fa-angle-right text-[#D4AF37] mr-2"></i> Uzman Tavsiyeleri</li>
          <li><i class="fas fa-angle-right text-[#D4AF37] mr-2"></i> Sıkça Sorulan Sorular</li>
        </ul>
      </div>

      <h2 class="text-3xl font-serif text-white mb-6">${title} Sürecinde Profesyonellik</h2>
      <p class="text-white/80 mb-6 leading-loose">
        Taşınma süreci, hayatımızdaki en stresli olaylardan biri olarak kabul edilir. Ancak doğru planlama ve <strong>kurumsal nakliyat</strong> desteği ile bu süreci keyifli bir anıya dönüştürmek mümkündür. Özellikle ${isDistrict ? `<strong>${districtName}</strong> gibi yoğun nüfuslu ve dar sokaklı bölgelerde` : 'büyükşehirlerde'} nakliye operasyonları ciddi bir mühendislik gerektirir.
      </p>

      ${isPrice ? `
        <h2 class="text-3xl font-serif text-white mb-6">2026 Fiyat Analizi ve Maliyet Tablosu</h2>
        <p class="text-white/80 mb-6">Aşağıdaki tablo, ortalama piyasa koşulları baz alınarak hazırlanmıştır. Kesin fiyat için ücretsiz ekspertiz talep ediniz.</p>
        <div class="overflow-x-auto mb-10">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-[#D4AF37] text-[#2b050a]">
                <th class="p-4 font-black">Eşya Tipi</th>
                <th class="p-4 font-black">Mesafe</th>
                <th class="p-4 font-black">Ortalama Fiyat Aralığı</th>
              </tr>
            </thead>
            <tbody class="text-white/80">
              <tr class="border-b border-white/10 hover:bg-white/5">
                <td class="p-4">1+1 Daire</td>
                <td class="p-4">Şehir İçi (0-30km)</td>
                <td class="p-4">12.000₺ - 18.000₺</td>
              </tr>
              <tr class="border-b border-white/10 hover:bg-white/5">
                <td class="p-4">2+1 Daire</td>
                <td class="p-4">Şehir İçi (0-30km)</td>
                <td class="p-4">18.000₺ - 26.000₺</td>
              </tr>
              <tr class="border-b border-white/10 hover:bg-white/5">
                <td class="p-4">3+1 Daire</td>
                <td class="p-4">Şehir İçi (0-30km)</td>
                <td class="p-4">24.000₺ - 35.000₺</td>
              </tr>
               <tr class="border-b border-white/10 hover:bg-white/5">
                <td class="p-4">Villa / Köşk</td>
                <td class="p-4">Özel Proje</td>
                <td class="p-4">Ekspertiz Gerekli</td>
              </tr>
            </tbody>
          </table>
        </div>
      ` : ''}

      ${isDistrict ? `
        <h2 class="text-3xl font-serif text-white mb-6">${districtName} Nakliyat Operasyonlarında Önemli Detaylar</h2>
        <div class="grid md:grid-cols-2 gap-6 mb-10">
          <div class="bg-white/5 p-6 rounded-xl border-l-4 border-[#D4AF37]">
            <h4 class="font-bold text-[#D4AF37] mb-2">Trafik ve Saat Kısıtlamaları</h4>
            <p class="text-sm text-white/70">${districtName} bölgesinde belediyenin belirlediği yükleme-boşaltma saatlerine (09:00 - 16:00) uymak zorunludur. Aksi halde cezai işlem uygulanabilir.</p>
          </div>
          <div class="bg-white/5 p-6 rounded-xl border-l-4 border-[#D4AF37]">
            <h4 class="font-bold text-[#D4AF37] mb-2">Asansör Kullanımı</h4>
            <p class="text-sm text-white/70">Bölgedeki yapı stokunun %60'ı asansörsüz veya yük taşıma asansörü olmayan binalardan oluşur. Bu nedenle <strong>Modüler Dış Cephe Asansörü</strong> kullanımı neredeyse zorunludur.</p>
          </div>
        </div>
      ` : ''}

      ${isStorage ? `
        <h2 class="text-3xl font-serif text-white mb-6">Eşya Depolamada Altın Kurallar</h2>
        <p class="text-white/80 mb-6">Eşyalarınızı uzun süre saklayacaksanız, sıradan bir depodan fazlasına ihtiyacınız var. Nem, rutubet ve haşere kontrolü hayati önem taşır.</p>
        <ul class="space-y-4 mb-10">
           <li class="flex items-start gap-3"><i class="fas fa-check-circle text-[#D4AF37] mt-1"></i> <span class="text-white/80">Eşyalar mutlaka hava alabilen ancak tozu engelleyen 'Kraft Kağıt' ile sarılmalıdır.</span></li>
           <li class="flex items-start gap-3"><i class="fas fa-check-circle text-[#D4AF37] mt-1"></i> <span class="text-white/80">Depolama alanı sigortalanmalı ve poliçede 'Hırsızlık, Yangın, Sel' teminatları bulunmalıdır.</span></li>
           <li class="flex items-start gap-3"><i class="fas fa-check-circle text-[#D4AF37] mt-1"></i> <span class="text-white/80">Sandıkçıoğlu Nakliyat depoları gibi kişiye özel kilitli oda sistemi tercih edilmelidir.</span></li>
        </ul>
      ` : ''}
      
      <div class="my-12 p-8 bg-gradient-to-r from-[#D4AF37] to-[#AA8A1E] rounded-3xl text-[#2b050a] relative overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-transform">
         <div class="absolute top-0 right-0 text-[#2b050a] opacity-10 text-9xl font-black -mr-10 -mt-10"><i class="fas fa-quote-right"></i></div>
         <h3 class="text-2xl font-black mb-4 relative z-10"><i class="fas fa-star mr-2"></i> Uzman Görüşü</h3>
         <p class="font-bold text-lg relative z-10">
           "Taşınma sadece eşyaların yer değiştirmesi değil, bir yaşamın transferidir. En ucuz fiyatı değil, en güvenilir referansı arayın. 3-5 bin TL tasarruf etmek için, 500 bin TL'lik eşyanızı riske atmayın."
         </p>
         <div class="mt-4 font-serif italic text-sm relative z-10">- Sandıkçıoğlu Baş Eksperi</div>
      </div>

      <h2 class="text-3xl font-serif text-white mb-6">Sonuç ve Öneriler</h2>
      <p class="text-white/80 mb-6">
        ${title} sürecinde başarı, detaylarda gizlidir. Sandıkçıoğlu Nakliyat olarak, size sadece bir kamyon değil, komple bir taşınma planı sunuyoruz. Ücretsiz ekspertiz hizmetimizden yararlanarak, size özel taşınma planınızı bugün oluşturabilirsiniz.
      </p>

      <div class="border-t border-white/10 pt-10 mt-10">
        <h3 class="text-xl font-bold text-[#D4AF37] mb-6">Sıkça Sorulan Sorular</h3>
        <div class="space-y-4">
           <details class="bg-black/20 p-4 rounded-lg cursor-pointer">
              <summary class="font-bold text-white hover:text-[#D4AF37] transition-colors">Bu hizmet için sigorta yapıyor musunuz?</summary>
              <p class="mt-2 text-sm text-white/60">Evet, tüm taşımacılık hizmetlerimiz Axa Sigorta güvencesiyle 250.000 TL'ye kadar sigortalanmaktadır.</p>
           </details>
           <details class="bg-black/20 p-4 rounded-lg cursor-pointer">
              <summary class="font-bold text-white hover:text-[#D4AF37] transition-colors">Ne kadar önceden randevu almalıyım?</summary>
              <p class="mt-2 text-sm text-white/60">Özellikle yaz sezonu ve ay sonlarında yoğunluk yaşandığı için en az 1 hafta önceden randevu oluşturmanızı öneririz.</p>
           </details>
           <details class="bg-black/20 p-4 rounded-lg cursor-pointer">
              <summary class="font-bold text-white hover:text-[#D4AF37] transition-colors">Ambalaj malzemelerini biz mi alıyoruz?</summary>
              <p class="mt-2 text-sm text-white/60">Hayır. "Anahtar Teslim" hizmetimizde tüm koli, bant, streç, patpat ve askılı koli malzemeleri firmamız tarafından getirilmektedir.</p>
           </details>
        </div>
      </div>
    </div>
  `;

  return injectLinks(html);
};

// --- MASSIVE BLOG GENERATOR (3000 ITEMS) ---

/**
 * Generates 3000 blog post metadata items.
 * Since generating 3000 full HTML strings at once would crash the browser,
 * we only generate metadata here. The HTML content is generated on-demand
 * by `generateRichBlogContent` when the user visits a specific post.
 */
const generateBlogPostsMetadata = (): BlogPost[] => {
  const posts: BlogPost[] = [];
  let idCounter = 1;

  // 1. Generate District Permutations (approx 800 posts)
  districts.forEach(district => {
    services.forEach(service => {
      // Variation 1
      posts.push({
        id: idCounter.toString(),
        title: `${district} ${service}`,
        excerpt: `${district} bölgesinde ${service.toLowerCase()} hizmeti için en güvenilir adres. Profesyonel ekip, sigortalı taşımacılık ve uygun fiyatlar.`,
        tag: "Bölgesel Rehber",
        date: `${(idCounter % 28) + 1} Mart 2026`,
        img: `https://images.unsplash.com/photo-${1600000000000 + (idCounter * 105)}?auto=format&fit=crop&q=80`,
      });
      idCounter++;

      // Variation 2 (Price focused)
      if (idCounter % 3 === 0) {
        posts.push({
          id: idCounter.toString(),
          title: `${district} ${service} Fiyatları 2026`,
          excerpt: `2026 yılı güncel ${district} nakliye ücretleri ne kadar? Maliyeti düşürmenin yolları ve fiyat analizi tablosu bu yazıda.`,
          tag: "Fiyat Analizi",
          date: `${(idCounter % 28) + 1} Şubat 2026`,
          img: `https://images.unsplash.com/photo-${1600000000000 + (idCounter * 205)}?auto=format&fit=crop&q=80`,
        });
        idCounter++;
      }
    });
  });

  // 2. Generate Topic Based Permutations (approx 1000 posts)
  services.forEach(service => {
    topics.forEach(topic => {
      posts.push({
        id: idCounter.toString(),
        title: `${service} ${topic}`,
        excerpt: `${service} sürecinde ${topic.toLowerCase()} hakkında bilmeniz gereken her şey. Uzmanlarımızdan altın değerinde tavsiyeler.`,
        tag: "Uzman Tavsiyesi",
        date: `${(idCounter % 28) + 1} Ocak 2026`,
        img: `https://images.unsplash.com/photo-${1600000000000 + (idCounter * 30)}?auto=format&fit=crop&q=80`,
      });
      idCounter++;
    });
  });

  // 3. Generate "Best of" and "How to" filler to reach 3000
  while (idCounter <= 3000) {
    const randomDistrict = districts[Math.floor(Math.random() * districts.length)];
    const randomService = services[Math.floor(Math.random() * services.length)];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    
    posts.push({
      id: idCounter.toString(),
      title: `${randomDistrict} En ${randomAdj} ${randomService} Firması`,
      excerpt: `${randomDistrict} genelinde ${randomAdj.toLowerCase()} taşımacılık arayanlar için detaylı inceleme. Müşteri yorumları ve hizmet kalitesi.`,
      tag: "Firma İncelemesi",
      date: `${(idCounter % 28) + 1} Nisan 2026`,
      img: `https://images.unsplash.com/photo-${1600000000000 + (idCounter * 50)}?auto=format&fit=crop&q=80`,
    });
    idCounter++;
  }

  return posts;
};

// Exporting the generator function so Preview.tsx can use it
export const getBlogPostContentById = (id: string, posts: BlogPost[]): string => {
  const post = posts.find(p => p.id === id);
  if (!post) return "İçerik bulunamadı.";
  return generateRichBlogContent(post.title, post.tag);
};

// --- UPDATED SEO CONTENT GENERATOR ROUTER ---
const generateLongSEOContent = (title: string, type: string): string => {
  if (type === 'service') {
    return generateMassiveServiceContent(title);
  }
  return generateRichBlogContent(title, type);
};

// --- CENTRALIZED DATABASE ---
// (Keeping existing static data for pages other than blog)

const servicesData: Record<string, ServiceDetail> = {
  'evden-eve': {
    id: 'evden-eve',
    title: 'Evden Eve Nakliyat',
    shortDesc: 'Anahtar teslim, sigortalı, marangozlu ve profesyonel ev taşıma deneyimi.',
    fullDesc: 'Profesyonel ev taşıma hizmetleri.',
    htmlContent: generateLongSEOContent('Evden Eve Nakliyat', 'service'),
    heroImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
    icon: 'fa-house-chimney',
    process: [
      { title: 'Ücretsiz Ekspertiz', desc: 'Eşyalarınızı yerinde görüp, en doğru fiyatı ve planı çıkarıyoruz.' },
      { title: 'Profesyonel Paketleme', desc: 'İtalyan kraft kağıtlar ve balonlu naylonlarla 3 katmanlı koruma.' },
      { title: 'Dikkatli Taşıma', desc: 'Bina içi koruyucu ekipmanlarla hasarsız transfer.' },
      { title: 'Montaj ve Dizayn', desc: 'Mobilyalarınızın kurulumu ve odalara yerleşimi.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503594384566-461fe158e797?auto=format&fit=crop&q=80'
    ]
  },
  'ofis-tasima': {
    id: 'ofis-tasima',
    title: 'Ofis ve Büro Taşıma',
    shortDesc: 'İş akışınız aksamadan, dosya ve arşiv düzenine uygun kurumsal taşıma çözümleri.',
    fullDesc: 'Kurumsal ofis taşıma çözümleri.',
    htmlContent: generateLongSEOContent('Ofis ve Büro Taşıma', 'service'),
    heroImg: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
    icon: 'fa-briefcase',
    process: [
      { title: 'Departman Analizi', desc: 'Her odanın ve masanın etiketlenerek planlanması.' },
      { title: 'Arşiv Paketleme', desc: 'Klasörlerin sırası bozulmadan özel kutulara yerleşimi.' },
      { title: 'IT Transfer', desc: 'Bilgisayar ve serverların antistatik ambalajla taşınması.' },
      { title: 'Gece Operasyonu', desc: 'İş kaybını önlemek için mesai saatleri dışında taşıma.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80'
    ]
  },
  'villa-tasima': {
    id: 'villa-tasima',
    title: 'Villa Taşıma',
    shortDesc: 'VIP Villa, Yalı ve Köşk taşımacılığı için özel "White Glove" hizmeti.',
    fullDesc: 'Özel mülkler için VIP hizmet.',
    htmlContent: generateLongSEOContent('VIP Villa Taşıma', 'service'),
    heroImg: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80',
    icon: 'fa-gem',
    process: [
      { title: 'Geniş Kadro', desc: 'En az 10 kişilik uzman personel ve 2 araçlık ekip.' },
      { title: 'Sanat Eseri Koruması', desc: 'Tablo, antika ve heykeller için ahşap kafes yapımı.' },
      { title: 'Bahçe ve Peyzaj', desc: 'Dış mekan mobilyaları ve bitkilerin özenle taşınması.' },
      { title: 'Temizlik Hizmeti', desc: 'Taşınma sonrası profesyonel temizlik ekibi.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600596542815-2a4d9f6facb8?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80'
    ]
  },
  'asansorlu-nakliyat': {
    id: 'asansorlu-nakliyat',
    title: 'Asansörlü Nakliyat',
    shortDesc: '25. kata kadar ulaşan modüler dış cephe asansör sistemi ile hızlı çözüm.',
    fullDesc: '25. kata kadar ulaşan teknoloji.',
    htmlContent: generateLongSEOContent('Asansörlü Nakliyat', 'service'),
    heroImg: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80',
    icon: 'fa-elevator',
    process: [
      { title: 'Cephe Analizi', desc: 'Binanın asansör kurulumuna uygun cephesinin belirlenmesi.' },
      { title: 'Güvenli Kurulum', desc: 'Alman Bocker marka asansörün rüzgar hesabı yapılarak kurulumu.' },
      { title: 'Hızlı Transfer', desc: 'Balkondan araca direkt yükleme ile %50 zaman tasarrufu.' },
      { title: 'Sıfır Hasar', desc: 'Merdiven boşluğunda eşya çarpma riskinin tamamen ortadan kalkması.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80'
    ]
  },
  'esya-depolama': {
    id: 'esya-depolama',
    title: 'Eşya Depolama',
    shortDesc: 'Kilitli, rutubetsiz, sigortalı ve 7/24 kameralı kişiye özel oda depolar.',
    fullDesc: 'Fazla eşyalarınız için güvenli liman.',
    htmlContent: generateLongSEOContent('Eşya Depolama', 'service'),
    heroImg: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80',
    icon: 'fa-warehouse',
    process: [
      { title: 'Hijyenik Paketleme', desc: 'Eşyaların uzun süre beklemeye uygun hava almayan ambalajla sarılması.' },
      { title: 'Depoya Nakliye', desc: 'Eşyaların depolama tesisimize güvenle getirilmesi.' },
      { title: 'Oda Kiralama', desc: 'Size özel anahtarlı, +4m² den 50m² ye kadar oda seçenekleri.' },
      { title: '7/24 Güvenlik', desc: 'Kameralı takip, haşere ilaçlaması ve rutubet kontrolü.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1605634352136-1c88825853b0?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565514020176-db93d3c7373f?auto=format&fit=crop&q=80'
    ]
  },
  'piyano-kasa': {
    id: 'piyano-kasa',
    title: 'Piyano & Kasa Taşıma',
    shortDesc: 'Ağır ve hassas yükler için özel ekipman, askı sistemleri ve kızaklı taşıma.',
    fullDesc: 'Piyano ve kasa nakliyesi.',
    htmlContent: generateLongSEOContent('Piyano ve Kasa Taşıma', 'service'),
    heroImg: 'https://images.unsplash.com/photo-1520523839774-61e3746892ec?auto=format&fit=crop&q=80',
    icon: 'fa-music',
    process: [
      { title: 'Fiziksel Analiz', desc: 'Ağırlık merkezi ve geçiş güzergahının hesaplanması.' },
      { title: 'Özel Ekipman', desc: 'Piyano kızağı, askı kayışları ve hidrolik transpalet kullanımı.' },
      { title: 'Akort Koruması', desc: 'Piyanoların mekanizmasına zarar vermeyecek hassas taşıma.' },
      { title: 'Kasa Transferi', desc: 'Çelik para kasalarının robotik cihazlarla merdivenlerden indirilmesi.' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1520523839774-61e3746892ec?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514119412050-52003184a561?auto=format&fit=crop&q=80'
    ]
  }
};

const districtList: District[] = [
  // Europe
  { id: 'arnavutkoy', name: 'Arnavutköy', side: 'Europe' },
  { id: 'avcilar', name: 'Avcılar', side: 'Europe' },
  { id: 'bagcilar', name: 'Bağcılar', side: 'Europe' },
  { id: 'bahcelievler', name: 'Bahçelievler', side: 'Europe' },
  { id: 'bakirkoy', name: 'Bakırköy', side: 'Europe' },
  { id: 'basaksehir', name: 'Başakşehir', side: 'Europe' },
  { id: 'bayrampasa', name: 'Bayrampaşa', side: 'Europe' },
  { id: 'besiktas', name: 'Beşiktaş', side: 'Europe' },
  { id: 'beylikduzu', name: 'Beylikdüzü', side: 'Europe' },
  { id: 'beyoglu', name: 'Beyoğlu', side: 'Europe' },
  { id: 'buyukcekmece', name: 'Büyükçekmece', side: 'Europe' },
  { id: 'catalca', name: 'Çatalca', side: 'Europe' },
  { id: 'esenler', name: 'Esenler', side: 'Europe' },
  { id: 'esenyurt', name: 'Esenyurt', side: 'Europe' },
  { id: 'eyupsultan', name: 'Eyüpsultan', side: 'Europe' },
  { id: 'fatih', name: 'Fatih', side: 'Europe' },
  { id: 'gaziosmanpasa', name: 'Gaziosmanpaşa', side: 'Europe' },
  { id: 'gungoren', name: 'Güngören', side: 'Europe' },
  { id: 'kagithane', name: 'Kağıthane', side: 'Europe' },
  { id: 'kucukcekmece', name: 'Küçükçekmece', side: 'Europe' },
  { id: 'sariyer', name: 'Sarıyer', side: 'Europe' },
  { id: 'silivri', name: 'Silivri', side: 'Europe' },
  { id: 'sultangazi', name: 'Sultangazi', side: 'Europe' },
  { id: 'sisli', name: 'Şişli', side: 'Europe' },
  { id: 'zeytinburnu', name: 'Zeytinburnu', side: 'Europe' },
  // Anatolia
  { id: 'adalar', name: 'Adalar', side: 'Anatolia' },
  { id: 'atasehir', name: 'Ataşehir', side: 'Anatolia' },
  { id: 'beykoz', name: 'Beykoz', side: 'Anatolia' },
  { id: 'cekmekoy', name: 'Çekmeköy', side: 'Anatolia' },
  { id: 'kadikoy', name: 'Kadıköy', side: 'Anatolia' },
  { id: 'kartal', name: 'Kartal', side: 'Anatolia' },
  { id: 'maltepe', name: 'Maltepe', side: 'Anatolia' },
  { id: 'pendik', name: 'Pendik', side: 'Anatolia' },
  { id: 'sancaktepe', name: 'Sancaktepe', side: 'Anatolia' },
  { id: 'sultanbeyli', name: 'Sultanbeyli', side: 'Anatolia' },
  { id: 'sile', name: 'Şile', side: 'Anatolia' },
  { id: 'tuzla', name: 'Tuzla', side: 'Anatolia' },
  { id: 'umraniye', name: 'Ümraniye', side: 'Anatolia' },
  { id: 'uskudar', name: 'Üsküdar', side: 'Anatolia' },
];

export { generateLongSEOContent };

export const LogoIcon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5 L93.3 30 V80 L50 105 L6.7 80 V30 Z" stroke="url(#goldGradient)" strokeWidth="3" fill="none" />
    <path d="M50 20 L80.3 37.5 V87.5 L50 105 L19.7 87.5 V37.5 Z" stroke="url(#goldGradient)" strokeWidth="2" strokeOpacity="0.5" fill="none" />
    <rect x="35" y="55" width="30" height="25" rx="3" fill="url(#goldGradient)" />
    <path d="M35 55 V 42 A 15 15 0 0 1 65 42 V 55" stroke="url(#goldGradient)" strokeWidth="6" strokeLinecap="round" />
    <circle cx="50" cy="65" r="2.5" fill="#2b050a" />
    <path d="M50 65 V 72" stroke="#2b050a" strokeWidth="2" strokeLinecap="round" />
    <defs>
      <linearGradient id="goldGradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#F4D03F" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#AA8A1E" />
      </linearGradient>
    </defs>
  </svg>
);

const App: React.FC = () => {
  // Generate 3000 distinct blog posts meta data
  const blogPosts = React.useMemo(() => generateBlogPostsMetadata(), []);

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#2b050a] text-white">
        <Preview 
          servicesData={servicesData}
          districtList={districtList}
          blogPosts={blogPosts}
        />
      </div>
    </HashRouter>
  );
};

export default App;
