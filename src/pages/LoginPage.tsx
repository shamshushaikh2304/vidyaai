// ─────────────────────────────────────────────────────────────────────────────
// LoginPage.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboardingStore } from "../store/onboardingStore";

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 8 + 6,
  delay: Math.random() * 4,
}));

export default function LoginPage() {
  const { login } = useOnboardingStore();
  const [hoveredRole, setHoveredRole] = useState<"student" | "parent" | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const handleGoogleLogin = async (role: "student" | "parent") => {
    setLoading(`google-${role}`);
    await new Promise((r) => setTimeout(r, 1200));
    login(role, role === "student" ? "Arjun Sharma" : "Mr. Sharma", "user@gmail.com");
    setLoading(null);
  };

  const handleContinue = async (role: "student" | "parent") => {
    setLoading(`continue-${role}`);
    await new Promise((r) => setTimeout(r, 800));
    login(role, role === "student" ? "Arjun" : "Parent", "demo@vidyaai.com");
    setLoading(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center relative overflow-hidden px-4">

      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, #FF6B3530 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, #845EC230 0%, transparent 70%)" }}
        />

        {/* Particles */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-white/20"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.6, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FF6B35] mb-5 shadow-2xl shadow-[#FF6B35]/40">
            <span className="text-white font-black text-2xl">V</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">
            Vidya<span className="text-[#FF6B35]">AI</span>
          </h1>
          <p className="text-white/45 mt-2 text-sm">
            India's smartest AI tutor · 12 languages · All boards
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 shadow-2xl shadow-black/60"
        >
          <h2 className="text-white font-bold text-xl text-center mb-2">
            Welcome back 🙏
          </h2>
          <p className="text-white/40 text-sm text-center mb-8">
            Sign in to continue your learning journey
          </p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {(["student", "parent"] as const).map((role) => (
              <motion.button
                key={role}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onHoverStart={() => setHoveredRole(role)}
                onHoverEnd={() => setHoveredRole(null)}
                onClick={() => handleContinue(role)}
                disabled={loading !== null}
                className={`
                  relative rounded-2xl p-4 border text-center cursor-pointer
                  transition-all duration-200 outline-none overflow-hidden
                  ${hoveredRole === role
                    ? "border-[#FF6B35]/60 bg-[#FF6B35]/10"
                    : "border-white/10 bg-white/[0.03]"
                  }
                `}
              >
                <div className="text-2xl mb-2">
                  {role === "student" ? "🎓" : "👨‍👩‍👧"}
                </div>
                <p className="text-white font-semibold text-sm capitalize">{role}</p>
                <p className="text-white/35 text-xs mt-0.5">
                  {role === "student" ? "I'm studying" : "My child studies"}
                </p>

                {loading === `continue-${role}` && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35] origin-left"
                    transition={{ duration: 0.8 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">or sign in with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Google buttons */}
          <div className="space-y-3">
            {(["student", "parent"] as const).map((role) => (
              <motion.button
                key={role}
                whileHover={{ scale: 1.01, y: -1 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleGoogleLogin(role)}
                disabled={loading !== null}
                className="w-full flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/20 px-5 py-3.5 transition-all duration-200 outline-none group"
              >
                {/* Google icon */}
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>

                <span className="flex-1 text-left text-white/70 text-sm font-medium group-hover:text-white transition-colors">
                  Continue as <span className="capitalize font-semibold text-white">{role}</span> with Google
                </span>

                <AnimatePresence mode="wait">
                  {loading === `google-${role}` ? (
                    <motion.div
                      key="spinner"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                    />
                  ) : (
                    <motion.svg
                      key="arrow"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-4 h-4 text-white/30 group-hover:text-[#FF6B35] transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>

          {/* Footer */}
          <p className="text-center text-white/25 text-xs mt-6 leading-relaxed">
            By continuing you agree to our{" "}
            <span className="text-[#FF6B35]/70 cursor-pointer hover:text-[#FF6B35]">Terms</span>{" "}
            &{" "}
            <span className="text-[#FF6B35]/70 cursor-pointer hover:text-[#FF6B35]">Privacy Policy</span>
          </p>
        </motion.div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6"
        >
          <span className="text-white/20 text-xs">
            🇮🇳 Trusted by 5,40,000+ students across India
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
