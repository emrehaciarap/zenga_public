import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube, Linkedin } from "lucide-react";
import { trpc } from "@/lib/trpc";

const footerLinks = [
  { href: "/projelerimiz", label: "Projelerimiz" },
  { href: "/pek-yakinda", label: "Pek Yakında" },
  { href: "/ekibimiz", label: "Ekibimiz" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

export default function Footer() {
  const { data: contactInfo } = trpc.contact.info.useQuery();

  // Zenga sabit iletişim bilgileri
  const defaultContactInfo = {
    address: "Kuzguncuk Mah. İcadiye Cad. Bina No:18 Daire:4\nÜsküdar / İSTANBUL",
    phone: "+90 551 163 35 52",
    email: "info@zengafilm.com.tr",
  };

  const displayInfo = {
    address: contactInfo?.address || defaultContactInfo.address,
    phone: contactInfo?.phone || defaultContactInfo.phone,
    email: contactInfo?.email || defaultContactInfo.email,
  };

  const socialLinks = [
    { icon: Facebook, href: contactInfo?.facebook, label: "Facebook" },
    { icon: Instagram, href: contactInfo?.instagram, label: "Instagram" },
    { icon: Twitter, href: contactInfo?.twitter, label: "Twitter" },
    { icon: Youtube, href: contactInfo?.youtube, label: "YouTube" },
    { icon: Linkedin, href: contactInfo?.linkedin, label: "LinkedIn" },
  ].filter((link) => link.href);

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl md:text-3xl font-bold tracking-tighter">
                ZENGA
              </span>
            </Link>
            <p className="mt-4 text-background/70 text-sm leading-relaxed max-w-md">
              Sinema sanatında mükemmellik arayışıyla, yaratıcı vizyonu ve teknik
              mükemmeliyeti bir araya getiriyoruz. Her projemizde hikaye anlatımının
              gücüne inanıyoruz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              Hızlı Erişim
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4">
              İletişim
            </h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li className="leading-relaxed whitespace-pre-line">
                {displayInfo.address}
              </li>
              <li>{displayInfo.phone}</li>
              <li>
                <a
                  href={`mailto:${displayInfo.email}`}
                  className="hover:text-background transition-colors"
                >
                  {displayInfo.email}
                </a>
              </li>
            </ul>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-3 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-background/70 hover:text-background transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/50">
              © {new Date().getFullYear()} Zenga Film Prodüksiyon. Tüm hakları
              saklıdır.
            </p>
            <div className="flex items-center gap-6 text-sm text-background/50">
              <Link
                href="/gizlilik-politikasi"
                className="hover:text-background transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/kullanim-sartlari"
                className="hover:text-background transition-colors"
              >
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
