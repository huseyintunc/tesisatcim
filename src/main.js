import './style.css';
import { services, today, validateBooking } from './booking.js';

document.querySelector('#app').innerHTML = `
  <div class="topline">İstanbul için tesisat çözümleri <span>İyi iş, içiniz rahat.</span></div>
  <header class="container"><a class="brand" href="#" aria-label="Tesisatcım ana sayfa"><span class="brand-icon">t.</span>tesisatcım<span class="brand-dot">.</span></a><nav aria-label="Ana menü"><a href="#hizmetler">Hizmetlerimiz</a><a href="#nasil">Nasıl çalışır?</a><a href="#sorular">Merak ettikleriniz</a></nav><a class="button small" href="#randevu">Randevu oluştur <span>↗</span></a></header>
  <main>
    <section class="hero container"><div class="hero-copy"><div class="eyebrow"><span class="status-dot"></span> EVİNİZ İÇİN DOĞRU DESTEK</div><h1>Tesisat derdini<br>biz çözeriz.<br><em>Siz rahat edin.</em></h1><p>Damlayan bir musluk, tıkanan bir gider ya da görünmeyen bir kaçak. Evinizde işler yeniden yoluna girsin.</p><div class="hero-actions"><a href="#randevu" class="button">Randevunuzu planlayın <span>↗</span></a><a class="text-link" href="#hizmetler">Hizmetleri keşfet ↓</a></div><div class="hero-note"><span>✓ İhtiyacınıza uygun hizmet</span><span>✓ Kolay randevu planlama</span></div></div>
    <div class="hero-art" role="img" aria-label="Su boruları ve damla illüstrasyonu"><div class="art-grid"></div><div class="art-label">KÜÇÜK BİR DOKUNUŞ.<br>BÜYÜK BİR RAHATLIK.</div><svg viewBox="0 0 440 440" aria-hidden="true"><defs><linearGradient id="pipe" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#cbd8c5"/><stop offset=".5" stop-color="#f2f2d9"/><stop offset="1" stop-color="#95b3a1"/></linearGradient></defs><circle cx="235" cy="223" r="155" fill="#25574d"/><path d="M62 365V250 Q62 218 94 218H251 Q283 218 283 186V90" stroke="#092f28" stroke-width="60" fill="none" transform="translate(8 10)"/><path d="M62 365V250 Q62 218 94 218H251 Q283 218 283 186V90" stroke="url(#pipe)" stroke-width="52" fill="none"/><g fill="#a6bfab" stroke="#dce4cc" stroke-width="3"><rect x="29" y="300" width="66" height="21" rx="4"/><rect x="143" y="186" width="22" height="65" rx="4"/><rect x="250" y="90" width="66" height="22" rx="4"/></g><path d="M283 134V160" stroke="#174b40" stroke-width="7"/><path d="M283 285 Q241 337 283 350 Q325 337 283 285" fill="#e0ed91"/><path d="M270 330q-6-9 3-21" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/><circle cx="350" cy="170" r="6" fill="#e0ed91"/><path d="M145 105v22m-11-11h22" stroke="#e0ed91" stroke-width="3"/></svg><div class="art-card"><span class="check">✓</span><div><strong>Her detayda özen.</strong><small>Çözüm odaklı tesisat hizmetleri</small></div></div><span class="art-footer">TESİSATCIM / EVİNİZE İYİ BAKAR</span></div></section>
    <div class="promise container"><p>Bir sorun varsa,<br><strong>bir çözümü de var.</strong></p><span>01 <b>İhtiyacınızı anlatın</b></span><span>02 <b>Zamanınızı seçin</b></span><span>03 <b>Talebinizi hazırlayın</b></span></div>
    <section class="section container" id="hizmetler"><div class="section-heading"><div><div class="eyebrow">HİZMETLERİMİZ</div><h2>Evinizin akışını koruyoruz.</h2></div><p>Küçük onarımlardan kapsamlı çözümlere,<br>ihtiyacınız olan hizmeti seçin.</p></div><div class="service-grid">${services.map((s, i) => `<article class="service-card"><div class="service-top"><span class="service-icon">${s.icon}</span><span>0${i + 1}</span></div><small>${s.tag}</small><h3>${s.name}</h3><p>${s.detail}</p><button class="service-select" data-service="${s.id}">${s.name} için randevu <span>↗</span></button></article>`).join('')}</div></section>
    <section class="process" id="nasil"><div class="container"><div class="eyebrow">NASIL ÇALIŞIR?</div><h2>Üç adımda içiniz rahat.</h2><div class="steps"><article><span>01</span><h3>Hizmeti seçin</h3><p>Sorununuza uygun hizmeti bulun, ihtiyaçlarınızı kısaca paylaşın.</p></article><article><span>02</span><h3>Size uyan zamanı belirleyin</h3><p>Tercih ettiğiniz günü ve saat aralığını seçerek talebinizi hazırlayın.</p></article><article><span>03</span><h3>Bilgilerinizi kontrol edin</h3><p>Bu demo sürümünde talebiniz yalnızca tarayıcınıza kaydedilir; servis yönlendirilmez.</p></article></div></div></section>
    <section class="section container booking-layout" id="randevu"><div><div class="eyebrow">BİRLİKTE ÇÖZELİM</div><h2>Rahat bir ev için<br>ilk adımı atın.</h2><p>İhtiyacınızı anlatın, size uygun zamanı seçin.</p><div class="demo-note"><strong>Demo randevu formu</strong><p>Bilgiler bu cihazdaki tarayıcıda saklanır. Bir işletmeye gönderilmez ve gerçek randevu oluşturmaz. Denemek için örnek bilgiler kullanabilirsiniz.</p></div><div id="saved-booking" aria-live="polite"></div></div>
    <form id="booking-form"><h3>Randevu talebiniz</h3><div class="form-grid"><label class="full">Hizmet<select name="service" required><option value="">Hizmet seçin</option>${services.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}</select></label><label>Ad soyad<input name="name" autocomplete="name" minlength="2" maxlength="100" placeholder="Adınız ve soyadınız" required></label><label>Cep telefonu<input name="phone" type="tel" autocomplete="tel" maxlength="25" placeholder="05xx xxx xx xx" required></label><label class="full">İstanbul / İlçe<select name="district" required><option value="">İlçe seçin</option>${['Kadıköy', 'Üsküdar', 'Ataşehir', 'Maltepe', 'Beşiktaş', 'Şişli', 'Ümraniye', 'Diğer'].map(d => `<option>${d}</option>`).join('')}</select></label><label>Tarih<input name="date" type="date" min="${today()}" required></label><label>Saat aralığı<select name="time" required><option value="">Saat seçin</option><option>09:00–12:00</option><option>12:00–15:00</option><option>15:00–18:00</option></select></label><label class="full">Kısaca sorununuz <span>(isteğe bağlı)</span><textarea name="notes" rows="3" maxlength="1000" placeholder="Örneğin: Mutfak musluğu su damlatıyor."></textarea></label></div><label class="consent"><input type="checkbox" name="consent" required> <span>Bilgilerimin yalnızca bu tarayıcıya kaydedileceğini ve gerçek randevu oluşturulmayacağını anladım.</span></label><div id="form-message" role="status" tabindex="-1"></div><button class="button submit" type="submit">Demo talebi kaydet <span>↗</span></button></form></section>
    <section class="section container faq" id="sorular"><div><div class="eyebrow">MERAK ETTİKLERİNİZ</div><h2>Aklınızda soru kalmasın.</h2></div><div><details><summary>Bu siteden gerçek randevu alabilir miyim?</summary><p>Şu anda demo sürümündesiniz. Talep yalnızca tarayıcınıza kaydedilir. Gerçek randevu için işletme iletişimi ve sunucu bağlantısı eklenmelidir.</p></details><details><summary>Hizmet ücreti nasıl belirlenir?</summary><p>Ücret, işin kapsamı ve gereken malzemelere göre değişir. Bu demo fiyatlandırma veya ödeme işlemi yapmaz.</p></details><details><summary>Kaydettiğim bilgileri nasıl silebilirim?</summary><p>Randevu bölümündeki “Yerel talebi sil” düğmesini kullanabilir veya tarayıcınızın site verilerini temizleyebilirsiniz.</p></details></div></section>
  </main><footer><div class="container footer-inner"><a class="brand" href="#"><span class="brand-icon">t.</span>tesisatcım.</a><p>Evinize iyi bakar.</p><span>© ${new Date().getFullYear()} Tesisatcım · Demo proje</span></div></footer>`;

