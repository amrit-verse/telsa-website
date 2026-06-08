import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, Calendar, BookOpen, Image as ImageIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard | TeLSA",
};

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Manage members, events, and resources for TeLSA.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Members</CardTitle>
            <Users className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">128</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
            <Clock className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">14</div>
            <p className="text-xs text-muted-foreground mt-1">Requires review</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Events</CardTitle>
            <Calendar className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">3</div>
            <p className="text-xs text-muted-foreground mt-1">Upcoming this quarter</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Publications</CardTitle>
            <BookOpen className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">24</div>
            <p className="text-xs text-muted-foreground mt-1">Total published resources</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Placeholder */}
      <Card className="shadow-sm border-border">
        <CardHeader>
          <CardTitle className="text-primary font-serif">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground py-12 text-center border border-dashed rounded-sm bg-slate-50/50 dark:bg-slate-900/50">
            Activity feed database integration pending Phase 4B.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
