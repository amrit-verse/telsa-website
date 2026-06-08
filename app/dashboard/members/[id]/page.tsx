import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Mail, Phone, MapPin, GraduationCap, Building, Tag, Calendar, FileImage } from "lucide-react";
import { format } from "date-fns";
import MembershipActionButtons from "@/components/dashboard/members/action-buttons";

export default async function MemberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const membership = await prisma.membership.findUnique({
    where: { id: resolvedParams.id },
    include: { user: true }
  });

  if (!membership) return notFound();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <Link href="/dashboard/members" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Memberships
      </Link>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-serif font-bold text-primary">{membership.user.name}</h1>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider
              ${membership.status === 'ACTIVE' ? 'bg-green-100 text-green-700 border-green-200' : ''}
              ${membership.status === 'PENDING' ? 'bg-amber-100 text-amber-700 border-amber-200' : ''}
              ${membership.status === 'REJECTED' ? 'bg-red-100 text-red-700 border-red-200' : ''}
              ${membership.status === 'EXPIRED' ? 'bg-slate-100 text-slate-700 border-slate-200' : ''}
            `}>
              {membership.status}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 border border-slate-200 text-slate-700 uppercase tracking-wider">
              {membership.type}
            </span>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Applied on {format(new Date(membership.appliedAt), 'MMMM dd, yyyy')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - User Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-sm shadow-sm p-6">
            <h2 className="text-lg font-bold text-primary border-b border-border pb-3 mb-4 font-serif">Applicant Profile</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-1"><Mail className="w-3 h-3" /> Email Address</span>
                <p className="font-medium text-foreground">{membership.user.email}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-1"><Phone className="w-3 h-3" /> Phone Number</span>
                <p className="font-medium text-foreground">{membership.user.phone}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-1"><MapPin className="w-3 h-3" /> District</span>
                <p className="font-medium text-foreground">{membership.district}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-1"><Tag className="w-3 h-3" /> Eligible Category</span>
                <p className="font-medium text-foreground">{membership.user.category}</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-sm shadow-sm p-6">
            <h2 className="text-lg font-bold text-primary border-b border-border pb-3 mb-4 font-serif">Academic Background</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
              <div className="sm:col-span-2">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-1"><Building className="w-3 h-3" /> College / University</span>
                <p className="font-medium text-foreground">{membership.user.college}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-1"><GraduationCap className="w-3 h-3" /> Course</span>
                <p className="font-medium text-foreground">{membership.user.course}</p>
              </div>
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-1"><Calendar className="w-3 h-3" /> Academic Level</span>
                <p className="font-medium text-foreground">{membership.user.academicLevel}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Documents & Actions */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-sm shadow-sm p-6">
            <h2 className="text-lg font-bold text-primary border-b border-border pb-3 mb-4 font-serif">Decision</h2>
            <MembershipActionButtons membershipId={membership.id} currentStatus={membership.status} />
          </div>

          <div className="bg-card border border-border rounded-sm shadow-sm p-6">
            <h2 className="text-lg font-bold text-primary border-b border-border pb-3 mb-4 font-serif">Documents</h2>
            
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-2"><FileImage className="w-3 h-3" /> Payment Proof</span>
                <div className="relative aspect-[3/4] bg-slate-100 dark:bg-slate-900 rounded-sm overflow-hidden border border-border">
                  <a href={membership.paymentProofUrl} target="_blank" rel="noreferrer" className="absolute inset-0 flex flex-col items-center justify-center text-primary hover:bg-primary/5 transition-colors p-4 text-center">
                    <FileImage className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-sm font-medium">Click to view full image</span>
                  </a>
                </div>
              </div>

              {membership.studentIdUrl && (
                <div>
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2 mb-2"><FileImage className="w-3 h-3" /> Student ID Card</span>
                  <div className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-900 rounded-sm overflow-hidden border border-border">
                    <a href={membership.studentIdUrl} target="_blank" rel="noreferrer" className="absolute inset-0 flex flex-col items-center justify-center text-primary hover:bg-primary/5 transition-colors p-4 text-center">
                      <FileImage className="w-8 h-8 mb-2 opacity-50" />
                      <span className="text-sm font-medium">Click to view full image</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
