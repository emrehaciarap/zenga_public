# Zenga Film Prodüksiyon - Web Sitesi

Zenga Film Prodüksiyon için minimalist siyah-beyaz estetikle tasarlanmış profesyonel web sitesi.

## 🎬 Proje Özellikleri

- **Minimalist Tasarım:** Siyah-beyaz renk paleti (#000000, #FFFFFF, #1a1a1a, #e5e5e5)
- **Responsive:** Mobil, tablet ve masaüstü uyumlu
- **Modern Stack:** React 19 + Express 4 + tRPC 11 + Drizzle ORM
- **Veritabanı:** MySQL/TiDB entegrasyonu
- **Animasyonlar:** Framer Motion ile smooth geçişler
- **UI Bileşenleri:** shadcn/ui components

## 📄 Sayfalar

### Public Sayfalar
- **Ana Sayfa** - Hero section, öne çıkan projeler, istatistikler, CTA
- **Projelerimiz** - Filtreleme (Film/Reklam/Belgesel/Müzik Video), grid layout, detay modal
- **Pek Yakında** - Teaser kartları, countdown timer, email signup
- **Organizasyon Şeması** - İnteraktif org chart, pozisyon bilgileri
- **Ekibimiz** - Grid layout, departman filtreleme, sosyal medya linkleri
- **Hakkımızda** - Vizyon & Misyon, değerler, başarılar, referanslar
- **İletişim** - İletişim formu, bilgiler, grayscale Google Maps

## 🛠️ Teknoloji Stack

| Kategori | Teknoloji |
|----------|-----------|
| Frontend | React 19, Vite 7, Tailwind CSS 4 |
| Backend | Express 4, tRPC 11 |
| Veritabanı | Drizzle ORM, MySQL/TiDB |
| UI | shadcn/ui, Radix UI |
| Animasyonlar | Framer Motion |
| Stil | Tailwind CSS, PostCSS |
| Validation | Zod |
| Testing | Vitest |

## 🚀 Başlangıç

### Gereksinimler
- Node.js 18+
- pnpm 10+
- MySQL/TiDB veritabanı

### Kurulum

```bash
# Bağımlılıkları yükle
pnpm install

# Veritabanı migrasyonlarını çalıştır
pnpm db:push

# Geliştirme sunucusunu başlat
pnpm dev
```

Tarayıcıda `http://localhost:5173` adresini açın.

## 📦 Komutlar

```bash
# Geliştirme sunucusunu başlat
pnpm dev

# Üretim için build et
pnpm build

# Üretim sunucusunu çalıştır
pnpm start

# Testleri çalıştır
pnpm test

# Veritabanı migrasyonlarını çalıştır
pnpm db:push

# Kodu formatla
pnpm format

# TypeScript kontrol et
pnpm check
```

## 📁 Proje Yapısı

```
zenga-public/
├── client/                    # Frontend (React)
│   ├── src/
│   │   ├── pages/            # Tüm sayfalar
│   │   ├── components/       # Reusable components
│   │   ├── contexts/         # React contexts
│   │   ├── hooks/            # Custom hooks
│   │   ├── lib/              # Utilities
│   │   ├── App.tsx           # Main app
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   ├── public/               # Static assets
│   ├── index.html
│   └── vite.config.ts
├── server/                    # Backend (Express + tRPC)
│   ├── routers.ts            # tRPC routes
│   ├── db.ts                 # Database functions
│   ├── _core/                # Framework core
│   └── *.test.ts             # Tests
├── drizzle/                   # Database schema
│   ├── schema.ts             # Table definitions
│   └── migrations/           # Database migrations
├── shared/                    # Shared code
├── package.json
└── tsconfig.json
```

## 🗄️ Veritabanı Şeması

### Temel Tablolar

| Tablo | Açıklama |
|-------|----------|
| users | Kullanıcılar |
| projects | Projeler (Film, Reklam, Belgesel, Müzik Video) |
| coming_soon_projects | Pek yakında projeleri |
| team_members | Ekip üyeleri |
| org_positions | Organizasyon pozisyonları |
| about_content | Hakkımızda içeriği |
| company_values | Şirket değerleri |
| achievements | Başarılar ve ödüller |
| partners | Referans şirketleri |
| contact_info | İletişim bilgileri |
| contact_messages | İletişim mesajları |
| site_settings | Site ayarları |

## 🔌 API Endpoints (tRPC)

### Projects
- `projects.list` - Tüm projeleri listele
- `projects.featured` - Öne çıkan projeleri getir
- `projects.bySlug` - Slug'a göre getir
- `projects.byCategory` - Kategoriye göre filtrele

### Team
- `team.list` - Ekip üyelerini listele

### Organization
- `org.list` - Organizasyon şemasını getir

### About
- `about.content` - Hakkımızda içeriğini getir
- `about.values` - Değerleri listele
- `about.achievements` - Başarıları listele
- `about.partners` - Referansları listele

### Contact
- `contact.info` - İletişim bilgilerini getir
- `contact.sendMessage` - Mesaj gönder

### Coming Soon
- `comingSoon.list` - Pek yakında projeleri listele
- `comingSoon.subscribeEmail` - Email subscribe

## 🎨 Tasarım

### Renk Paleti
- **Siyah:** #000000
- **Beyaz:** #FFFFFF
- **Koyu Gri:** #1a1a1a
- **Açık Gri:** #e5e5e5

### Font
- **Primary:** Inter (Google Fonts)

### Responsive Breakpoints
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

## 🧪 Testing

```bash
# Tüm testleri çalıştır
pnpm test

# Watch mode'de testleri çalıştır
pnpm test --watch

# Coverage raporu oluştur
pnpm test --coverage
```

## 🔐 Ortam Değişkenleri

Proje çalışmak için aşağıdaki ortam değişkenlerine ihtiyaç duyar:

```env
DATABASE_URL=mysql://user:password@host:port/database
JWT_SECRET=your-secret-key
VITE_APP_ID=your-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
```

## 📝 Lisans

Bu proje Zenga Film Prodüksiyon tarafından oluşturulmuştur.

## 📞 İletişim

Sorularınız veya önerileriniz için iletişim sayfasını ziyaret edin.

---

**Zenga Film Prodüksiyon - Sinema Sanatında Mükemmellik**
