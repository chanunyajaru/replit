import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  total: number;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  mainColor?: string;
}

export function StatCard({ title, total, icon, children, className, mainColor = "text-foreground" }: StatCardProps) {
  return (
    <div className={cn("bg-white rounded-2xl p-6 shadow-sm border border-border/50 hover:shadow-md transition-shadow", className)}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
          <div className={cn("text-3xl font-bold font-display", mainColor)}>
            {total.toLocaleString()}
          </div>
        </div>
        {icon && (
          <div className="p-2.5 rounded-xl bg-gray-50 text-primary">
            {icon}
          </div>
        )}
      </div>
      
      {children && (
        <div className="space-y-3 pt-3 border-t border-gray-50">
          {children}
        </div>
      )}
    </div>
  );
}

interface StatRowProps {
  label: string;
  value: number;
  colorClass?: string;
}

export function StatRow({ label, value, colorClass = "text-gray-600" }: StatRowProps) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("font-semibold", colorClass)}>{value.toLocaleString()}</span>
    </div>
  );
}
