import { Metadata } from "next";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Committee Management | Admin Dashboard",
};

export default function AdminCommitteePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-primary">Committee Management</h1>
        <p className="text-muted-foreground text-sm">Oversee executive positions, roles, and institutional hierarchy.</p>
      </div>

      <div className="bg-card border border-border rounded-sm shadow-sm overflow-hidden min-h-[400px] flex items-center justify-center p-8">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8 text-primary opacity-70" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-primary mb-3">Governance Module Pending</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The Executive Committee management interface is currently locked for review. Future updates will allow authorized administrators to officially appoint, modify, and document the terms of core and executive members within the association.
          </p>
        </div>
      </div>
    </div>
  );
}