const form = document.querySelector('#booking-form');
const message = document.querySelector('#form-message');
const saved = document.querySelector('#saved-booking');
const key = 'tesisatcim.booking.v1';

function renderSaved() {
  saved.replaceChildren();
  try {
    const booking = JSON.parse(localStorage.getItem(key) || 'null');
    if (!booking) return;
    const p = document.createElement('p');
    p.textContent = `Yerel talebiniz: ${services.find(s => s.id === booking.service)?.name || 'Hizmet'} · ${booking.date} · ${booking.time}`;
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'text-link'; button.textContent = 'Yerel talebi sil';
    button.addEventListener('click', () => {
      try { localStorage.removeItem(key); renderSaved(); message.textContent = 'Yerel talebiniz silindi.'; }
      catch { message.textContent = 'Tarayıcı depolamasına erişilemedi. Site verilerini tarayıcı ayarlarından silebilirsiniz.'; }
    });
    saved.append(p, button);
  } catch { saved.textContent = 'Yerel kayda erişilemedi. Tarayıcı depolama ayarlarınızı kontrol edin.'; }
}
renderSaved();
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  form.elements.service.value = button.dataset.service;
  document.querySelector('#randevu').scrollIntoView({ behavior: 'smooth' });
  form.elements.service.focus({ preventScroll: true });
}));
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const errors = validateBooking(data);
  if (errors.length) { message.textContent = errors.join(' '); message.focus(); return; }
  try {
    localStorage.setItem(key, JSON.stringify({ ...data, createdAt: new Date().toISOString() }));
    message.textContent = 'Demo talebiniz bu tarayıcıya kaydedildi. Gerçek randevu oluşturulmadı.';
    form.reset(); renderSaved(); message.focus();
  } catch { message.textContent = 'Talep kaydedilemedi. Tarayıcı depolamasına izin verip tekrar deneyin.'; message.focus(); }
});
