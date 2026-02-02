import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  PlusSquare, 
  Droplets, 
  Search, 
  Users, 
  ChevronRight 
} from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "/logo.png";

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "ภาพรวมคลังข้อมูลย่อย",
    href: "/sub-warehouse",
  },
  {
    icon: PlusSquare,
    label: "การสร้างคลังข้อมูลย่อย",
    href: "/create-warehouse",
  },
  {
    icon: Droplets,
    label: "ภาพรวมข้อมูลน้ำบาดาล",
    href: "/",
  },
  {
    icon: Search,
    label: "การสืบค้นข้อมูลน้ำบาดาล",
    href: "/search",
  },
  {
    icon: Users,
    label: "การจัดการสิทธิ์การใช้งาน",
    href: "/permissions",
  },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-border/50 shadow-xl shadow-black/5 z-40 flex flex-col transition-all duration-300">
      {/* Header / Logo */}
      <div className="h-20 flex items-center gap-3 px-6 border-b border-border/50 bg-gradient-to-r from-white to-gray-50">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <img 
            src={logo} 
            alt="DGR Logo" 
            className="w-8 h-8 object-contain"
            onError={(e) => {
              // Fallback if logo fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerText = 'D';
            }}
          />
        </div>
        <div>
          <h1 className="text-primary font-bold text-lg leading-tight">DGR</h1>
          <p className="text-xs text-muted-foreground font-medium">Department of Groundwater</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        <div className="px-2 mb-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Main Menu
        </div>
        
        {menuItems.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "group flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 cursor-pointer relative overflow-hidden",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 font-medium" 
                    : "text-foreground/70 hover:bg-gray-100 hover:text-primary"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white/20 rounded-r-full" />
                )}
                
                <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-gray-400 group-hover:text-primary")} />
                <span className="flex-1 text-sm">{item.label}</span>
                
                {isActive && <ChevronRight className="w-4 h-4 text-white/50" />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Version */}
      <div className="p-6 border-t border-border/50 text-center">
        <p className="text-xs text-muted-foreground/60">
          Version 1.0.0
          <br />
          &copy; 2026 Department of Groundwater Resources
        </p>
      </div>
    </aside>
  );
}
