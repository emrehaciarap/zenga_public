# Netlify Environment Variables Ayarları

## 📋 Gerekli Ortam Değişkenleri

Netlify'de sitenizi deploy ettikten sonra, aşağıdaki environment variables'ları ayarlamanız gerekir.

### 1. Netlify Dashboard'da Environment Variables Ayarlama

1. Netlify dashboard'da sitesini seçin
2. **"Site settings"** → **"Build & deploy"** → **"Environment"** bölümüne gidin
3. **"Edit variables"** butonuna tıklayın
4. Aşağıdaki değişkenleri ekleyin:

### 2. Gerekli Değişkenler

| Değişken | Açıklama | Örnek |
|----------|----------|--------|
| `DATABASE_URL` | MySQL/TiDB bağlantı dizesi | `mysql://user:pass@host:3306/db` |
| `JWT_SECRET` | Session cookie imzalama sırrı | `your-secret-key-123` |
| `VITE_APP_ID` | OAuth uygulama ID'si | `your-app-id` |
| `OAUTH_SERVER_URL` | OAuth sunucusu | `https://api.manus.im` |
| `VITE_OAUTH_PORTAL_URL` | OAuth portal URL'si | `https://portal.manus.im` |
| `OWNER_OPEN_ID` | Sahip OpenID | `owner-id-123` |
| `OWNER_NAME` | Sahip adı | `Zenga Admin` |
| `BUILT_IN_FORGE_API_URL` | Manus API URL'si | `https://api.manus.im` |
| `BUILT_IN_FORGE_API_KEY` | Manus API anahtarı | `your-api-key` |
| `VITE_FRONTEND_FORGE_API_URL` | Frontend API URL'si | `https://api.manus.im` |
| `VITE_FRONTEND_FORGE_API_KEY` | Frontend API anahtarı | `your-frontend-key` |
| `VITE_ANALYTICS_ENDPOINT` | Analytics endpoint | `https://analytics.example.com` |
| `VITE_ANALYTICS_WEBSITE_ID` | Analytics website ID | `website-id-123` |
| `VITE_APP_TITLE` | Uygulama başlığı | `Zenga Film Prodüksiyon` |
| `VITE_APP_LOGO` | Logo URL'si | `/logo.png` |

### 3. Adım Adım Ekleme

```
1. Netlify dashboard'da sitesini seçin
2. Site settings → Build & deploy → Environment
3. "Edit variables" butonuna tıklayın
4. Her değişken için:
   - Key: Değişken adı (örn: DATABASE_URL)
   - Value: Değişken değeri (örn: mysql://...)
   - "Add" butonuna tıklayın
5. "Save" butonuna tıklayın
6. Yeniden deploy edin: "Trigger deploy" → "Deploy site"
```

### 4. Veritabanı Bağlantısı

**MySQL/TiDB Bağlantı Dizesi Formatı:**
```
mysql://username:password@host:port/database_name
```

**Örnek:**
```
mysql://zenga_user:secure_password@db.example.com:3306/zenga_db
```

### 5. Kontrol Etme

Deploy tamamlandıktan sonra:

1. Netlify'de **"Deploys"** bölümüne gidin
2. En son deploy'u seçin
3. **"Deploy log"** bölümünü açın
4. Hata mesajı yoksa başarılı demektir

---

## 🔐 Güvenlik İpuçları

1. **API Anahtarlarını Gizli Tutun:** Asla public repository'ye commit etmeyin
2. **Netlify UI Kullanın:** Environment variables'ları Netlify dashboard'dan ayarlayın
3. **Düzenli Değişim:** Önemli API anahtarlarını düzenli olarak değiştirin
4. **Minimal Permissions:** API anahtarlarına sadece gerekli izinleri verin

---

## 🆘 Sorun Giderme

### Sorun: "DATABASE_URL not found" hatası

**Çözüm:**
1. Netlify dashboard'da environment variables'ı kontrol edin
2. DATABASE_URL'in eklendiğini doğrulayın
3. Yeniden deploy edin

### Sorun: "VITE_APP_ID is undefined"

**Çözüm:**
1. VITE_APP_ID'nin eklendiğini kontrol edin
2. Değişken adının doğru olduğunu doğrulayın (büyük/küçük harf duyarlı)
3. Yeniden deploy edin

---

## 📝 Netlify Deploy Komutu

Netlify'de build komutu şu şekilde ayarlanmalıdır:

```
Build command: pnpm install && pnpm build
Publish directory: dist
```

---

**Başarılar! Tüm environment variables'ları ayarladıktan sonra siteniz çalışmaya başlayacak.**
