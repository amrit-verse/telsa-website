"use client";

import { useState, useTransition, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
<<<<<<< HEAD
  const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard";
  
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
=======
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [error, setError] = useState<string | null>(
    searchParams.get("error") === "CredentialsSignin" ? "Invalid email or password." : null
  );
  const [isPending, startTransition] = useTransition();
>>>>>>> fac743c (Final release candidate polish)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

<<<<<<< HEAD
=======
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

>>>>>>> fac743c (Final release candidate polish)
    startTransition(async () => {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

<<<<<<< HEAD
      if (!res?.error) {
        router.push(callbackUrl);
        router.refresh();
      } else {
        setError("Invalid email or password.");
=======
      if (res?.error) {
        setError("Invalid email or password.");
      } else if (res?.url) {
        router.push(res.url);
>>>>>>> fac743c (Final release candidate polish)
      }
    });
  }

  return (
    <>
      {error && (
<<<<<<< HEAD
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="mt-0.5">{error}</p>
=======
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="font-medium text-sm">{error}</p>
>>>>>>> fac743c (Final release candidate polish)
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
<<<<<<< HEAD
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
=======
          <label className="text-sm font-bold text-primary" htmlFor="email">Email Address</label>
          <input 
            required 
            id="email" 
            name="email" 
            type="email" 
            autoComplete="email"
            className="w-full px-4 py-3 border border-border rounded-sm bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow" 
            placeholder="admin@telsa.org.np"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-primary" htmlFor="password">Password</label>
          </div>
          <input 
            required 
            id="password" 
            name="password" 
            type="password" 
            autoComplete="current-password"
            className="w-full px-4 py-3 border border-border rounded-sm bg-background text-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-shadow" 
            placeholder="••••••••"
>>>>>>> fac743c (Final release candidate polish)
          />
        </div>

        <button 
          type="submit" 
          disabled={isPending}
<<<<<<< HEAD
          className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-sm flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
        >
          {isPending ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing In...</>
          ) : (
            "Sign In"
=======
          className="w-full h-12 bg-primary text-primary-foreground text-sm font-bold rounded-sm hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Authenticating...
            </>
          ) : (
            "Sign In to Portal"
>>>>>>> fac743c (Final release candidate polish)
          )}
        </button>
      </form>
    </>
  );
}

export default function LoginPage() {
  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" aria-hidden="true"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-secondary/5 rounded-full blur-3xl" aria-hidden="true"></div>

      <div className="w-full max-w-md bg-card border border-border p-8 md:p-10 rounded-sm shadow-sm relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6 ring-4 ring-background">
            <span className="font-serif text-3xl font-bold text-primary-foreground">T</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-primary mb-2">Member Login</h1>
          <p className="text-sm text-muted-foreground">Access the TeLSA administration portal.</p>
        </div>

        <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
          <LoginForm />
        </Suspense>
>>>>>>> fac743c (Final release candidate polish)
      </div>
    </div>
  );
}
