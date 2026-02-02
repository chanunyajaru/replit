import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-border/50 max-w-md w-full flex flex-col items-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="h-10 w-10 text-amber-600" />
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 mb-2 font-display">404</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">ไม่พบหน้าที่คุณต้องการ</h2>
        <p className="text-muted-foreground mb-8">
          หน้าที่คุณกำลังค้นหาอาจถูกลบ ย้าย หรือไม่มีอยู่จริงในระบบ
        </p>

        <Link href="/">
          <Button className="w-full h-11 bg-primary text-white rounded-xl hover:bg-primary/90 shadow-lg shadow-primary/20">
            กลับสู่หน้าหลัก
          </Button>
        </Link>
      </div>
    </div>
  );
}
