# Ehliyet Sınav Soruları — Expo (React Native) Uygulaması

Modern, Material Design 3 ilkelerine uygun, Android ve iOS'ta çalışan; internet
bağlantısı olmadan da kullanılabilen bir ehliyet sınavı hazırlık uygulaması.

## Özellikler

- **Tam Deneme Sınavı**: Soru bankasından rastgele 50 soru, 45 dakika sayaçlı.
- **Kategoriye göre çalışma**: İlk Yardım, Trafik ve Çevre Bilgisi, Motor ve
  Araç Teknolojisi, Trafik Adabı — her biri **Alıştırma Modu**'nda (cevap
  verildiği anda doğru/yanlış rengi gösterilir + açıklama).
- **Yanlış Yapılan Sorular**: Cihazda kalıcı olarak saklanır, doğru
  cevaplandığında listeden otomatik çıkar.
- **Açık / Koyu tema**: Sistem temasını otomatik algılar, elle de
  değiştirilebilir (tercih cihazda saklanır).
- **Görsel büyütme**: Görselli sorularda görsele dokunarak tam ekran inceleme.
- **Sonuç ekranı**: Doğru/yanlış/boş sayısı, 100 üzerinden puan, 70 ve üzeri
  "BAŞARILI", yanlışların soru bazında detaylı açıklamalı analizi.
- **Tamamen çevrimdışı**: Sorular `src/data/questions.json` içinden okunur,
  hiçbir ağ isteği gerekmez.

## Proje Yapısı

```
ehliyet-sinav-app/
├── App.js                        # Giriş noktası (tema + navigasyon)
├── app.json                      # Expo yapılandırması
├── babel.config.js
├── package.json
└── src/
    ├── components/                # Yeniden kullanılabilir UI bileşenleri
    │   ├── Card.js
    │   ├── ImageViewerModal.js
    │   ├── OptionButton.js
    │   ├── PrimaryButton.js
    │   ├── ProgressBar.js
    │   └── Timer.js
    ├── data/
    │   ├── categories.js          # Kategori tanımları
    │   └── questions.json         # Soru bankası (örnek 28 soru dahildir)
    ├── navigation/
    │   └── AppNavigator.js        # Stack navigator
    ├── screens/
    │   ├── DashboardScreen.js     # Ana sayfa
    │   ├── ExamScreen.js          # Sınav / soru ekranı
    │   └── ResultScreen.js        # Sonuç ekranı
    ├── theme/
    │   ├── colors.js              # M3 renk paleti, spacing, typography
    │   └── ThemeContext.js        # Açık/koyu tema yönetimi
    └── utils/
        ├── examLogic.js           # Soru seçimi, puanlama
        └── storage.js             # AsyncStorage (yanlış sorular, geçmiş)
```

## Kurulum

```bash
# 1) Bağımlılıkları yükleyin
npm install

# 2) Geliştirme sunucusunu başlatın
npx expo start

# Ardından:
#  - Android için 'a' tuşuna basın (emülatör/Expo Go)
#  - iOS için 'i' tuşuna basın (simülatör/Expo Go, macOS gerektirir)
#  - Fiziksel cihazda Expo Go uygulamasıyla QR kodu okutun
```

