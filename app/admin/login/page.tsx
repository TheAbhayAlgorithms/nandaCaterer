"use client";

import React, { useState, useTransition } from "react";
import { Lock, Mail, AlertCircle, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const supabase = createClient();
    if (!supabase) {
      setErrorMsg("Supabase is not configured yet. Please check your environment variables.");
      return;
    }

    startTransition(async () => {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMsg(error.message || "Invalid email or password.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-3xl bg-paper shadow-warm border border-ink/10 overflow-hidden">
        {/* Card Header */}
        <div className="bg-[#7A1F2B] text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-[#C9A227] text-[#1B1210] mx-auto flex items-center justify-center font-bold text-xl shadow-md mb-3">
            NC
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-white">
            Admin Login
          </h1>
          <p className="text-xs text-white/80 mt-1">
            Private management portal for Nanda Caterers
          </p>
        </div>

        {/* Card Body */}
        <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5"
            >
              Email Address
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-ink/40">
                <Mail className="w-4 h-4" />
              </span>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nandacaterer.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream/40 border border-ink/20 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-[#C9A227] transition-all"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-ink/40">
                <Lock className="w-4 h-4" />
              </span>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cream/40 border border-ink/20 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-[#C9A227] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full min-h-[44px] py-2.5 px-4 rounded-full bg-[#7A1F2B] hover:bg-[#5C1A1B] text-white font-bold text-sm tracking-wide shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{isPending ? "Signing In..." : "Sign In to Admin"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-center text-ink/50 pt-2 border-t border-ink/5">
            Single owner account. Public sign-up is disabled for security.
          </p>
        </form>
      </div>
    </div>
  );
}

