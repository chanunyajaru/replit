import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function ComingSoon() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <Construction className="w-12 h-12 text-primary/50" />
      </div>
      <h1 className="text-3xl font-bold text-foreground mb-3 font-display">กำลังพัฒนาระบบ</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        ฟีเจอร์นี้อยู่ในระหว่างการพัฒนา ทีมงานกำลังเร่งดำเนินการเพื่อให้พร้อมใช้งานโดยเร็วที่สุด
      </p>
      <Button 
        onClick={() => setLocation("/")}
        variant="outline"
        className="rounded-xl px-8"
      >
        กลับสู่หน้าหลัก
      </Button>
    </div>
  );
}
