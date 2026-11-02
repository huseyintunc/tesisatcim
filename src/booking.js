export const services = [
  { id: 'kacak', icon: '◉', name: 'Su kaçağı tespiti', detail: 'Sorunun kaynağını bulun, gereksiz kırma işlemlerinin önüne geçin.', tag: 'Nokta atışı çözüm' },
  { id: 'gider', icon: '↗', name: 'Tıkalı gider açma', detail: 'Lavabo, mutfak ve banyo giderleri için profesyonel destek.', tag: 'Akışına bırakın' },
  { id: 'musluk', icon: '⌁', name: 'Musluk & batarya', detail: 'Damlatan musluklardan yeni batarya montajına, küçük işlere büyük özen.', tag: 'Her damla değerli' },
  { id: 'tesisat', icon: '⊞', name: 'Tesisat yenileme', detail: 'Evinizin su tesisatı için onarım, montaj ve yenileme çözümleri.', tag: 'Sağlam bir başlangıç' }
];

export function today() {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Istanbul' }).format(new Date());
}

export function validateBooking(data, minimumDate = today()) {
  const errors = [];
  if (!services.some(service => service.id === data.service)) errors.push('Bir hizmet seçin.');
  if (!data.name?.trim() || data.name.trim().length < 2) errors.push('Adınızı ve soyadınızı yazın.');
  if (!/^(?:\+90|90|0)?5\d{9}$/.test((data.phone || '').replace(/[\s()-]/g, ''))) errors.push('Geçerli bir Türkiye cep telefonu numarası yazın.');
  if (!['Kadıköy', 'Üsküdar', 'Ataşehir', 'Maltepe', 'Beşiktaş', 'Şişli', 'Ümraniye', 'Diğer'].includes(data.district)) errors.push('İlçenizi seçin.');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date || '') || Number.isNaN(Date.parse(data.date)) || data.date < minimumDate) errors.push('Bugün veya sonrası için bir tarih seçin.');
  if (!['09:00–12:00', '12:00–15:00', '15:00–18:00'].includes(data.time)) errors.push('Bir saat aralığı seçin.');
  if (data.consent !== 'on') errors.push('Yerel kayıt bilgisini onaylayın.');
  return errors;
}