Gerçek bir APK/IPA derlemesi için [EAS Build](https://docs.expo.dev/build/introduction/)
kullanılması önerilir:

```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

## Soru Bankasını Genişletme

`src/data/questions.json` dosyasına aşağıdaki formatta yeni sorular
ekleyebilirsiniz:

```json
{
  "id": "benzersiz-id",
  "categoryId": "ilk_yardim | trafik_cevre | motor_arac | trafik_adabi",
  "question": "Soru metni",
  "image": null,
  "options": ["Seçenek A", "Seçenek B", "Seçenek C", "Seçenek D"],
  "correctIndex": 0,
  "explanation": "Doğru cevabın açıklaması"
}
```

- `image` alanına görsel eklemek isterseniz bir URL (`"https://..."`) ya da
  `require('../../assets/sorular/1.png')` gibi yerel bir kaynağı
  `ImageViewerModal` bileşenine uygun şekilde bağlayabilirsiniz.
- Uygulamada şu anda **28 örnek soru** bulunmaktadır (her kategoride 6-7
  soru); gerçek kullanım için soru bankasını dilediğiniz kadar
  genişletebilirsiniz — kod, soru sayısından bağımsız çalışacak şekilde
  tasarlanmıştır.
- Büyük soru bankaları için (binlerce soru) `questions.json` yerine SQLite
  (`expo-sqlite`) kullanımına geçmek isterseniz, `src/utils/examLogic.js`
  içindeki veri erişim fonksiyonlarını (`getFullExamQuestions`,
  `getQuestionsByCategory`, `getQuestionsByIds`) SQLite sorgularıyla
  değiştirmeniz yeterlidir; ekranlar bu fonksiyonların dönüş formatına bağımlı
  olduğu için başka hiçbir yeri değiştirmenize gerek kalmaz.

## Mimari Notlar

- **Tema**: `ThemeContext`, `useAppTheme()` hook'u üzerinden tüm renk, boşluk
  (spacing) ve tipografi değerlerini merkezi olarak sağlar; yeni bir ekran
  eklerken tema tutarlılığı için bu hook kullanılmalıdır.
- **Sınav mantığı**: Puanlama, karıştırma ve soru seçimi `examLogic.js`
  içinde saf (side-effect'siz) fonksiyonlar olarak yazılmıştır, böylece
  bağımsız olarak test edilebilir.
- **Kalıcılık**: Tüm `AsyncStorage` erişimi `storage.js` üzerinden yapılır;
  ekranlar doğrudan `AsyncStorage` çağırmaz.
- **Sınav modları**: `ExamScreen`, `route.params.mode` değerine göre iki
  davranış sergiler:
  - `full` → Süreli, cevaplar sınav bitene kadar renklendirilmez, geri
    dönüp değiştirilebilir.
  - `category` / `wrong` → Alıştırma Modu: cevap verilir verilmez doğru/yanlış
    rengi ve açıklama gösterilir.

## Codemagic ile Android APK Derleme (yerel kurulum gerekmeden)

Proje kökünde hazır bir `codemagic.yaml` bulunmaktadır. Bu dosya, Codemagic
üzerinde imzasız (debug) bir Android APK'sı üretir — Android Studio veya
yerel bir Android SDK kurulumuna gerek kalmadan, tamamen bulutta.

**Adımlar:**

1. Bu proje klasörünü bir **GitHub** (veya GitLab/Bitbucket) deposuna
   yükleyin (push edin). Codemagic bir zip dosyasını değil, bir Git
   deposunu build eder.
2. [codemagic.io](https://codemagic.io) adresinde ücretsiz bir hesap açın.
3. "Add application" ile GitHub hesabınızı bağlayıp bu depoyu seçin.
4. Codemagic, kök dizindeki `codemagic.yaml` dosyasını otomatik olarak
   algılar; **"android-apk-debug"** iş akışını (workflow) seçip
   **"Start new build"** butonuna basın.
5. Derleme bitince (~5-10 dakika) **Artifacts** sekmesinden `.apk`
   dosyasını indirebilirsiniz.
6. İndirilen APK'yı bir Android cihaza (veya Android emülatörüne)
   kurup test edebilirsiniz. **Not: `.apk` dosyaları iPhone'a kurulamaz.**

**iOS için not:** iPhone'a kurulabilir bir derleme almak için Apple
Developer Program üyeliği (yıllık ücretli), sertifika ve provisioning
profile ayarları gerekir; bu, `codemagic.yaml` dosyasına ayrı bir
`ios-workflow` eklenmesini ve Codemagic panelinden imzalama bilgilerinin
girilmesini gerektirir.

## Yayına Alma Öncesi Not

`app.json` içinde şu an bir uygulama ikonu/splash görseli tanımlı değildir
(demo amaçlı en sade haliyle bırakılmıştır). Mağazaya yüklemeden önce
`assets/icon.png` (1024x1024) ve `assets/splash.png` gibi görseller ekleyip
`app.json`'da ilgili alanlara referans vermeniz gerekir.

## Gereksinimler

- Node.js 18+
- Expo CLI (`npx expo` otomatik indirir, global kurulum gerekmez)
- Android Studio (Android emülatörü için) veya Xcode (iOS simülatörü için,
  yalnızca macOS)
