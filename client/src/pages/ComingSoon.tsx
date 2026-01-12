import { Film, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Pek Yakında Projeler
const upcomingProjects = [
  {
    id: 1,
    title: "EVE DÖNEMEZSİN",
    format: "Mini Dizi (6 Bölüm)",
    platform: "TRT Tabii",
    director: "George Ovashvili",
    writer: "Mahmut Fazıl Coşkun",
    source: "Selahattin Yusuf'un aynı adlı romanından uyarlanmıştır",
    tagline: "SARP DAĞLARIN ARASINDA BİR EDEBİYAT VE UMUT SERÜVENİ",
    description: `Kristal Küre ödüllü Gürcü yönetmen George Ovashvili'nin görsel şiirselliği ile usta yönetmen ve senarist Mahmut Fazıl Coşkun'un kalemini buluşturan "Eve Dönemezsin", 1980'lerin Türkiye'sine sarsıcı bir bakış sunuyor.`,
    synopsis: `1980'li yılların ortasında, Trabzon'un sarp ve sisli bir dağ köyünde geçen hikaye; hayatın sertliğine karşı hayallerini kitaplarla korumaya çalışan Yusuf'un dünyasına odaklanıyor. İlkokul dördüncü sınıfta okuldan alınan Yusuf, 1983 yılında çıkarılan bir yasayla jandarma gözetiminde okula geri dönmek zorunda kalır.

Ancak bu dönüş, sadece yarım kalan bir eğitimi tamamlamak değildir. Yusuf için okul; çocukluk aşkı Selvi'ye yakın olma çabası, ideolojik dogmalarla örülü bir sınıfta var olma mücadelesi ve elinde bir tabure, cebinde dünya klasikleriyle katettiği sarp yollarda kendini bulma yolculuğudur. George Ovashvili'nin usta gözüyle hayat bulan bu büyüme hikayesi, çocukluğun masumiyetini ve edebiyatın kurtarıcı gücünü Karadeniz'in puslu atmosferinde yeniden keşfediyor.`,
  },
  {
    id: 2,
    title: "ÖLÜLERİ YAKMA CEMİYETİ",
    format: "Uzun Metraj Sinema Filmi",
    genre: "Kara Komedi, Suç, Film Noir",
    director: "Mahmut Fazıl Coşkun",
    tagline: "1930'LAR İSTANBUL'UNDA BAUHAUS ÇİZGİLERİ VE BİR CİNAYETİN ANATOMİSİ",
    description: `Ödüllü yönetmen Mahmut Fazıl Coşkun'un "Türkiye'nin modernleşme deneyimi" üçlemesinin merakla beklenen ikinci halkası olan "Ölüleri Yakma Cemiyeti", izleyiciyi 1930'lar İstanbul'unun absürt ve karanlık dehlizlerine davet ediyor.`,
    synopsis: `Genç ve idealist mimar Refika Kartal, Almanya'daki eğitiminin ardından Cumhuriyet'in onuncu yılında ülkeye döner ve en büyük hayalini gerçekleştirir: Bauhaus tarzında inşa edilmiş modern bir krematoryum. Ancak "Batılılaşma" hamlelerinin tam ortasında yükselen bu bina, toplumda karşılık bulmakta zorlanır. Gönüllü "ölü" bulunamayan bu projede Refika, mali krizlerin ve toplumsal baskıların arasında sıkışıp kalır.

Krematoryumu kurtarmak için giriştiği tehlikeli bir şantaj, Refika'yı beklenmedik bir cinayetin faili haline getirir. 1930'ların İstanbul'unda; ruh çağırma seansları, Balat Canavarı efsanesi, entelektüel kibrin çöküşü ve sürgündeki Troçki'nin gölgesinde ilerleyen film, insan hırsının beyhudeliğini kusursuz bir estetikle anlatıyor. "Anons" filmindeki deadpan mizah anlayışını bu kez dışavurumcu bir görsel dünyayla birleştiren Coşkun, sinemaseverlere eşsiz bir dönem panoraması vadediyor.`,
  },
];

// Project Card Component
function ProjectCard({ project, index }: { project: any; index: number }) {
  return (
    <div className="group">
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-secondary via-muted to-secondary">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Film Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Film className="w-24 h-24 text-muted-foreground/20" />
        </div>

        {/* Mystery Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Coming Soon Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-white text-black text-xs font-medium uppercase tracking-wider">
            <Clock className="w-3 h-3" />
            Pek Yakında
          </span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-white/80">
            {project.format || project.genre}
          </p>
        </div>
      </div>

      {/* Project Details */}
      <div className="mt-8 space-y-6">
        {/* Tagline */}
        <div className="border-l-4 border-foreground pl-4">
          <p className="text-sm font-bold uppercase tracking-wider">
            {project.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Credits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
          {project.director && (
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Yönetmen
              </span>
              <p className="mt-1 font-medium">{project.director}</p>
            </div>
          )}
          {project.writer && (
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Senaryo
              </span>
              <p className="mt-1 font-medium">{project.writer}</p>
              {project.source && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {project.source}
                </p>
              )}
            </div>
          )}
          {project.platform && (
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Platform
              </span>
              <p className="mt-1 font-medium">{project.platform}</p>
            </div>
          )}
          {project.genre && (
            <div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                Tür
              </span>
              <p className="mt-1 font-medium">{project.genre}</p>
            </div>
          )}
        </div>

        {/* Synopsis */}
        {project.synopsis && (
          <div className="pt-6 border-t border-border">
            <h4 className="text-sm font-bold uppercase tracking-wider mb-3">
              Sinopsis
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {project.synopsis}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 md:pt-24">
        {/* Header */}
        <section className="py-12 md:py-20 bg-background border-b border-border">
          <div className="container">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Pek Yakında
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Üzerinde çalıştığımız ve yakında sizlerle buluşacak projelerimiz.
              Her biri, Zenga Yapım'ın sanatsal vizyonunu yansıtan özel yapımlar.
            </p>
          </div>
        </section>

        {/* Projects */}
        <section className="py-12 md:py-20">
          <div className="container">
            <div className="space-y-20 md:space-y-32">
              {upcomingProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="animate-fade-in-up opacity-0"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32 bg-foreground text-background">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <Clock className="w-12 h-12 mx-auto mb-6 opacity-50" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Daha Fazlası Yolda
              </h2>
              <p className="mt-4 text-background/70">
                Zenga Yapım olarak, sinema ve edebiyatın gücünü birleştirerek
                nitelikli içerikler üretmeye devam ediyoruz. Yeni projelerimizden
                haberdar olmak için bizi takip edin.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
