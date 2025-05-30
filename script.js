const terminal = document.getElementById("terminal");
const input = document.getElementById("command-input");

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

// Sayfa açıldığında otomatik mesaj göster
appendToTerminal("Komutlar için 'help' yaz...");

function appendToTerminal(text) {
  const line = document.createElement("div");
  line.textContent = text;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

function runCommand(command) {
  if (command === "clear") {
    terminal.innerHTML = "";
    return;
  }

  const output = commands[command];
  if (output) {
    output.forEach((line, index) => {
      setTimeout(() => appendToTerminal(line), index * 300);
    });
  } else {
    appendToTerminal(`'${command}' geçersiz bir komut. help yaz.`);
  }
}

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const command = input.value.trim();
    appendToTerminal("> " + command);
    runCommand(command);
    input.value = "";
  }
});
