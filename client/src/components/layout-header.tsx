import { useAuth } from "@/hooks/use-auth";
import { 
  Bell, 
  Settings, 
  LogOut, 
  ChevronDown,
  User as UserIcon,
  Search
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-border/50 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Left side - Context/Breadcrumb placeholder */}
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="ค้นหาข้อมูล..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-transparent focus:bg-white focus:border-primary/20 rounded-lg text-sm transition-all outline-none"
          />
        </div>
      </div>

      {/* Right side - User Profile & Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-gray-100 text-gray-500">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 text-gray-500">
          <Settings className="w-5 h-5" />
        </Button>

        <div className="h-8 w-px bg-gray-200 mx-1" />

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="pl-2 pr-1 h-auto py-1.5 rounded-full hover:bg-gray-50 gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-foreground leading-none">{user?.name || "ผู้ใช้งาน"}</p>
                <p className="text-xs text-muted-foreground mt-1">Administrator</p>
              </div>
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=1E1D60&color=fff`} />
                <AvatarFallback className="bg-primary text-white">
                  <UserIcon className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl border border-gray-100 shadow-xl">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-gray-50">
              <UserIcon className="mr-2 h-4 w-4 text-gray-500" />
              <span>โปรไฟล์</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-gray-50">
              <Settings className="mr-2 h-4 w-4 text-gray-500" />
              <span>ตั้งค่า</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 rounded-lg"
              onClick={() => logout()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>ออกจากระบบ</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
