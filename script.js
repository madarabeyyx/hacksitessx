const output = document.getElementById("output");
const input = document.getElementById("command-input");
const sendBtn = document.getElementById("send-btn");

// İlk açılış mesajı
appendToTerminal("Komutlar için 'help' yaz...");

input.focus();

const commands = {
  hack: [
    "Bağlantı kuruluyor...",
    "IP adresi tespit edildi: 192.168.1.1",
    "Şifre kırılıyor...",
    "Giriş başarılı.",
    "Sistem kontrol altında.",
    "Dosyalar indiriliyor...",
    "Görev tamamlandı."
  ],
  scan: [
    "Tarama başlatıldı...",
    "Port 21: Açık",
    "Port 22: Açık",
    "Port 80: Kapalı",
    "Tarama tamamlandı."
  ],
  help: [
    "Mevcut komutlar:",
    "hack     - Sistemi hackle",
    "scan     - Ağ taraması yap",
    "status   - Sistem durumunu göster",
    "decrypt  - Şifre çözme aracı",
    "upload   - Dosya yükle",
    "download - Dosya indir",
    "connect  - Bağlantı kur",
    "disconnect - Bağlantıyı kes",
    "firewall - Güvenlik duvarı ayarları",
    "trace    - İz sürme",
    "clean    - Geçmişi temizle",
    "config   - Sistem yapılandırması",
    "encrypt  - Şifreleme başlat",
    "restart  - Sistemi yeniden başlat",
    "shutdown - Sistemi kapat",
    "logs     - Günlük kayıtlarını göster",
    "ping     - Ağ bağlantısını test et",
    "proxy    - Proxy ayarları",
    "update   - Yazılım güncelleme",
    "backup   - Yedekleme başlat",
    "restore  - Yedekten geri yükle",
    "kill     - İşlem sonlandır",
    "deploy   - Yazılım dağıt",
    "monitor  - Sistem izleme",
    "clear    - Ekranı temizle"
  ],
  status: [
    "CPU Kullanımı: %27",
    "RAM Kullanımı: %54",
    "Disk Alanı: %68 dolu",
    "Ağ Bağlantısı: Aktif",
    "Güvenlik Durumu: Normal"
  ],
  decrypt: [
    "Şifre çözme başlatıldı...",
    "Anahtar bulunuyor...",
    "Veri analiz ediliyor...",
    "Şifre çözüldü: 'topsecret123'"
  ],
  upload: [
    "Dosya seçildi...",
    "Yükleme başlatıldı...",
    "Yükleme %100 tamamlandı.",
    "Dosya başarıyla yüklendi."
  ],
  download: [
    "İndirilecek dosya seçildi...",
    "İndirme başlatıldı...",
    "İndirme %100 tamamlandı.",
    "Dosya indirildi."
  ],
  connect: [
    "Sunucuya bağlanılıyor...",
    "Bağlantı başarılı.",
    "Veri alışverişi başlatıldı."
  ],
  disconnect: [
    "Bağlantı kesiliyor...",
    "Bağlantı sonlandırıldı."
  ],
  firewall: [
    "Güvenlik duvarı durumu: Aktif",
    "Gelen bağlantılar denetleniyor.",
    "Güvenlik duvarı kuralı eklendi: 192.168.0.0/24 engellendi."
  ],
  trace: [
    "İz sürme başlatıldı...",
    "Hedef IP: 10.0.0.5",
    "Ağ geçitleri kontrol ediliyor...",
    "İz sürme tamamlandı."
  ],
  clean: [
    "Geçmiş temizleniyor...",
    "Önbellek boşaltıldı.",
    "Geçmiş tamamen temizlendi."
  ],
  config: [
    "Sistem yapılandırması yükleniyor...",
    "Parametreler güncelleniyor...",
    "Yapılandırma tamamlandı."
  ],
  encrypt: [
    "Şifreleme başlatıldı...",
    "Anahtar oluşturuluyor...",
    "Veri şifrelendi."
  ],
  restart: [
    "Sistem yeniden başlatılıyor...",
    "Tüm servisler durduruldu.",
    "Sistem tekrar başlatıldı."
  ],
  shutdown: [
    "Sistem kapanıyor...",
    "Tüm işlemler durduruldu.",
    "Güç kapatıldı."
  ],
  logs: [
    "Günlük kayıtları yükleniyor...",
    "[2025-05-30 12:00] Bağlantı başarılı.",
    "[2025-05-30 12:05] Şifre kırma işlemi tamamlandı.",
    "[2025-05-30 12:10] Dosya indirildi."
  ],
  ping: [
    "Hedefe ping atılıyor: 8.8.8.8",
    "Gecikme süresi: 23ms",
    "Ping başarılı."
  ],
  proxy: [
    "Proxy durumu: Aktif",
    "Trafik şifreleniyor.",
    "Proxy ayarları güncellendi."
  ],
  update: [
    "Yazılım güncellemeleri kontrol ediliyor...",
    "Yeni güncelleme bulundu: v2.1",
    "Güncelleme indiriliyor...",
    "Güncelleme tamamlandı."
  ],
  backup: [
    "Yedekleme başlatıldı...",
    "Veriler sıkıştırılıyor...",
    "Yedekleme tamamlandı."
  ],
  restore: [
    "Yedekten geri yükleme başlatıldı...",
    "Veriler kurtarılıyor...",
    "Geri yükleme tamamlandı."
  ],
  kill: [
    "İşlem ID 4532 sonlandırılıyor...",
    "İşlem durduruldu."
  ],
  deploy: [
    "Yazılım dağıtımı başlatıldı...",
    "Dosyalar sunucuya gönderiliyor...",
    "Dağıtım tamamlandı."
  ],
  monitor: [
    "Sistem izleme aktif.",
    "CPU ve RAM performansı izleniyor.",
    "Anormal durum tespiti yok."
  ],
  clear: [
    "Ekran temizleniyor..."
  ]
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = input.value.trim();
    if (command !== "") {
      appendToTerminal("> " + command);
      runCommand(command);
      input.value = "";
    }
  }
});

sendBtn.addEventListener("click", () => {
  const command = input.value.trim();
  if (command !== "") {
    appendToTerminal("> " + command);
    runCommand(command);
    input.value = "";
  }
});

function appendToTerminal(text) {
  const line = document.createElement("div");
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function runCommand(cmd) {
  if (cmd === "clear") {
    output.innerHTML = "";
    return;
  }

  if (commands[cmd]) {
    let i = 0;
    const interval = setInterval(() => {
      appendToTerminal(commands[cmd][i]);
      i++;
      if (i >= commands[cmd].length) clearInterval(interval);
    }, 500);
  } else {
    appendToTerminal("Bilinmeyen komut: " + cmd);
  }
}
