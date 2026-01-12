import { useState } from "react";
import { User, ChevronDown, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

// Zenga Organizasyon Yapısı
const zengaOrgStructure = [
  {
    id: 1,
    title: "Genel Kurul / Ortaklar",
    name: "M. Fazıl Coşkun & Selahattin Yusuf",
    department: "yonetim",
    bio: "Mahmut Fazıl Coşkun (Yönetmen & Senarist) ve Selahattin Yusuf (Yazar), Zenga Yapım'ın kurucu ortakları olarak şirketin stratejik vizyonunu belirler.",
    children: [
      {
        id: 2,
        title: "İdari Yapımcı (Executive)",
        name: "Mahmut İslam Bilir",
        department: "produksiyon",
        bio: "Finansal planlama, kurumsal ilişkiler, ekipler arası koordinasyon ve projelerin idari denetiminden sorumludur.",
        children: [
          {
            id: 3,
            title: "Kreatif & Senaryo",
            name: "Selahattin Yusuf, Bülent Yörük, Zeynep B. Keçecioğlu",
            department: "kreatif",
            bio: "Orijinal senaryo üretimi, edebi eser uyarlamaları, tretman ve diyalog geliştirme süreçlerinden sorumludur.",
            children: [],
          },
          {
            id: 4,
            title: "Yapım & Uygulama",
            name: "Emrah Göçen",
            department: "produksiyon",
            bio: "Bütçe yönetimi, saha operasyonları, teknik ekip kurma ve lojistik süreçlerin yönetiminden sorumludur.",
            children: [
              {
                id: 5,
                title: "Reji & Operasyon",
                name: "M. Fazıl Coşkun, Zeynep B. Keçecioğlu",
                department: "kreatif",
                bio: "Setin sanatsal ve teknik disiplini, oyuncu yönetimi koordinasyonu ve çekim takvimi uygulamasından sorumludur.",
                children: [
                  {
                    id: 6,
                    title: "Proje Bazlı Ekipler",
                    name: "Teknik Ekip, Oyuncular, Post-Prodüksiyon",
                    department: "teknik",
                    bio: "Her proje için özel olarak oluşturulan teknik ekip, oyuncular ve post-prodüksiyon ekipleri.",
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            id: 7,
            title: "Mali İşler",
            name: "Muhasebe, Finansal Raporlama, Sözleşme Yönetimi",
            department: "produksiyon",
            bio: "Proje bazlı maliyet muhasebesi, hakediş yönetimi, vergi planlaması ve resmi kurum raporlamalarından sorumludur.",
            children: [],
          },
        ],
      },
    ],
  },
];

// Department colors
const departmentColors: Record<string, string> = {
  yonetim: "bg-foreground text-background",
  kreatif: "bg-secondary text-foreground border border-border",
  produksiyon: "bg-muted text-foreground",
  teknik: "bg-accent text-accent-foreground",
};

// Org Node Component
function OrgNode({
  node,
  level = 0,
  onSelect,
}: {
  node: any;
  level?: number;
  onSelect: (node: any) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(level < 3);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <div
        className={cn(
          "relative cursor-pointer transition-all hover:scale-105",
          "w-48 md:w-64 p-4 text-center",
          departmentColors[node.department] || "bg-secondary text-foreground border border-border"
        )}
        onClick={() => onSelect(node)}
      >
        {/* Photo */}
        <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-background/20">
          <div className="w-full h-full flex items-center justify-center">
            <User className="w-8 h-8 opacity-50" />
          </div>
        </div>

        {/* Info */}
        <h3 className="font-semibold text-sm">{node.title}</h3>
        {node.name && (
          <p className="text-xs mt-1 opacity-70 line-clamp-2">{node.name}</p>
        )}

        {/* Expand/Collapse Button */}
        {hasChildren && (
          <button
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {/* Connector Line */}
      {hasChildren && isExpanded && (
        <div className="w-px h-8 bg-border" />
      )}

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="relative">
          {/* Horizontal Line */}
          {node.children.length > 1 && (
            <div
              className="absolute top-0 h-px bg-border"
              style={{
                left: "50%",
                width: `${(node.children.length - 1) * 100}%`,
                transform: "translateX(-50%)",
              }}
            />
          )}

          <div className="flex gap-4 md:gap-8">
            {node.children.map((child: any) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="w-px h-8 bg-border" />
                <OrgNode node={child} level={level + 1} onSelect={onSelect} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Bio Modal
function BioModal({
  position,
  isOpen,
  onClose,
}: {
  position: any;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!position) return null;

  const departmentLabels: Record<string, string> = {
    yonetim: "Yönetim",
    kreatif: "Kreatif",
    produksiyon: "Prodüksiyon",
    teknik: "Teknik",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogTitle className="sr-only">{position.name || position.title}</DialogTitle>
        
        <div className="text-center">
          {/* Photo */}
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-secondary">
            <div className="w-full h-full flex items-center justify-center">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>
          </div>

          {/* Info */}
          <h2 className="text-xl font-bold">{position.title}</h2>
          {position.name && (
            <p className="text-lg text-muted-foreground mt-1">{position.name}</p>
          )}
          {position.department && (
            <span className="inline-block mt-2 px-3 py-1 text-xs uppercase tracking-wider bg-secondary rounded-full">
              {departmentLabels[position.department] || position.department}
            </span>
          )}

          {/* Bio */}
          {position.bio && (
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed text-left">
              {position.bio}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Simple List View for Mobile
function OrgList({
  positions,
  onSelect,
}: {
  positions: any[];
  onSelect: (node: any) => void;
}) {
  const departmentLabels: Record<string, string> = {
    yonetim: "Yönetim",
    kreatif: "Kreatif",
    produksiyon: "Prodüksiyon",
    teknik: "Teknik",
  };

  // Flatten the tree structure for mobile view
  const flattenTree = (nodes: any[]): any[] => {
    const result: any[] = [];
    nodes.forEach((node) => {
      result.push(node);
      if (node.children && node.children.length > 0) {
        result.push(...flattenTree(node.children));
      }
    });
    return result;
  };

  const flatPositions = flattenTree(positions);

  return (
    <div className="space-y-4">
      {flatPositions.map((pos) => (
        <div
          key={pos.id}
          className={cn(
            "p-4 cursor-pointer transition-all hover:scale-105",
            departmentColors[pos.department] || "bg-secondary text-foreground border border-border"
          )}
          onClick={() => onSelect(pos)}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-background/20 flex-shrink-0">
              <div className="w-full h-full flex items-center justify-center">
                <User className="w-6 h-6 opacity-50" />
              </div>
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-sm">{pos.title}</h4>
              {pos.name && (
                <p className="text-xs opacity-70 mt-1">{pos.name}</p>
              )}
              <span className="text-xs uppercase tracking-wider opacity-50 mt-1 block">
                {departmentLabels[pos.department] || pos.department}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function OrgChart() {
  const [selectedPosition, setSelectedPosition] = useState<any>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20 md:pt-24">
        {/* Header */}
        <section className="py-12 md:py-20 bg-background border-b border-border">
          <div className="container">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Organizasyon Şeması
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Zenga Yapım'ın organizasyon yapısı ve ekip hiyerarşisi. Her pozisyona
              tıklayarak detaylı bilgi alabilirsiniz.
            </p>
          </div>
        </section>

        {/* Org Chart */}
        <section className="py-12 md:py-20 overflow-x-auto">
          <div className="container">
            {/* Desktop Tree View */}
            <div className="hidden md:flex justify-center min-w-max pb-8">
              <div className="flex flex-col items-center gap-0">
                {zengaOrgStructure.map((root) => (
                  <OrgNode
                    key={root.id}
                    node={root}
                    onSelect={setSelectedPosition}
                  />
                ))}
              </div>
            </div>

            {/* Mobile List View */}
            <div className="md:hidden">
              <OrgList positions={zengaOrgStructure} onSelect={setSelectedPosition} />
            </div>
          </div>
        </section>

        {/* Legend */}
        <section className="py-8 border-t border-border">
          <div className="container">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="text-muted-foreground">Departmanlar:</span>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-foreground" />
                <span>Yönetim</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-secondary border border-border" />
                <span>Kreatif</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-muted" />
                <span>Prodüksiyon</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-accent" />
                <span>Teknik</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bio Modal */}
      <BioModal
        position={selectedPosition}
        isOpen={!!selectedPosition}
        onClose={() => setSelectedPosition(null)}
      />

      <Footer />
    </div>
  );
}
