# Tesisatcım

Türkçe, mobil uyumlu tesisat hizmetleri ve demo randevu sitesi. Vite ve vanilla JavaScript ile geliştirilmiştir; harici servis, veritabanı veya gizli anahtar gerektirmez.

## Geliştirme

Node.js 24 ve npm 11 ile doğrulandı.

```sh
npm ci
npm run dev -- --port 5173
```

## Kontroller

```sh
npm test
npm run build
```

Üretim çıktısı `dist/` klasörüne yazılır. `npm run preview -- --port 4173` ile yerel kontrol yapılabilir.

## Yayına alma

Netlify için `netlify.toml`, Vercel için `vercel.json` hazırdır. Projeyi ilgili hesabınıza aktarırken kök klasör bu depo olmalıdır. Derleme komutu `npm run build`, yayın klasörü `dist`, Node.js sürümü 24 olmalıdır. Vite geliştirme veya önizleme sunucusunu üretim sunucusu olarak kullanmayın.

Manuel statik hosting için `dist/` içeriğini web köküne yükleyin. Site bir alan adının kök yolunda çalışacak şekilde derlenir. HTTPS ve alan adı ayarları barındırma sağlayıcısında yapılır. Yayın yapılandırmalarının gerçek sağlayıcı üzerinde uygulanması henüz doğrulanmadı.

## Özellikler ve sınırlar

- Hizmet seçimi, tarih/saat ve Türkiye cep telefonu doğrulaması.
- Talebi tarayıcının localStorage alanına kaydetme ve silme.
- Mobil görünüm, klavye odak göstergeleri ve azaltılmış hareket desteği.

Bu bir demo uygulamadır: talepler işletmeye iletilmez, gerçek randevu oluşturulmaz ve ödeme alınmaz. Yeniden kayıt önceki yerel talebin yerini alır. Gerçek kullanıma geçmeden önce işletme bilgileri, hizmet bölgeleri, sunucu taraflı doğrulama, randevu yönetimi, bildirim ve kişisel veri süreçleri eklenmelidir. Gerçek müşteri bilgileriyle kullanılmamalıdır.
