import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@shared/routes";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Eye, EyeOff, Lock, Mail } from "lucide-react";
import logo from "/logo.png";

// Schema for login form
const loginSchema = z.object({
  email: z.string().email("กรุณากรอกอีเมลให้ถูกต้อง"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
  remember: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { login, isLoggingIn, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // If already logged in, redirect
  if (user) {
    setLocation("/");
    return null;
  }

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(
      { email: data.email, password: data.password },
      {
        onSuccess: () => setLocation("/"),
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left Panel: Branding / Illustration */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-primary to-primary/90 items-center justify-center p-12 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10" 
             style={{ 
               backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", 
               backgroundSize: "40px 40px" 
             }} 
        />
        
        <div className="relative z-10 max-w-lg text-center space-y-6">
          <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md border border-white/20 inline-block mb-4 shadow-2xl">
             <img 
               src={logo} 
               alt="Logo" 
               className="h-32 w-32 object-contain drop-shadow-xl"
               onError={(e) => {
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.parentElement!.innerHTML = '<div class="h-32 w-32 flex items-center justify-center text-6xl font-bold">DGR</div>';
               }}
             />
          </div>
          <h1 className="text-4xl font-bold font-display leading-tight">
            ระบบคลังข้อมูลน้ำบาดาล
            <br />
            <span className="text-2xl font-normal opacity-90">กรมทรัพยากรน้ำบาดาล</span>
          </h1>
          <p className="text-lg opacity-80 leading-relaxed max-w-md mx-auto">
            ศูนย์กลางข้อมูลทรัพยากรน้ำบาดาลแห่งชาติ เพื่อการบริหารจัดการน้ำอย่างยั่งยืน
          </p>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white md:bg-gray-50/50">
        <div className="w-full max-w-md space-y-8 bg-white md:p-10 md:rounded-3xl md:shadow-xl md:border md:border-gray-100 animate-in slide-in-from-right-10 duration-500">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-3xl font-bold text-primary font-display">เข้าสู่ระบบ</h2>
            <p className="text-muted-foreground">กรุณากรอกข้อมูลเพื่อเข้าใช้งานระบบ</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">อีเมล</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <Input 
                          placeholder="กรุณากรอกอีเมล" 
                          {...field} 
                          className="pl-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/30 transition-all rounded-xl"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">รหัสผ่าน</FormLabel>
                    <FormControl>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="กรุณากรอกรหัสผ่าน"
                          {...field}
                          className="pl-10 pr-10 h-12 bg-gray-50 border-gray-200 focus:bg-white focus:border-primary/30 transition-all rounded-xl"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-sm text-gray-600 cursor-pointer">
                        จดจำฉัน
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 hover:underline">
                  ลืมรหัสผ่าน?
                </a>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-white rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    กำลังเข้าสู่ระบบ...
                  </>
                ) : (
                  "เข้าสู่ระบบ"
                )}
              </Button>

            </form>
          </Form>

          <div className="text-center pt-4 border-t border-gray-100">
             <p className="text-xs text-muted-foreground">
               &copy; 2026 กรมทรัพยากรน้ำบาดาล <br/>สงวนลิขสิทธิ์
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
