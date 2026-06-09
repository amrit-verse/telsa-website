import { Metadata } from "next";
import { Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "Platform Settings | Admin Dashboard",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-primary">Platform Settings</h1>
        <p className="text-muted-foreground text-sm">Configure site metadata, institutional preferences, and admin accounts.</p>
      </div>

      <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden min-h-[400px] flex items-center justify-center p-8">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-6">
            <Settings className="w-8 h-8 text-primary opacity-70" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">Settings Configuration Pending</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Global platform settings and super-administrator configurations are currently managed via the secure environment variables and backend protocols. The UI configuration panel will be introduced in the next deployment phase.
          </p>
        </div>
      </div>
    </div>
  );
}
