import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Clock, Calendar, BookOpen } from "lucide-react";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Admin Dashboard | TeLSA",
};

export default async function DashboardOverviewPage() {
  const [totalMembers, pendingMembers, activeEvents, totalPublications] = await Promise.all([
    db.user.count({ where: { role: { in: ['MEMBER', 'ADMIN', 'SUPER_ADMIN'] } } }),
    db.membership.count({ where: { status: 'PENDING' } }),
    db.event.count({ where: { status: 'PUBLISHED' } }),
    db.publication.count({ where: { status: 'PUBLISHED' } })
  ]);

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
            <div className="text-2xl font-bold text-primary">{totalMembers}</div>
            <p className="text-xs text-muted-foreground mt-1">Verified community members</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Approvals</CardTitle>
            <Clock className="w-4 h-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{pendingMembers}</div>
            <p className="text-xs text-muted-foreground mt-1">Requires administrative review</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Events</CardTitle>
            <Calendar className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{activeEvents}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently published</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Publications</CardTitle>
            <BookOpen className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalPublications}</div>
            <p className="text-xs text-muted-foreground mt-1">Total public resources</p>
          </CardContent>
        </Card>
      </div>

      {/* System Status / Empty Activity State */}
      <Card className="shadow-sm border-border">
        <CardHeader>
          <CardTitle className="text-primary font-serif">Recent System Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-12 flex flex-col items-center justify-center text-center border border-border rounded-sm bg-slate-50 dark:bg-slate-900/50">
            <Clock className="w-8 h-8 text-muted-foreground mb-4 opacity-50" />
            <h3 className="font-serif text-lg text-primary font-medium mb-1">No Recent Activity</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              The system audit log is currently clear. Future administrative actions, member registrations, and event publications will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
