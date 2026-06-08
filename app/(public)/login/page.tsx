"use client";

import { useState, useTransition, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";
  
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    startTransition(async () => {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!res?.error) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setError("Invalid email or password.");
      }
    });
  }

  return (
    <>
      {error && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="mt-0.5">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-primary">Email Address</label>
          <input 
            required 
            name="email" 
            type="email" 
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-border rounded-sm bg-background text-sm focus:outline-none focus:ring-1 focus:ring-secondary" 
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-primary">Password</label>
            <Link href="#" className="text-xs text-secondary hover:underline">Forgot password?</Link>
          </div>
          <input 
            required 
            name="password" 
            type="password" 
            className="w-full px-4 py-2 border border-border rounded-sm bg-background text-sm focus:outline-none focus:ring-1 focus:ring-secondary" 
          />
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-sm flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
        >
          {isPending ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing In...</>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-md">
      <div className="bg-card border border-border rounded-sm p-8 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">Sign In</h1>
          <p className="text-sm text-muted-foreground">Access your TeLSA account</p>
        </div>

        <Suspense fallback={<div className="py-12 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>}>
          <LoginForm />
        </Suspense>
        
        <div className="mt-8 text-center text-sm text-muted-foreground border-t border-border pt-6">
          Don&apos;t have an account? <Link href="/join" className="text-secondary font-bold hover:underline">Apply for Membership</Link>
        </div>
      </div>
    </div>
  );
}
