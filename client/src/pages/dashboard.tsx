import { useState } from "react";
import { useDashboardStats } from "@/hooks/use-dashboard";
import { StatCard, StatRow } from "@/components/stat-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  Legend 
} from "recharts";
import { Droplets, Landmark, Building2, RefreshCw, AlertTriangle, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Dashboard() {
  const [year, setYear] = useState("2568");
  const { data, isLoading, error, refetch } = useDashboardStats({ year });

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center p-12">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-muted-foreground animate-pulse">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="bg-red-50 p-4 rounded-full w-fit mx-auto">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">เกิดข้อผิดพลาดในการโหลดข้อมูล</h3>
          <Button onClick={() => refetch()} variant="outline">ลองใหม่อีกครั้ง</Button>
        </div>
      </div>
    );
  }

  const { summary, charts } = data;

  // Custom Legend for Pie Chart
  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex justify-center gap-6 mt-4">
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-sm text-gray-600 font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Filters & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl shadow-sm border border-border/50">
        <div className="flex flex-col md:flex-row gap-3">
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[180px] bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="เลือกปีงบประมาณ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2568">ปีงบประมาณ 2568</SelectItem>
              <SelectItem value="2567">ปีงบประมาณ 2567</SelectItem>
              <SelectItem value="2566">ปีงบประมาณ 2566</SelectItem>
            </SelectContent>
          </Select>

          <Select disabled>
            <SelectTrigger className="w-[180px] bg-gray-50 border-transparent opacity-70">
              <SelectValue placeholder="ทุกจังหวัด" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกจังหวัด</SelectItem>
            </SelectContent>
          </Select>

          <Select disabled>
            <SelectTrigger className="w-[180px] bg-gray-50 border-transparent opacity-70">
              <SelectValue placeholder="ทุกอำเภอ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกอำเภอ</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>ปรับปรุงล่าสุด {summary.lastUpdated}</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="จำนวนบ่อบาดาลทั้งหมด" 
          total={summary.totalWells} 
          icon={<Droplets className="w-6 h-6" />}
          mainColor="text-primary"
          className="border-l-4 border-l-primary"
        >
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-primary/5 p-2 rounded-lg text-center">
              <span className="block text-xs text-muted-foreground">ภาครัฐ</span>
              <span className="font-semibold text-primary">{summary.government.total}</span>
            </div>
            <div className="bg-accent/10 p-2 rounded-lg text-center">
              <span className="block text-xs text-muted-foreground">ภาคเอกชน</span>
              <span className="font-semibold text-accent">{summary.privateSector.total}</span>
            </div>
          </div>
        </StatCard>

        <StatCard 
          title="บ่อบาดาลภาครัฐ" 
          total={summary.government.total}
          icon={<Landmark className="w-6 h-6" />}
          mainColor="text-success"
          className="border-l-4 border-l-success"
        >
          <StatRow label="เกษตรกรรม" value={summary.government.agriculture} />
          <StatRow label="อุปโภคบริโภค" value={summary.government.consumption} />
        </StatCard>

        <StatCard 
          title="บ่อบาดาลภาคเอกชน" 
          total={summary.privateSector.total}
          icon={<Building2 className="w-6 h-6" />}
          mainColor="text-accent"
          className="border-l-4 border-l-accent"
        >
          <StatRow label="เกษตรกรรม" value={summary.privateSector.agriculture} />
          <StatRow label="อุปโภคบริโภค" value={summary.privateSector.consumption} />
          <StatRow label="ธุรกิจ" value={summary.privateSector.business} />
        </StatCard>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Volume Chart */}
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-primary" />
              ปริมาณการใช้น้ำบาดาลรายเดือน (ลบ.ม.)
            </CardTitle>
            <CardDescription>เปรียบเทียบระหว่างภาครัฐและภาคเอกชน</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts.usage} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend iconType="circle" />
                <Line 
                  type="monotone" 
                  dataKey="government" 
                  name="ภาครัฐ" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="privateSector" 
                  name="ภาคเอกชน" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: "hsl(var(--accent))", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Depth Chart */}
        <Card className="shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">ความลึกของบ่อบาดาล (เมตร)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.depth} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" hide />
                <YAxis dataKey="range" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} width={50} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" name="จำนวนบ่อ" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Diameter Chart */}
        <Card className="shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">ขนาดบ่อบาดาล (นิ้ว)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts.diameter}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="size" axisLine={false} tickLine={false} dy={10} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" name="จำนวนบ่อ" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Contamination Chart */}
        <Card className="shadow-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">สถานะการปนเปื้อน</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts.contamination}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="count"
                >
                  {charts.contamination.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend content={renderCustomLegend} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
