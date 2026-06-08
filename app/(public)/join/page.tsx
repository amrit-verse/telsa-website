"use client";

import { useState, useTransition } from "react";
import { applyForMembership } from "@/lib/actions/membership.actions";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function JoinPage() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    
    // Client-side quick validation logic could go here
    const formData = new FormData(e.currentTarget);
    
    startTransition(async () => {
      const result = await applyForMembership(formData);
      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "Failed to submit application. Please verify your details.");
      }
    });
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-24 max-w-2xl text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-4xl font-bold text-primary mb-4">Application Submitted!</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Your membership application has been successfully securely uploaded. Our executive committee will review your documents and you will receive an update via email.
        </p>
        <button onClick={() => window.location.href = '/'} className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-sm hover:bg-primary/90">
          Return to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">Membership Application</h1>
        <div className="w-24 h-1 bg-secondary mx-auto mb-8"></div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Please fill out the details accurately. Ensure your Student ID and Payment Proof (NPR 100 for Ordinary, NPR 500 for Lifetime) are clear and legible.
        </p>
      </div>

      <div className="bg-card border border-border rounded-sm shadow-sm p-6 md:p-10">
        {error && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="font-medium text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Personal Info */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-primary mb-6 border-b pb-2">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary" htmlFor="name">Full Name *</label>
                <input required id="name" name="name" type="text" className="w-full px-4 py-2 border border-border rounded-sm bg-background text-sm focus:outline-none focus:ring-1 focus:ring-secondary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary" htmlFor="email">Email Address *</label>
                <input required id="email" name="email" type="email" className="w-full px-4 py-2 border border-border rounded-sm bg-background text-sm focus:outline-none focus:ring-1 focus:ring-secondary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary" htmlFor="phone">Phone Number *</label>
                <input required id="phone" name="phone" type="tel" className="w-full px-4 py-2 border border-border rounded-sm bg-background text-sm focus:outline-none focus:ring-1 focus:ring-secondary" />
              </div>
            </div>
          </section>

          {/* Academic Info */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-primary mb-6 border-b pb-2">Academic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary" htmlFor="college">College/University *</label>
                <input required id="college" name="college" type="text" className="w-full px-4 py-2 border border-border rounded-sm bg-background text-sm focus:outline-none focus:ring-1 focus:ring-secondary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary" htmlFor="course">Course (e.g., BALLB, LLB) *</label>
                <input required id="course" name="course" type="text" className="w-full px-4 py-2 border border-border rounded-sm bg-background text-sm focus:outline-none focus:ring-1 focus:ring-secondary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary" htmlFor="academicLevel">Academic Level/Year *</label>
                <input required id="academicLevel" name="academicLevel" type="text" placeholder="e.g. 1st Year, 2nd Semester" className="w-full px-4 py-2 border border-border rounded-sm bg-background text-sm focus:outline-none focus:ring-1 focus:ring-secondary" />
              </div>
            </div>
          </section>

          {/* Eligibility Info */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-primary mb-6 border-b pb-2">Eligibility & Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary" htmlFor="district">Permanent District (Terai) *</label>
                <input required id="district" name="district" type="text" className="w-full px-4 py-2 border border-border rounded-sm bg-background text-sm focus:outline-none focus:ring-1 focus:ring-secondary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary" htmlFor="category">Eligible Category *</label>
                <select required id="category" name="category" className="w-full px-4 py-2.5 border border-border rounded-sm bg-background text-sm focus:outline-none focus:ring-1 focus:ring-secondary">
                  <option value="">Select a category</option>
                  <option value="Madhesi">Madhesi</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Tharu">Tharu</option>
                  <option value="General">General/Other</option>
                </select>
              </div>
            </div>
          </section>

          {/* Type & Uploads */}
          <section>
            <h2 className="font-serif text-2xl font-bold text-primary mb-6 border-b pb-2">Membership Details</h2>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-primary block">Membership Type *</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input required type="radio" name="type" value="ORDINARY" className="text-secondary focus:ring-secondary" />
                    <span className="text-sm text-muted-foreground">Ordinary (NPR 100/yr)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input required type="radio" name="type" value="LIFETIME" className="text-secondary focus:ring-secondary" />
                    <span className="text-sm text-muted-foreground">Lifetime (NPR 500)</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary" htmlFor="studentId">Student ID Card Upload *</label>
                  <input required id="studentId" name="studentId" type="file" accept="image/*" className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                  <p className="text-xs text-muted-foreground">Please upload a clear image of your current student ID.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary" htmlFor="paymentProof">Payment Proof Upload *</label>
                  <input required id="paymentProof" name="paymentProof" type="file" accept="image/*" className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
                  <p className="text-xs text-muted-foreground">Upload screenshot of eSewa/Khalti transfer.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={isPending}
              className="w-full h-14 bg-primary text-primary-foreground text-lg font-medium rounded-sm hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing Application...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              By submitting, you agree to the rules and regulations of the Terai Law Students&apos; Association.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
