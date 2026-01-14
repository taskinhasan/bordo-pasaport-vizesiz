# Bordo Pasaport - Vizesiz Seyahat Rehberi 🇹🇷✈️

Türk vatandaşları (Bordo Pasaport sahipleri) için vizesiz gidilebilecek ülkeleri interaktif bir harita üzerinde gösteren, hava durumu ve uçak bileti bilgilerini sunan modern bir web uygulamasıdır.

## 🌟 Özellikler

*   **🌍 İnteraktif Dünya Haritası**: Vizesiz ülkeleri mavi, Türkiye'yi kırmızı ile gösteren yakınlaştırılabilir harita.
*   **🔍 Akıllı Arama & Filtreleme**: Ülke adına veya kıtaya göre (Avrupa, Asya vb.) anlık filtreleme.
*   **🌡️ Hava Durumu Entegrasyonu**:
    *   Gidilecek ülkenin anlık hava durumu.
    *   **Akıllı Sıralama**: "En Sıcak" veya "En Soğuk" ülkelere göre listeleme.
*   **💱 Döviz Çevirici**: Türk Lirası ile gidilecek ülkenin para birimi arasında canlı kur çevirisi.
*   **📱 Tam Duyarlı Tasarım (Responsive)**: Mobil ve masaüstü cihazlarla %100 uyumlu modern "Dashboard" görünümü.
*   **👤 Kullanıcı Sistemi & Favoriler**:
    *   Giriş Yap / Kayıt Ol simülasyonu.
    *   Beğendiğiniz ülkeleri favorilere ekleyip profilinizde saklama.

## 🛠️ Kurulum ve Çalıştırma

Bu projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları izleyin:

1.  **Gereksinimler**: Node.js yüklü olmalıdır.
2.  **Bağımlılıkları Yükle**:
    ```bash
    npm install
    ```
3.  **Geliştirme Sunucusunu Başlat**:
    ```bash
    npm run dev
    ```
    Tarayıcınızda `http://localhost:5173` adresine gidin.

## 🚀 Yayına Alma (Deployment)

Projeyi internette yayınlamak (canlıya almak) için üretim sürümünü oluşturmalısınız:

1.  **Build Alın**:
    ```bash
    npm run build
    ```
    Bu komut `dist` klasörü içinde optimize edilmiş dosyaları oluşturacaktır.

2.  **Yayınlama Seçenekleri**:
    *   **Netlify / Vercel**: `dist` klasörünü sürükleyip bırakarak veya GitHub reponuzu bağlayarak saniyeler içinde yayınlayabilirsiniz.
    *   **GitHub Pages**: Statik bir site olduğu için GitHub Pages üzerinden de sunulabilir.

## 📂 Proje Yapısı

*   `src/components`: Harita, Arama Çubuğu, Kartlar gibi bileşenler.
*   `src/data`: Ülke verileri (JSON formatında).
*   `src/services`: Hava durumu API servisi.
*   `src/App.jsx`: Ana uygulama mantığı.

## 📝 Lisans

Bu proje açık kaynaklıdır ve eğitim amaçlı geliştirilmiştir.
